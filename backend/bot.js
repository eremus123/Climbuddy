const TelegramBot = require("node-telegram-bot-api");

const token = process.env.VITE_TELETOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Welcome to Climbuddy! How can I assist you?");
});

// Handle /sessions command
bot.onText(/\/sessions/, (msg) => {
  // Call your backend API to fetch climbing sessions
  // Make HTTP request to your backend API and handle the response
  bot.sendMessage(msg.chat.id, "Here are your climbing sessions:");
  // Send climbing sessions data retrieved from your backend
});

// Handle other commands or messages here...

// Listen for any kind of message
bot.on("message", (msg) => {
  // Handle non-command messages here...
});

module.exports = bot;
