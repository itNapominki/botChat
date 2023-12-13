const validationOrders = require("../validationOrders");
const getHelpers = require("../getHelpers");
const { updateOrdersFromFetch } = require("../fetch");
const { useUpdateOrdersFromFetch } = require("../useUpdateOrdersFromFetch");

const CHAT_ID_GBU = process.env.CHAT_ID_GBU;
const CHAT_ID_SPZ = process.env.CHAT_ID_SPZ;

function listenCallbackQuery (bot) {

    bot.on("callback_query", (query) => {
        let countMessage = getHelpers.getIdmessageGBU(query.message.text);
    
        const postData = {
          action: "update",
          managerId: query.from.id,
          status: "",
          msg_message_id: countMessage,
        };
    
        switch (query.data) {
          case "button1":
            postData.status = "accepted";
    
            updateOrdersFromFetch(postData, bot);
    
            bot.sendMessage(CHAT_ID_SPZ, ` Отправлен статус "Принято"`, {
              reply_to_message_id: query.message.message_id,
            });
            return;
            break;
          case "button2":
            bot.sendMessage(CHAT_ID_GBU, `обновлен статус на "Отказ"`, {
              reply_to_message_id: countMessage,
            });
    
            postData.status = "rejection";
    
            useUpdateOrdersFromFetch(postData, bot);
    
            bot.sendMessage(CHAT_ID_SPZ, ` Отправлен статус "Отказ"`, {
              reply_to_message_id: query.message.message_id,
            });
    
            return;
    
            break;
          case "button3":
            bot.sendMessage(CHAT_ID_GBU, `обновлен статус на "В работе"`, {
              reply_to_message_id: countMessage,
            });
            postData.status = "work";
    
            useUpdateOrdersFromFetch(postData, bot);
    
            bot.sendMessage(CHAT_ID_SPZ, ` Отправлен статус "В работе"`, {
              reply_to_message_id: query.message.message_id,
            });
    
            return;
            break;
    
          case "button7":
            bot.sendMessage(CHAT_ID_GBU, `обновлен статус на "Дедлайн"`, {
              reply_to_message_id: countMessage,
            });
            postData.status = "deadline";
            useUpdateOrdersFromFetch(postData, bot);
    
            bot.sendMessage(CHAT_ID_SPZ, ` Отправлен статус "Дедлайн"`, {
              reply_to_message_id: query.message.message_id,
            });
            return;
            break;
          case "button8":
            bot.sendMessage(
              CHAT_ID_GBU,
              `обновлен статус на "Неправильный номер"`,
              {
                reply_to_message_id: countMessage,
              }
            );
            postData.status = "invalidnumber";
            useUpdateOrdersFromFetch(postData, bot);
    
            bot.sendMessage(CHAT_ID_SPZ, ` Отправлен статус "Неправильный номер"`, {
              reply_to_message_id: query.message.message_id,
            });
            return;
            break;
          default:
            return;
            break;
        }
      });

}

module.exports = {
    listenCallbackQuery,
  };
  