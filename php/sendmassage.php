<?php
$data = json_decode(file_get_contents("php://input"), true);

$name = $data['name1'];
$phone = $data['tel1'];

$token = '7491436741:AAGe2hsGIucDOLN-CX-Uwb0OEQokW4U_Fgk';
$chat_id = '@bestgoodskz';


$message = "Имя: $name\nТелефон: $phone";


$url = "https://api.telegram.org/bot$token/sendMessage";


$params = [
    'chat_id' => $chat_id,
    'text' => $message,
    'parse_mode' => 'HTML'
];


$response = file_get_contents($url . '?' . http_build_query($params));


if ($response === FALSE) {
    echo "Ошибка при отправке сообщения.";
} else {
    echo "Сообщение отправлено!";
}
?>