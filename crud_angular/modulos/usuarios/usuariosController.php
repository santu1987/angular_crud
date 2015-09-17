<?php
//Modelo
require ("usuarioModel.php");

//--Declaraciones:
$mensaje = array();
//--
$data = json_decode(file_get_contents("php://input"));
$post = helper_userdata($data);

//-- Recibe el parametro accion por post, segun la acción desarrollará una operación....
if($post)
{
	switch ($post["accion"]) {
		case 'guardar':
			$recordset = insertar_usuario($post);
			if($recordset == "error"){
				$mensaje["mensaje"] = "Error #01: No se realizó la operación";
			}else
			if($recordset[0][0]=='-1'){
				$mensaje["mensaje"] = "Error #02: YA existe un usuario con esa cédula";
			}else
			{
				$mensaje["mensaje"] =  "Registro Exitoso";
				$mensaje["id"] = $recordset[0][0];
			}
			//$mensaje[0] = $recordset[0][0];
			die(json_encode($mensaje));	
			break;
		case 'consultar';
			$recordset = consultar_usuario($post);
			die(json_encode($recordset));
			break;	
		case 'consultar_cuantos_son':
			$recordset = cuantos_son();
			die(json_encode($recordset));	
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
	$user_data['accion'] = pg_escape_string($data->accion);
	switch($user_data["accion"])
	{
		//--Dependiendo de la pantalla el realiza el barrido de los objetos llevandolo a arreglos....
		//--Pantalla Guardar....
		case "guardar":
			$user_data['nombres'] = pg_escape_string($data->nombres);
			$user_data['cedula'] = pg_escape_string($data->cedula);
			if($data->id!=""){
				$user_data['id'] = pg_escape_string($data->id);
			}
			$user_data['estado'] = $data->estado;
			$user_data['municipio'] = $data->municipio;
			$user_data['parroquia'] = $data->parroquia;
		break;
		default:
			#code
			break;		
	}
	return $user_data;
}
//--
function insertar_usuario($post){
	$obj = new usuarioModel();
	$resp = $obj->insert_data($post);
	return $resp;
}
//--
function consultar_usuario($post){
	$obj = new usuarioModel();
	$resp = $obj->consult_data($post);
	//--Recorro el arreglo para tyransformarlo en un json que pueda utilizar en el frontent
	foreach ($resp as $campo) {
		$personas[] = array('id'=>$campo[2],'nombres'=>$campo[0], 'cedula'=>$campo[1], 'codigoestado'=>$campo[3], 'codigomunicipio' => $campo[4], 'codigoparroquia'=> $campo[5], 'nombre_estado'=>$campo[6], 'nombre_municipio'=>$campo[7], 'nombre_parroquia'=>$campo[8]);
	}
	//--
	return $personas;	
	//--
}
//--
function cuantos_son(){
	$obj = new usuarioModel();
	$resp = $obj->cuantos_data();
	return $resp[0][0];
}
//--

?>