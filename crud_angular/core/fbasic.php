<?php
//--Administración sistema
	const RUTA_SERVER = 'http://10.0.2.28/crud_us/';
//--Controladores
	const USER_CONTROLLER = "modulos/usuario/usuarioController.php";
	const USER_LIST_CONTROLLER = "modulos/usuario/listausController.php";
//--Vistas
	const PANTALLA_US =	"site_media/html/usuario.html";
//--Imagenes
	const RUTA_IMAGEN = "site_media/img/";
//--Función que obtiene la estructura de una página para ser renderizada
function get_template($form){
	$file =$_SERVER['DOCUMENT_ROOT'].'/crud_us/site_media/html/'.$form.'.html';
	$template = file_get_contents($file);
	return $template;
}
//--Función que permite delimitar la sección de la página en la que se realizará la sustitutción
function set_match_identificador_dinamico($html,$identificador){
    $ini = strpos($html,$identificador);
    $fin = strpos($html,$identificador,$ini+1);
    $len = strlen($identificador);
    $cal = substr($html,($ini+$len),($fin-$len-$ini));
    return $cal;
}

//--Función que permite el calculo de limites dentro de la paginación
function calculo_limites($offset,$cuantos_son,$tipo){
	$inicio_tabla = $offset+1;
	//--Valido que si $offset=0 se inicie la tabla en valor 0
	$valor = $offset+20;
	if($valor >= $cuantos_son)
		$fin_tabla = $cuantos_son;
	else
		$fin_tabla = $valor;		
	if($cuantos_son==0){
		$inicio_tabla = 0;
	}
	$dicc_tabla = array(
							"inicio_tabla" => $inicio_tabla,
							"fin_tabla" => $fin_tabla
	);
	return $dicc_tabla;
}

//--Función que permite armar paginación en las consultas
function armar_paginacion($cuantos_son,$vector){
	//--Validación de cuantos_son
	if(($vector['cuantos_son']==0)||($vector['tipo']==3))
	{
		$cuantos_son_tabla = $cuantos_son;
	}				
	else
		$cuantos_son_tabla = $vector['cuantos_son'];//Determino cuantos ticket_son
	//--Calculo de a que página debe ir
	switch ($vector['tipo']){
		case 0:
				$offset = 0;
				///Calculo limites:
				$dic_tabla = calculo_limites($offset,$cuantos_son_tabla,1);
		break;		
		case 1:
				$offset = $vector['actual']+$vector['cuantos_x_pagina'];
				///Calculo limites:
				$dic_tabla = calculo_limites($offset,$cuantos_son_tabla,1);
		break;
		case 2:
				$offset = $vector['actual']-$vector['cuantos_x_pagina'];
				///Calculo limites:
				$dic_tabla = calculo_limites($offset,$cuantos_son_tabla,2);
		break;
		case 3:
				$offset=$vector['actual'];
				//--
				if($vector[0]==$cuantos_son_tabla)
					$offset=0;
				//--
				$dic_tabla = calculo_limites($offset,$cuantos_son_tabla,1);
		break;		
	}
	//--Para ocultar siguiente 
	$offset_sig = $offset+$vector['cuantos_x_pagina'];
	$clase_sig = "";
	if(($offset_sig == $cuantos_son_tabla)||($offset_sig > $cuantos_son_tabla ))
		$clase_sig = "disabled";
	//--Para ocultar anterior
	if($offset == 0)
		$clase_ant = "disabled";
	else
		$clase_ant = "";	
	//--Validar si tiene o no tickets
	if($cuantos_son_tabla>0){
			$clase_tabla = 'show';
			$clase_tickets = 'hide';
	}else{
			$clase_tabla = 'hide';
			$clase_tickets = 'show';
	}
	$diccionario = array(
							"paginador_siguiente"=>"ir_tabla(".$offset.",".$cuantos_son_tabla .",20,1);",
							"paginador_anterior"=>"ir_tabla(".$offset.",".$cuantos_son_tabla .",20,2);",
							"clase_paginador_siguiente"=>$clase_sig,
							"clase_paginador_anterior"=>$clase_ant,
							"offset_tabla"=>$offset,
							"cuantos_tabla"=>$cuantos_son_tabla,
							"inicio_tabla"=>$dic_tabla["inicio_tabla"],
							"fin_tabla"=>$dic_tabla["fin_tabla"],
							"clase_tabla"=>$clase_tabla,
							"clase_tickets"=>$clase_tickets
						);
	return $diccionario;
}
//--
?>