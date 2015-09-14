<?php
require("../../core/conex.php");
class municipiosModel extends conex{
	public $result;
	public $sql;
	private $where;
	public function __construct(){}

	public function consult_municipio($user_data = array()){
		//--
		foreach ($user_data as $campo => $valor) {
			$$campo = $valor;
		}	
		//--
		$where = " WHERE 1=1 ";	
		if($estado!=""){
			$where.=" AND b.codigoestado='".$estado."'";
		}	
		$this->sql ="SELECT 
							a.codigomunicipio,
							a.nombre 
					 FROM
						    tbl_municipio a
					 INNER JOIN 
					 		tbl_estado b
					 ON 
					 	b.codigoestado = a.codigoestado
					 ".$where;
		$this->result = $this->execute($this->sql);
		return $this->result;
	}
}
?>