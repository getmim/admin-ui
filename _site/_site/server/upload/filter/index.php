<?php

$q = $_GET['query'] ?? null;

$unsplash = [
    'key'       => 'e72a6168a2d7ac74848d8c6694b3732345d895ece7173ec5e1772c6b9cc1b005',
    'index'     => 'https://api.unsplash.com/photos',
    'search'    => 'https://api.unsplash.com/search/photos'
];

$url = $q ?  : $unsplash['index'];
$query = [
    'client_id' => $unsplash['key']
];
if($q){
    $url = $unsplash['search'];
    $query['query'] = $q;
}

$url.= '?' . http_build_query($query);

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

$result = curl_exec($ch);
curl_close($ch);

$result = json_decode($result);

$body = [
    'error' => 0,
    'data'  => []
];

if(is_object($result))
    $result = $result->results;

foreach($result as $res){
    $body['data'][] = [
        'url'  => $res->urls->full,
        'name' => $res->id . '.jpg',
        'path' => $res->urls->full,
        'type' => 'image/jpeg',
        // 'thumb'=> $res->urls->thumb
    ];
}

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
echo json_encode($body);