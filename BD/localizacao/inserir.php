<?php 
	require_once('../conexao.php');

	$postjson = json_decode(file_get_contents('php://input'), true);

	$latitude = $postjson['latitude'];
	$longitude = $postjson['longitude'];
	$testeRede = $postjson['testeRede'];

	$res = $pdo->prepare("INSERT INTO localizacao SET latitude = :latitude, longitude = :longitude, teste = :testeRede");

//salvaldo a localização no banco.
	$res->bindValue(":latitude", $latitude);
	$res->bindValue(":longitude", $longitude);
	$res->bindValue(":testeRede", $testeRede);
	$res->execute();

	$result = json_encode(array('mensagem' => 'Salvo com Sucesso', 'ok' => true));
	echo $result;

?>
