<?php
//Modelo
require ("estadoModel.php");

//--Declaraciones:
$mensaje = array();
//--
$data = json_decode(file_get_contents("php://input"));
$post = helper_userdata($data);

//-- Recibe el parametro accion por post, segun la acción desarrollará una operación....
if($post)
{
	switch ($post["accion"]) {
		case 'consultar':
			$recordset = consultar_estado($post);
			$mensaje[0] = $recordset;
			die(json_encode($recordset));	
			break;
		default:
			# code...
			break;
	}
}
//--
//--Bloque de funciones
//--Helper que genera el arreglo de datos
function helper_userdata($data){
	$user_data = array();
	//--
	$user_data['accion'] = pg_escape_string($data->accion);
	//--
	return $user_data;
}
//--
function consultar_estado(){
	$obj = new estadoModel();
	$rs = $obj->consult_estado();
	//--Recorro el arreglo de estado para transformarlo en una cadena json...
	/*for($i=0;$i<=count($rs);$i++) {
		$cadena_json["id"][$i] = $campo[$i][1];
		$cadena_json["name"][$i] = $campo[$i][2];
	}*/
	/*$i = 0;
	foreach ($rs as $cadena_json) {
		$i++;
		$cadena_json[] = array(
								'id' =>$cadena_json[0],
								'name'=>$cadena_json[1],
								'i'=>$i 
						 );
	}*/
 	//--
	return $rs;
}
//--
?>