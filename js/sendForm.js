//отправка формы
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form");
    const load = document.getElementById("load");
    form.addEventListener("submit", sendTelegramForm);

    function sendTelegramForm(e) {
        e.preventDefault();

        const error = formValidate(form);

        if (error === 0) {
            const daniilToken =
                "6065542648:AAG04VyT6ZkSbrtH_7B9sAHfxk4WuOAHC88";
            const daniilChatId = "6099379205";
            const kamilaToken =
                "6009017631:AAHH8bPdEKUueKVF78koS31ilD_sNrhPm2o";
            const kamilaChatId = "486643867";
            const url = `https://api.telegram.org/bot${kamilaToken}/sendMessage`;

            const chatId = kamilaChatId;

            const formElement = document.getElementById("form");
            const name = formElement.querySelector('input[name="name"]').value;
            const phone = formElement.querySelector(
                'input[name="phone"]'
            ).value;
            const message = formElement.querySelector(
                'textarea[name="message"]'
            ).value;
            const datetime = formElement.querySelector(
                'input[name="datetime"]'
            ).value;

            const data = new FormData();
            data.append("chat_id", chatId);
            data.append(
                "text",
                `Сообщение с сайта magicbrows\nИмя: ${name}\nТелефон: ${phone}\nСообщение: ${message}\nДата и время: ${datetime}`
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
    function formValidate(form) {
        let error = 0;
        const formReq = form.querySelectorAll("._req");

        formReq.forEach((input) => {
            formRemoveError(input);

            if (input.classList.contains("_name")) {
                if (nameTest(input)) {
                    formAddError(input);
                    error++;
                }
            } else if (input.classList.contains("_telephone")) {
                if (telephoneTest(input)) {
                    formAddError(input);
                    error++;
                }
            } else {
                if (input.value === "") {
                    formAddError(input);
                    error++;
                }
            }
        });

        return error;
    }

    function formAddError(input) {
        input.parentElement.classList.add("_error");
        input.classList.add("_error");
    }

    function formRemoveError(input) {
        input.parentElement.classList.remove("_error");
        input.classList.remove("_error");
    }

    function nameTest(input) {
        return !/^[^[\].,_'"@?!:$/\\]*[А-Яа-я]/.test(input.value);
    }

    function telephoneTest(input) {
        return !/^([^\d]*?\d){10,15}$/.test(input.value);
    }
});
