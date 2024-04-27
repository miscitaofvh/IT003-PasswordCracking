<?php
    $url = $_GET['url'];

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_HEADER, true);
    curl_setopt($ch, CURLOPT_NOBODY, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode == 200) {
        header('Content-Type: application/json');
        echo json_encode(array('status' => 'success'));
    } else {
        header('Content-Type: application/json');
        echo json_encode(array('status' => 'error'));
    }
?>
