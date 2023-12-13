// Опции кнопок
const options = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: "Принято", callback_data: "button1" },
        { text: "Отказ", callback_data: "button2" },
        { text: "В работе", callback_data: "button3" },
        { text: "Неверный номер", callback_data: "button8" },
      ],
      [{ text: "Дедлайн", callback_data: "button7" }],
    ],
  },
};

module.exports = options;
