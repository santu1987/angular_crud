<?php
//Modelo
require("tipoUsModel.php");
//-Declaraciones
$mensaje = array();
//--Recibo lo enviado por POST
$data = json_decode(file_get_contents("php://input"));
$post = helper_userdata($data);

//--Bloque de procesos
if($post){
	switch ($post["accion"]) {
		case 'consultar':
			$recordset = consultar_tipousuario($post);
			die(json_encode($recordset));
			break;
		case 'guardar':
			//$recordset = registrar_tipoUs($data);
			$recordset = "Aqui";
			die(json_encode($recordset));
			break;	
		default:
			# code...
			break;
	}
}
//--Bloque de funciones

//--Helper que genera el arreglo de datos...
function helper_userdata($data){
	$user_data =  array();
	//--
	$user_data['accion'] = pg_escape_string($data->accion);
	//--
	return $user_data;
}
//
function consultar_tipousuario(){
	$obj = new tipoUsModel();
	$rs = $obj->consult_tipous();
	//--Recorro el arreglo de tipoUs para transformarlo en una cadena jSon
	$i=0;
	foreach ($rs as $campo) {
		$tipoUs[] = array('id'=>$campo[0],'name'=>$campo[1], 'number'=>$i, 'selected'=>false);
		$i++;
	}
	return $tipoUs;
	//--
}
//--
function registrar_tipoUs($post){
	return "aaaa";
	$obj = new tipoUsModel();
	$rs = $obj->insert_data($post);
	return $rs;
} 
//--
?>