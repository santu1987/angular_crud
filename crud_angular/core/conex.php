<?php
//conexion de bd 
class Conex
{
		
			private $conexion;
			private $servidor="localhost";
			private $clave="123456";
			private $usuario="postgres";
			private $bd="espacio_virtual_ap";
			//private $bd="espacio_v_blanco";
			protected $query;
			public $arreglo = array();
			public  $sql="";
		//-- Metodo constructor*/
		public function __construct()
		{
			$this->query="";
		}
		//-- Metodo que permite conectarse a la bd
		private function conectar()
		{
			//valido la sesion antes de conectar
			$this->conexion=pg_connect('host='.$this->servidor. ' port=5432'. ' dbname='.$this->bd. ' user='.$this->usuario.' password='.$this->clave);
			if($this->conexion)
			{
				return 'SI';
			}
			else
			{
				return 'NO';
			}	
		}
		//
		//-- Metodo que permite ejecutar un query
		protected function enviarQuery($sql)
		{
			$this->conectar();
			$this->query = pg_query($sql);
			return $this->query;
		}
		//-- Vectoriza el resultado de una consulta
		protected function vectorizar()
		{
			return pg_fetch_row($this->query);
		}
		//--Para insert, update, delete
		 public function execute($sql)
		{
			$result = $this->enviarQuery($sql);
			if($result){
				$arr = array();
				while($row = $this->vectorizar()){
					$arr[] = $row;
				}
			}else{
				$arr = "error";
			}
			return $arr;
		}
}
//$bd= new Conex();
?>