<?php 
	require_once('../conexao.php');

	$postjson = json_decode(file_get_contents('php://input'), true);

	$latitude = $postjson['latitude'];
	$longitude = $postjson['longitude'];

	$res = $pdo->prepare("INSERT INTO localizacao SET latitude = :latitude, longitude = :longitude");

//salvaldo a localização no banco.
	$res->bindValue(":latitude", $latitude);
	$res->bindValue(":longitude", $longitude);
	$res->execute();

	$result = json_encode(array('mensagem' => 'Salvo com Sucesso', 'ok' => true));
	echo $result;

?>
