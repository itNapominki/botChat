
// получаю номер телефома заказчика
function getNumberOrders(text) {
  const numbersOnly = text.replace(/\D/g, "");
  const match = numbersOnly.match(/(?:89|79)\d{9}/);
  return match;
}

// получаю id сообщения что бы ответить в ответ
function getIdmessageGBU(text) {
const start_index = text.indexOf("сообщения:") + "сообщения:".length;
const end_index = text.indexOf(",", start_index);
const data = text.slice(start_index, end_index);
console.log(data)
return data;
}

module.exports = {
    getNumberOrders,
    getIdmessageGBU,
} 
