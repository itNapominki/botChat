const { updateOrdersFromFetch } = require("./fetch");

const CHAT_ID_GBU = process.env.CHAT_ID_GBU;
const CHAT_ID_SPZ = process.env.CHAT_ID_SPZ;

function useUpdateOrdersFromFetch(postData, bot) {
  updateOrdersFromFetch(postData, bot, (error, result) => {
    if (error) {
      bot.sendMessage(CHAT_ID_SPZ, error);
    } else {
      bot.sendMessage(CHAT_ID_GBU, `Статус изменен менеджером ${result}`);
    }
  });
}

module.exports = {
  useUpdateOrdersFromFetch,
};
