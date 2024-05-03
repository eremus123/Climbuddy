const connectDB = require("./src/db/db");
const TelegramBot = require("node-telegram-bot-api");
const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.POSTGRES_URI,
});

const token = process.env.VITE_TELETOKEN;
const bot = new TelegramBot(token, { polling: true });
const cleanup = () => {
  pool.end();
};
bot.on("shutdown", cleanup);

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "Welcome to Climbuddy Here's what you can do:\n\n" +
      "/allgyms - List all gyms in SG\n" +
      "/mypasses - Check remaining passes and expiries\n" +
      "/mysessions - View your upcoming sessions\n" +
      "/pastvisits - See which gyms you've been to recently \n"
  );
});

bot.onText(/\/allgyms/, async (msg) => {
  const pool = await connectDB();
  try {
    const res = await pool.query(`SELECT * from gyms`);

    // Check if the exceeds the limit
    let gymData = "Here are the gyms in sg:\n";
    res.rows.forEach((row) => {
      gymData += `${row.gymname}\n`;
    });
    // Split the message
    if (gymData.length > 4096) {
      const chunkSize = 4096; // Maximum length for a single message
      const chunks = [];
      for (let i = 0; i < gymData.length; i += chunkSize) {
        chunks.push(gymData.slice(i, i + chunkSize));
      }
      chunks.forEach((chunk) => {
        bot.sendMessage(msg.chat.id, chunk);
      });
    } else {
      bot.sendMessage(msg.chat.id, gymData);
    }
  } catch (error) {
    console.error("Error fetching gyms:", error);
    bot.sendMessage(msg.chat.id, "An error occurred while fetching gyms.");
  } finally {
  }
});

bot.onText(/\/mypasses/, async (msg) => {
  const pool = await connectDB();
  try {
    // Prompt the user for their username
    const promptMessage = await bot.sendMessage(
      msg.chat.id,
      "Please enter your username:",
      {
        reply_markup: {
          force_reply: true,
        },
      }
    );
    // Listen for the user's reply to the prompt
    bot.onReplyToMessage(
      msg.chat.id,
      promptMessage.message_id,
      async (replyMsg) => {
        const username = replyMsg.text.toLowerCase().replace(/\s+/g, "");
        const res = await pool.query(
          `SELECT passes.*, gyms.gymname, TO_CHAR(passes.expirydate, 'DD Mon YYYY') as formatted_expirydate
              FROM passes JOIN gyms ON passes.gymid = gyms.id WHERE username = '${username}' AND quantity > 0`
        );

        let passData = "Here are your passes:\n";
        res.rows.forEach((row) => {
          passData += `${row.gymname} x${row.quantity}, expires ${row.formatted_expirydate} \n`;
        });

        bot.sendMessage(msg.chat.id, passData);
      }
    );
  } catch (error) {
    console.error("Error fetching passes:", error);
    bot.sendMessage(msg.chat.id, "An error occurred while fetching passes.");
  } finally {
  }
});

bot.onText(/\/mysessions/, async (msg) => {
  const pool = await connectDB();
  try {
    // Prompt the user for their username
    const promptMessage = await bot.sendMessage(
      msg.chat.id,
      "Please enter your username:",
      {
        reply_markup: {
          force_reply: true,
        },
      }
    );

    // Listen for the user's reply to the prompt
    bot.onReplyToMessage(
      msg.chat.id,
      promptMessage.message_id,
      async (replyMsg) => {
        const username = replyMsg.text.toLowerCase().replace(/\s+/g, "");
        const res = await pool.query(
          `SELECT sessions.*, gyms.gymname, TO_CHAR(sessions.sessiondate, 'Day, DD MON YYYY @ HH24:MI') as formatted_sessiondate
              FROM sessions JOIN gyms ON sessions.gymid = gyms.id WHERE (hostname = '${username}' OR attendee = '${username}') AND sessions.sessiondate > CURRENT_DATE`
        );

        let passData = "Here are your upcoming sessions:\n";
        res.rows.forEach((row) => {
          passData += `${row.formatted_sessiondate} at ${row.gymname} \n`;
        });

        bot.sendMessage(msg.chat.id, passData);
      }
    );
  } catch (error) {
    console.error("Error fetching sessions:", error);
    bot.sendMessage(msg.chat.id, "An error occurred while fetching sessions.");
  } finally {
  }
});
bot.onText(/\/pastvisits/, async (msg) => {
  const pool = await connectDB();
  try {
    // Prompt the user for their username
    const promptMessage = await bot.sendMessage(
      msg.chat.id,
      "Please enter your username:",
      {
        reply_markup: {
          force_reply: true,
        },
      }
    );

    bot.onReplyToMessage(
      msg.chat.id,
      promptMessage.message_id,
      async (replyMsg) => {
        const username = replyMsg.text.toLowerCase().replace(/\s+/g, "");
        const res = await pool.query(
          `SELECT gyms.*, TO_CHAR(sessions.sessiondate, 'DD MON YYYY') as formatted_sessiondate
             FROM gyms
             JOIN sessions ON gyms.id = sessions.gymid
             WHERE (hostname = '${username}' OR attendee = '${username}') AND sessions.sessiondate < CURRENT_DATE
             ORDER BY sessions.sessiondate DESC;`
        );

        let pastVisitsData = "Here are your past sessions:\n";
        res.rows.forEach((row) => {
          pastVisitsData += `${row.gymname} - ${row.formatted_sessiondate} \n`;
        });

        bot.sendMessage(msg.chat.id, pastVisitsData);
      }
    );
  } catch (error) {
    console.error("Error fetching past visits:", error);
    bot.sendMessage(
      msg.chat.id,
      "An error occurred while fetching past visits."
    );
  } finally {
  }
});

// Listen for any kind of message
bot.on("message", (msg) => {
  // Handle non-command messages
});

module.exports = bot;
