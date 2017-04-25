<?php
$url = "https://euw.api.pvp.net/api/lol/euw/v1.4/summoner/by-name/beasttt?api_key=RGAPI-e8a16828-f400-4e4c-9b8e-06483315a6ff";
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$result = curl_exec ($ch);
curl_close ($ch);
echo $result;
?>