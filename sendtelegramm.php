<?php
    $content = '';
    foreach ($_POST as $key => $value){
        if($value){
            $content .= '<b>$key</b>: <i>$value</i>\n';
        }
    }
    if(trim($content)){
        $content = "<b>Message from MagicBrows</b>\n".$content;

        $apiToken = "6065542648:AAG04VyT6ZkSbrtH_7B9sAHfxk4WuOAHC88";
        $data = [
            'chat_id' => '@magicbrows_bot',
            'text' => $content,
            'parse_mode' => 'HTML'
        ];
        $response = file_get_contents("https://api.telegram.org/bot$apiToken/sendMessage?".http_build_query($data));
    }


?>