<?php
require ("../../core/conex.php");
class usuarioModel extends conex{
	public $result;
	public $sql;
	private $where;
	public function __construct(){
	}

	//--Metodo para insertar campos en la tabla usuarios2
	public function insert_data($user_data = array()){
		if (array_key_exists('cedula', $user_data)){
			foreach ($user_data as $campo => $valor) {
				$$campo = $valor;
			}
			
			$this->sql = "SELECT registrar_usuario2(	
									'".$nombres."',
						  			'".$cedula."',
						  			'".$estado."',
						  			'".$municipio."',
						  			'".$parroquia."',
						  			'".$fecha."');";	
			$this->result = $this->execute($this->sql);
			return $this->result; 	
		}
	}
	//--Metodo para actualizar el campo foto de la tabla usuarios2
	public function actualizar_foto($user_data = array()){
		foreach ($user_data as $campo => $valor) {
			$$campo = $valor;
		}

		$this->sql = "UPDATE
							usuarios2
					  SET 		
							img ='".$imagen."'
					  WHERE 
					  		cedula='".$cedula."'";
		$mensaje = "cedula:".$cedula."-Imagen:".$imagen;
		$this->result = $this->execute($this->sql);
		return $this->result;		
	}
	//-- Metodo para realizar la consulta de datos de usuarios
	public function consult_data ($user_data = array()){
		foreach ($user_data as $campo => $valor) {
			$$campo = $valor;
		}
		//--Programando los filtros de la consulta-------------------------------------------------------------------------------------------------------------------
		$order_by ="ORDER BY
					  		id 
					  offset
					  		'".$offset."' 		
					  LIMIT
					  		'".$limit."'";
		//-----------------------------------------------------------------------------------------------------------------------------------------------------------
		$this->where = "WHERE 1=1 ";
		//-- Evaluo filtros....
		if($nombres!=""){
			$this->where.=" AND upper(nombres) like '%".$nombres."%'";
			$offset = 0;
			$order_by = "ORDER BY id offset 0 LIMIT 20";
		}

		if($cedula!=""){
			$this->where.=" AND cedula::character varying like '".$cedula."'";
			$offset = 0;
			$order_by = "ORDER BY id offset 0 LIMIT 20";
		}
		//--
		//-----------------------------------------------------------------------------------------------------------------------------------------------------------
		$this->sql = "SELECT 
							a.nombres,
							a.cedula,
							a.id,
							b.codigoestado,
							c.codigomunicipio,
							d.codigoparroquia,
							b.nombre as nombrestado,
							c.nombre as nombremunicipio,
							d.nombre as nombreparroquia,
							a.img 
					  FROM 
					  		usuarios2 a
					  INNER JOIN 
					  		tbl_estado b
					  ON
					  		a.estado = b.codigoestado
					  INNER JOIN 
					  		tbl_municipio c 
					  ON 
					  		a.municipio = c.codigomunicipio
					  INNER JOIN 
					  		tbl_parroquia d 
					  ON 
					  		a.parroquia = d.codigoparroquia
					   ".$this->where."
					  ORDER BY
					  		id 
					  offset
					  		'".$offset."' 		
					  LIMIT
					  		'".$limit."'";

		$this->result =  $this->execute($this->sql);
		return $this->result;
	}
	//--Metodo para consultar cuantos registros son:
	public function cuantos_data($user_data = array()){
		foreach ($user_data as $campo => $valor) {
			$$campo = $valor;
		}
		$this->where = "WHERE 1=1 ";
		//-- Evaluo filtros....
		if($nombres!=""){
			$this->where.=" AND upper(nombres) like '%".$nombres."%'";
		}

		if($cedula!=""){
			$this->where.=" AND cedula::character varying like '".$cedula."'";
		}
		$this->sql = "SELECT 
							COUNT(*)
					  FROM 
					  		usuarios2
					   ".$this->where;
		$this->result =  $this->execute($this->sql);
		return $this->result;			  		
	}
	//--
	public function update_data($user_data = array()){
		if(array_key_exists('cedula_us', $user_data)){
			foreach ($user_data as $campo => $valor) {
				$$campo = $valor;
			}
			$sql ="UPDATE 
							usuarios2
						SET 
							nombres='".$nombre_us."',
							cedula ='".$cedula_us."'
					WHERE 
							id='".$id_us."';";
			$this->result = $this->enviarQuery($sql);
			return $this->result;
		}
	}

	public function consultar_usuarios($offset,$limit,$arreglo_filtros = array()){
		//--
		foreach ($arreglo_filtros as $campo => $valor) {
			$$campo = $valor;
		}
		//--
		$this->where = "WHERE 1=1";
		//--Evaluo filtros
		if($filtro_id!=""){
			$this->where.= " AND id='".$filtro_id."'";
		}
		if($filtro_ci!=""){
			$this->where.= " AND cedula::character varying like '".$filtro_ci."'";
		}
		if($filtro_name!=""){
			$this->where.= " AND upper(nombres) like '".$filtro_name."'";
		}
		//--
		$this->sql = "SELECT 
							nombres,
							cedula,
							id
					  FROM 
					  		usuarios2
					  ".$this->where."
					  order by 
					  		id 
					 offset
					 		'".$offset."' 		
					 limit
					 		'".$limit."';";
		$this->result =  $this->execute($this->sql);
		return $this->sql;
		//--
	}
	public function __destruct(){
		unset($this);
	}
}
?>