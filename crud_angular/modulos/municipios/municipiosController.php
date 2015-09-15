<?php
//Modelo
require("municipiosModel.php");
//--Bloque de procesos:
//--Declaraciones:
$mensaje = array();
//--
$data = json_decode(file_get_contents("php://input"));
$post =  helper_userdata($data);

//-- Recibe el parametro por post, según la acción desarrollará una operación....
if($post){
	switch($post["accion"]){
		case 'consultar':
			$recordset = consultar_municipio($post);
			die(json_encode($recordset));
			break;
	}
}

//--Bloque de funciones:
//--Helper que genera el arreglo de datos...
function helper_userdata($data){
	$user_data = array();
	$user_data['accion'] = pg_escape_string($data->accion);
	$user_data["estado"] = $data->estado;
	return $user_data;
}
//--
function consultar_municipio($arreglo){
	$obj = new municipiosModel();
	$rs = $obj->consult_municipio($arreglo);
	//--Recorro el arreglo de municipios para transformarlo en un arreglo asociativo
	foreach ($rs as $campo) {
		$municipios[] = array('id'=>$campo[0],'name'=>$campo[1]);
	}
	return $municipios;
}
?>