<?php
require("../../core/conex.php");
class estadoModel extends conex{
	public $result;
	public $sql;
	private $where;
	public function __construct(){}

	public function consult_estado(){
			$this->sql ="SELECT codigoestado,nombre from tbl_estado";
			$this->result = $this->execute($this->sql);
			return $this->result;
	}
}

?>