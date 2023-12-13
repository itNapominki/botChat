const validationOrders = require("../validationOrders");
const getHelpers = require("../getHelpers");
const options = require("../const/options");
const { updateOrdersFromFetch } = require("../fetch");

const CHAT_ID_GBU = process.env.CHAT_ID_GBU;
const CHAT_ID_SPZ = process.env.CHAT_ID_SPZ;

function listenMessage(bot) {

    bot.on("message", async (msg) => {
        const text = msg.text;
        const chatId = msg.chat.id;
    
        try {
          if (text === "/start") {
            await bot.sendMessage(chatId, myMessage.start, { parse_mode: "HTML" });
            return;
          }
    
          if (text === "/help") {
            await bot.sendMessage(chatId, myMessage.help, { parse_mode: "HTML" });
            return;
          }
    
          // регистрация клиента
          if (text.startsWith("/reg")) {
            // ошибка регистрации слишком короткое сообщение
            if (text.length < 14) {
              await bot.sendMessage(
                chatId,
                `Не указаны имя или телефон, нажмите /help и прочитайте инструкцию, потом попробуйте еще раз зарегистрироваться.`
              );
              await bot.sendMessage(
                931824462,
                `!!! Неверная заявка ${text} - с ид ${chatId}`
              );
              return;
            }
    
            await bot.sendMessage(
              931824462,
              `Нужно зарегистрировать - ${text} - с ид ${chatId}`
            );
    
            await bot.sendMessage(chatId, `Ваша заявка на регистрацию принята`);
            return;
          }
    
          // получение информации для администратора
          if (text === "/admin") {
            await bot.sendMessage(chatId, "Команда администратора");
            return;
          }
    
          // слушаем чат ГБУ
          if (chatId == CHAT_ID_GBU) {
            console.log("============Чат_ГБУ===========");
    
            // валидация заявки
            if (validationOrders(msg).isError) {
              await bot.sendMessage(
                CHAT_ID_GBU,
                `Заявка не принята ${
                  validationOrders(msg).messageError
                }, текст заявки ${text}`
              );
              return;
            }
            await bot.sendMessage(CHAT_ID_GBU, `${text} \n\n Ваша заявка принята`);
    
            // собираем данные из перевоначальной заявки для записи в google sheets
            const postData = {
              action: "post",
              values: [
                [
                  msg.message_id,
                  "from",
                  msg.from.id,
                  msg.from.first_name,
                  msg.from.username,
                  "chat",
                  msg.chat.id,
                  msg.chat.title,
                  msg.date,
                  "default",
                  "false",
                  getHelpers.getNumberOrders(msg.text),
                  msg.text,
                ],
              ],
            };
    
            await bot.sendMessage(
              CHAT_ID_SPZ,
              `Номер сообщения:${postData.values[0][0]}, \nНомер заказчика:${postData.values[0][11]}, \nid Заявки:${postData.values[0][8]}, \n\n Текст заявки: \n ${postData.values[0][12]}`,
              options
            );
    
            updateOrdersFromFetch(postData, bot);
            return;
          }
    
          // слушаем чат СПЗ
          if (chatId == CHAT_ID_SPZ) {
            console.log("===========Чат_СПЗ============");
    
            return;
          }
        } catch (e) {
          console.log("Что то пошло не так", e);
        }
      });

}

module.exports = {
    listenMessage,
  };
  