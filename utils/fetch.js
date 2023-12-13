const CHAT_ID_SPZ = process.env.CHAT_ID_SPZ;

async function updateOrdersFromFetch(postData, bot, callback) {
  const response = await fetch(`${process.env.GOOGLE_SHEETS_KEY}`, {
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
}

module.exports = {
  updateOrdersFromFetch,
};
