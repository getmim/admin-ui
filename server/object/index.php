<?php

$timezones = include '../timezone/timezones.php';

$result = [
    'error' => false,
    'data' => []
];

$q = $_GET['query'] ?? '';
$q = strtolower($q);

foreach($timezones as $timezone){
    if($q && false === strstr(strtolower($timezone), $q))
        continue;

    $result['data'][] = [
        'id'    => $timezone,
        'label' => $timezone,
        'info'  => explode('/', $timezone)[0]
    ];

    if(count($result['data']) > 25)
        break;
}

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
echo json_encode($result);