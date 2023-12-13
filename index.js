/** Данный бот сделан для работы между чатами СПЗ и ГБУ
 *
 *
 *
 */
require("dotenv").config();
const TelegrammApi = require("node-telegram-bot-api");
const { listenMessage } = require("./utils/listen/listenNessage");
const { listenCallbackQuery } = require("./utils/listen/listenCallbackQuery");
const token = process.env.TELEGRAMM_TOKEN;
const bot = new TelegrammApi(token, { polling: true });

const start = async () => {
  // содержание кнопки меню
  bot.setMyCommands([
    { command: "/start", description: "Начальное приветствие" },
    { command: "/help", description: "Получить справку" },
    { command: "/admin", description: "Информация для администратора" },
  ]);

  // слушатель команд и сообщения
  listenMessage(bot);
  
  // обработка кнопок
  listenCallbackQuery(bot);
  
};

start();
