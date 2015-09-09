<?php
//--Administración sistema
	const RUTA_SERVER = 'http://10.0.2.28/crud_angular/';
//--Controladores
	const RUTA_IMAGEN = "site_media/img/";

//--Función que obtiene la estructura de una página para ser renderizada
function get_template($form){
	$file =$_SERVER['DOCUMENT_ROOT'].'/crud_angular/site_media/templates/'.$form.'.html';
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

//--
?>