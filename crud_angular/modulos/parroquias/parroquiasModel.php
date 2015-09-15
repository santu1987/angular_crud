<?php
require("../../core/conex.php");
class parroquiasModel extends conex{
	public $result;
	public $sql;
	private $where;
	public function __construct(){}

	public function consult_parroquia($user_data = array()){
		//--
		foreach ($user_data as $campo => $valor) {
			$$campo = $valor;
		}	
		//--
		$where = "WHERE 1=1 ";	
		if($municipio!=""){
			$where.=" AND b.codigomunicipio='".$municipio."'";
		}	
		$this->sql ="SELECT 
							a.codigoparroquia,
							a.nombre 
					 FROM
						    tbl_parroquia a
					 INNER JOIN 
					 		tbl_municipio b
					 ON 
					 	b.codigomunicipio = a.codigomunicipio
					 ".$where;
		$this->result = $this->execute($this->sql);
		return $this->result;
	}
}
?>