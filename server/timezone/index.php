<?php

$timezones = timezone_identifiers_list();

$q = $_GET['query'] ?? '';

$result = [];
$q = strtolower($q);
foreach($timezones as $tz){
    if($q && false === strstr(strtolower($tz), $q))
        continue;

    $tzss = explode('/', $tz);
    $result[] = [
        'id'    => $tz,
        'label' => $tz,
        'info'  => $tzss[0]
    ];
}
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
echo json_encode(['error'=>false, 'data'=>$result]);