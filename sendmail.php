<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer-master\src\Exception.php';
require 'PHPMailer-master\src\PHPMailer.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'PHPMailer-master\language');
$mail->IsHTML(true);

$mail->setFrom('webmaster@magicbrows.ru');
$mail->addAddress('abdulov.dany@yandex.ru');
$mail->Subject = 'Сообщение с сайта MagicBrows';

$body = '<h1>Сообщение:</h1>';


if(trim(!empty($_POST['name']))){
    $body.='<p><strong>Имя:</strong> ' .$_POST['name'].'</p>';
}
if(trim(!empty($_POST['phone']))){
    $body.='<p><strong>Телефон:</strong> ' .$_POST['phone'].'</p>';
}
if(trim(!empty($_POST['message']))){
    $body.='<p><strong>Сообщение:</strong> ' .$_POST['message'].'</p>';
}
if(trim(!empty($_POST['datetime']))){
    $body.='<p><strong>Время и дата:</strong> ' .$_POST['datetime'].'</p>';
}


$mail->Body = $body;

if(!$mail->send()){
    $message = 'Error';
}else{
    $message = 'Sended';
}
$response = ['message'=>$message];

header('Content-type: application/json');
echo json_encode($response);
?>