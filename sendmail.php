<?php
$name = $_POST['name'];
$phone = $_POST['phone'];
$message = $_POST['message'];
$datetime = $_POST['datetime'];
$name = htmlspecialchars($name);
$phone = htmlspecialchars($phone);
$message = htmlspecialchars($message);
$datetime = htmlspecialchars($datetime);
$name = urldecode($name);
$phone = urldecode($phone);
$message = urldecode($message);
$datetime = urldecode($datetime);
$name = trim($name);
$phone = trim($phone);
$message = trim($message);
$datetime = trim($datetime);
//echo $name;
//echo "<br>";
//echo $phone;
//echo "<br>";
//echo $message;
//echo "<br>";
//echo $datetime;
if (mail("example@mail.ru", "Заявка с сайта", "Имя:".$name.". Телефон: ".$phone ,"Сообщение:".$message.". Дата и время: ".$datetime ,"From: example2@mail.ru \r\n"))
 {     echo "сообщение успешно отправлено";
} else {
    echo "при отправке сообщения возникли ошибки";
}
?>