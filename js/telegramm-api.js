//мониторинг нажатия на ссылку в телеграмм
function sendTelegramNotification() {
    var url =
        "https://api.telegram.org/bot6065542648:AAG04VyT6ZkSbrtH_7B9sAHfxk4WuOAHC88/sendMessage";
    var message = "Кто-то нажал на ссылку с сайта magicbrows.ru";
    var chatId = "6099379205";
    const data = new URLSearchParams();
    data.append("chat_id", chatId);
    data.append("text", message);

    fetch(url, {
        method: "POST",
        headers: {
            "Content-type": "application/x-www-form-urlencoded",
        },
        body: data,
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Ошибка при отправке сообщения в Telegram.");
            }
            console.log("Сообщение успешно отправлено в Telegram.");
        })
        .catch((error) => {
            console.error(error);
        });
}
