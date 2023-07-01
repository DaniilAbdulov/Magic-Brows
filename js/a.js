function sendTelegramForm(e) {
    e.preventDefault();

    const error = formValidate(form);

    if (error === 0) {
        var url =
            "https://api.telegram.org/bot6065542648:AAG04VyT6ZkSbrtH_7B9sAHfxk4WuOAHC88/sendMessage";

        var chatId = "6099379205";

        const formElement = document.getElementById("form");
        var name = formElement.querySelector('input[name="name"]').value;
        var phone = formElement.querySelector('input[name="phone"]').value;
        var message = formElement.querySelector(
            'textarea[name="message"]'
        ).value;
        var datetime = formElement.querySelector(
            'input[name="datetime"]'
        ).value;

        var data = new FormData();
        data.append("chat_id", chatId);
        data.append(
            "text",
            `Заявка с сайта\nИмя: ${name}\nТелефон: ${phone}\nСообщение: ${message}\nДата и время: ${datetime}`
        );

        fetch(url, {
            method: "POST",
            body: data,
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        "Ошибка при отправке сообщения в Telegram."
                    );
                }
            })
            .then((result) => {
                wrap.style.opacity = 0.1;
                pop.style.display = "flex";

                btn.addEventListener("click", hidePopUp);
                function hidePopUp() {
                    wrap.style.opacity = 1;
                    pop.style.display = "none";
                }
                form.reset();
                load.classList.remove("_sending");
            })
            .catch((error) => {
                console.error(error);
            });
    } else {
        alert("В подсвеченном поле некорректные данные");
    }
}
