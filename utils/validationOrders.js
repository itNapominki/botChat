function validationOrders(msg) {
  const validationMessage = {
    isError: true,
    messageError: "",
  };

  const { text } = msg;
  if (text.length < 14) {    
    validationMessage.messageError = "Заявка слишком короткая";
    return validationMessage;
  }

  const numbersOnly = text.replace(/\D/g, "");
  const match = numbersOnly.match(/(?:89|79)\d{9}/);

  if (!match) {    
    validationMessage.messageError = "В заявке отсутствует номер телефона заказчика";
    return validationMessage;
  }

  validationMessage.isError = false;
  validationMessage.messageError = "Замечаний нет";
  return validationMessage;

}

module.exports = validationOrders;
