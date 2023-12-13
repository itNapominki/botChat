const CHAT_ID_SPZ = process.env.CHAT_ID_SPZ;
const GOOGLE_SHEETS_KEY = process.env.GOOGLE_SHEETS_KEY;

async function updateOrdersFromFetch(postData, bot, callback) {
  try {
    const response = await fetch(`${GOOGLE_SHEETS_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    let manager = await response.json();

    if (response.status === 200) {
      if (callback && typeof callback === "function") {
        callback(null, manager.result);
      }

      return;
    } else {
      if (callback && typeof callback === "function") {
        callback(
          "Статус заявки НЕ обновлен, пожалуйста сообщите администратору группы",
          null
        );
      }

      await bot.sendMessage(
        CHAT_ID_SPZ,
        "Статус заявки НЕ обновлен, пожалуйста сообщите администратору группы"
      );

      return;
    }
  } catch (error) {
    console.error("Ошибка при выполнении запроса:", error);
  }
}

module.exports = {
  updateOrdersFromFetch,
};
