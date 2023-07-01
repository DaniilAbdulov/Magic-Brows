<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
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

  $to = 'abdulov.dany@yandex.ru';
  $subject = 'Сообщение с сайта MagicBrows';
  $headers = 'From: webmaster@magicbrows.ru' . "\r\n" .
             'Reply-To: webmaster@magicbrows.ru' . "\r\n" .
             'X-Mailer: PHP/' . phpversion();

  $message_body = "Имя: $name\n" .
                  "Телефон: $phone\n" .
                  "Сообщение: $message\n" .
                  "Дата и время: $datetime\n";

  if (mail($to, $subject, $message_body, $headers)) {
    $response = [
      'status' => 'success',
      'message' => 'Сообщение успешно отправлено'
    ];
  } else {
    $response = [
      'status' => 'error',
      'message' => 'При отправке возникли ошибки'
    ];
  }

  echo json_encode($response);
} else {
  http_response_code(403);
  echo json_encode(['status' => 'error', 'message' => 'Доступ запрещен']);
}

