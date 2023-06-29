<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

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

  $message_body = "Имя: $name\r\n" .
                  "Телефон: $phone\r\n" .
                  "Сообщение: $message\r\n";

  // проверка времени
  $current_time = time();
  $selected_time = strtotime($datetime);
  if ($selected_time - $current_time > 3600) {
    $response = [
      'status' => 'error',
      'message' => 'Некорректное время'
    ];
  } else {
    if (!empty($datetime)) {
      $message_body .= "Дата и время: $datetime\r\n";
    }
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
  }

  echo json_encode($response);
} else {
  http_response_code(403);
  echo json_encode(['status' => 'error', 'message' => 'Доступ запрещен']);
}