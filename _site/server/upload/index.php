<?php

header('Access-Control-Allow-Origin: *');

if($_SERVER['REQUEST_METHOD'] != 'POST')
    exit;

header('Content-Type: application/json');

$file = $_FILES['file'] ?? null;
if(!$file){
    echo json_encode([
        'error' => true,
        'message' => 'Field file is required'
    ]);
    exit;
}

$key = 'b3c702efcee2c48599cccc059885f86f';
$url = 'https://api.imgbb.com/1/upload?key=' . $key;

$mime   = mime_content_type($file['tmp_name']);
$name   = $file['name'];
$output = new CURLFile($file['tmp_name'], $mime, $name);

$post = [ 'image' => $output ];

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$result = curl_exec($ch);

$result = json_decode($result);

$data = [
    'error' => 0,
    'message' => 'OK',
    'data' => [
        'url'  => $result->data->url,
        'path' => $result->data->url,
        'name' => $result->data->image->filename,
        'type' => $result->data->image->mime,
        'size' => $result->data->image->size
    ]
];

echo json_encode($data);