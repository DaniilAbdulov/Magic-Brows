<?php
if(isset($_POST['submit'])) { // Проверяем, была ли отправлена форма

    // Получаем данные из формы
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $message = $_POST['message'];
    $datetime = $_POST['datetime'];
  

    // Формируем сообщение, которое будет отправлено в телеграмм-бота
    $text = "Новое сообщение из формы сайта:\n\n";
    $text .= "<b>Имя:</b> $name\n";
    $text .= "<b>Номер:</b> $phone\n";
    $text .= "<b>Сообщение:</b>\n$message";
    $text .= "<b>Дата и время:</b>\n$datetime";

    // Конфигурация бота
    $botToken = '6065542648:AAG04VyT6ZkSbrtH_7B9sAHfxk4WuOAHC88';
    $chatId = '@magicbrows_bot';

    // Отправляем сообщение в телеграмм-бота
    $url = "https://api.telegram.org/bot$botToken/sendMessage?chat_id=$chatId&parse_mode=HTML&text=".urlencode($text);
    $response = file_get_contents($url);
    if (!$response) {
        error_log("Error in sending message to Telegram: " . error_get_last()["message"]);
        // Ошибка отправки сообщения в бота
    } else {
        // Сообщение успешно отправлено
        echo "Ваше сообщение успешно отправлено в телеграмм-бота!";
    }
}
?>