<?php
$file = $_FILES["file"]["name"];

if(!is_dir("../site_media/img/archivos"))
	mkdir("../site_media/img/archivos",0777);
//--
$tipo_archivo = $_FILES['file']['type'];
$tamano_archivo = $_FILES['file']['size'];
$nombre_archivo = $_POST["name"].".jpg";
//--Valido que el tipo de archivo sea unicamente jpg
if (!((strpos($tipo_archivo, "jpeg") || strpos($tipo_archivo, "jpg")||(strpos($tipo_archivo, "JPG"))) && ($tamano_archivo < 1000000000))) 
{
    die("error_tipo_archivo");
}else
{
	//--
	if($file && move_uploaded_file($_FILES["file"]["tmp_name"], "../site_media/img/archivos/".$nombre_archivo))
	{
		echo $file;
		//echo "- name:".$nombre_archivo;
	}
}		
?>