const connectDB = require("./src/db/db");
const TelegramBot = require("node-telegram-bot-api");
const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.POSTGRES_URI,
});

const token = process.env.VITE_TELETOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Welcome to Climbuddy How can I assist you?");
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
    pool.end();
  }
});

bot.onText(/\/mypasses/, async (msg) => {
  const pool = await connectDB();
  try {
    const res = await pool.query(
      `SELECT passes.*,gyms.gymname  FROM passes JOIN gyms ON passes.gymid = gyms.id WHERE username = 'eremus' AND quantity > 0`
    );

    // Check if the exceeds the limit
    let passData = "Here are your passes:\n";
    res.rows.forEach((row) => {
      passData += `${row.gymname} x${row.quantity}, expiring ${row.expirydate} \n`;
    });
    // Split the message
    if (passData.length > 4096) {
      const chunkSize = 4096; // Maximum length for a single message
      const chunks = [];
      for (let i = 0; i < passData.length; i += chunkSize) {
        chunks.push(passData.slice(i, i + chunkSize));
      }
      chunks.forEach((chunk) => {
        bot.sendMessage(msg.chat.id, chunk);
      });
    } else {
      bot.sendMessage(msg.chat.id, passData);
    }
  } catch (error) {
    console.error("Error fetching gyms:", error);
    bot.sendMessage(msg.chat.id, "An error occurred while fetching gyms.");
  } finally {
    pool.end();
  }
});

// Listen for any kind of message
bot.on("message", (msg) => {
  // Handle non-command messages
});

module.exports = bot;
