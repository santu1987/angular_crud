<?php
require("../../core/conex.php");
class tipoUsModel extends conex{
	public $result;
	public $sql;
	private $where;
	public function __construct(){

	}
	//--
	public function insert_data($user_data = array()){
		foreach ($user_data as $campo) {
			$vector = $vector."-".$campo; 
		}
		return $vector;
	}
	//--
	public function consult_tipous(){	
	//--
		$this->sql = "SELECT id, nombre_tipo FROM tipo_usuario order by id";
		$this->result = $this->execute($this->sql);
		return $this->result;
	//--	
	}
}
?>