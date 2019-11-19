<?php

$timezones = timezone_identifiers_list();

$q = $_GET['query'] ?? '';
$group = $_GET['parent'] ?? null;

$result = [];
$q = strtolower($q);
foreach($timezones as $tz){
    if($q && false === strstr(strtolower($tz), $q))
        continue;

    $tzss = explode('/', $tz);

    if($group && $group != $tzss[0])
    	continue;
    
    $result[] = [
        'id'    => $tz,
        'label' => $tz,
        'info'  => $tzss[0]
    ];
}
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
echo json_encode(['error'=>false, 'data'=>$result]);