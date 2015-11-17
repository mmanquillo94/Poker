<title>Pokerstatic's</title>
<center>Bienvenido a Poker Static's</center>
<script type='text/javascript' src ='../../js/jquery-2.1.4.js'></script>
<script type='text/javascript' src ='../../js/jquery-ui.js'></script>
<script type='text/javascript' src ='../../js/poker.js'></script>
<link rel="stylesheet" type="text/css" href="../../js/jquery-ui.css"> </link>
<div>
	<br>
	<center>Bote : <input type='text' id='txtBote' name='txtBote' readonly value='0'/><center>
	<br>
	<table align='center' border='1'>
		<tr>
			<th>
				Carta 1 Bote
			</th>
			<th>
				Carta 2 Bote
			</th>
			<th>
				Carta 3 Bote
			</th>
			<th>
				Carta 4 Bote
			</th>
			<th>
				Carta 5 Bote
			</th>
		</tr>
		<tr>
			<td id ='tdCartaBote1' style='display:none'>
				<input type='text' id='cartaBote1' name='cartaBote1'/>
			</td>
			<td id ='tdCartaBote2' style='display:none'>
				<input type='text' id='cartaBote2' name='cartaBote2'/>
			</td>
			<td id ='tdCartaBote3'  style='display:none'>
				<input type='text' id='cartaBote3' name='cartaBote3'/>
			</td>
			<td id ='tdCartaBote4'  style='display:none'>
				<input type='text' id='cartaBote4' name='cartaBote4'/>
			</td>
			<td  id ='tdCartaBote5' style='display:none'>
				<input type='text' id='cartaBote5' name='cartaBote5'/>
			</td>
		</tr>
	</table>
	
	<center><img src="<?php echo '../../imagenes/mesa'.$_POST["numJugadores"].'.jpg';?>"/><center>
	<input type='hidden' id='limJugadores' value='<?php echo $_POST["numJugadores"];?>'>
	<input type='hidden' id='turno' value='0'>
</div>

<?php

$cartas = array("As Picas", "Dos Picas", "Tres Picas","Cuatro Picas","Cinco Picas","Seis Picas","Siete Picas","Ocho Picas","Nueve Picas","Diez Picas","J Picas","Q Picas","K Picas",
		"As Corazones", "Dos Corazones", "Tres Corazones","Cuatro Corazones","Cinco Corazones","Seis Corazones","Siete Corazones","Ocho Corazones","Nueve Corazones","Diez Corazones","J Corazones","Q Corazones","K Corazones",
		"As Treboles", "Dos Treboles", "Tres Treboles","Cuatro Treboles","Cinco Treboles","Seis Treboles","Siete Treboles","Ocho Treboles","Nueve Treboles","Diez Treboles","J Treboles","Q Treboles","K Treboles",
		"As Diamantes", "Dos Diamantes", "Tres Diamantes","Cuatro Diamantes","Cinco Diamantes","Seis Diamantes","Siete Diamantes","Ocho Diamantes","Nueve Diamantes","Diez Diamantes","J Diamantes","Q Diamantes","K Diamantes"
);

$numJugadores = $_POST["numJugadores"];
echo "</br>";
require_once '../clases/jugadores.php';
require_once '../clases/cartas.php';

//echo $_POST['carta1Pinta'];

$arrCartasBote = array (null);

$arrCartas1Jug = array (null);
$arrCartas2Jug = array (null);

$carta1 = $_POST['carta1Pinta']+$_POST['carta1Numero']-1;
$carta2 =$_POST['carta2Pinta']+$_POST['carta2Numero']-1;

for($i=0;$i<5;$i++){
	$random = rand(0,51);
	
		if($random == $carta1 || $random == $carta2 || in_array($random, $arrCartasBote)  ){
			$i--;
		}else{
			$arrCartasBote[$i] = $random;
		}
}


for($i=2;$i<=$_POST["numJugadores"];$i++){
	$random = rand(0,51);

	if($random == $carta1 || $random == $carta2 || in_array($random, $arrCartasBote)|| in_array($random, $arrCartas1Jug)  ){
		$i--;
	}else{
		$arrCartas1Jug[$i] = $random;
	}
}

for($i=2;$i<=$_POST["numJugadores"];$i++){
	$random = rand(0,51);

	if($random == $carta1 || $random == $carta2 || in_array($random, $arrCartasBote)|| in_array($random, $arrCartas1Jug) || in_array($random, $arrCartas2Jug)  ){
		$i--;
	}else{
		$arrCartas2Jug[$i] = $random;
	}
}

/*print_r($arrCartasBote);
echo "<br>";
print_r($arrCartas1Jug);
echo "<br>";
print_r($arrCartas2Jug);
echo "<br>";
print_r($carta1);
echo "<br>";
print_r($carta2);
*/
?>
<input type='hidden' id='numCarta1' name='numCarta1' readonly value="<?php echo $carta1;?>"/>
<input type='hidden' id='numCarta2' name='numCarta2' readonly value="<?php echo $carta2;?>"/>
<input type='hidden' id='numcartaBote1' name='numcartaBote1' readonly value="<?php echo $arrCartasBote[0];?>"/>
<input type='hidden' id='numcartaBote2' name='numcartaBote2' readonly value="<?php echo $arrCartasBote[1];?>"/>
<input type='hidden' id='numcartaBote3' name='numcartaBote3' readonly value="<?php echo $arrCartasBote[2];?>"/>
<input type='hidden' id='numcartaBote4' name='numcartaBote4' readonly value="<?php echo $arrCartasBote[3];?>"/>
<input type='hidden' id='numcartaBote5' name='numcartaBote5' readonly value="<?php echo $arrCartasBote[4];?>"/>

<input type='hidden' id='txtcartaBote1' name='txtcartaBote1' readonly value="<?php echo $cartas[$arrCartasBote[0]];?>"/>
<input type='hidden' id='txtcartaBote2' name='txtcartaBote2' readonly value="<?php echo $cartas[$arrCartasBote[1]];?>"/>
<input type='hidden' id='txtcartaBote3' name='txtcartaBote3' readonly value="<?php echo $cartas[$arrCartasBote[2]];?>"/>
<input type='hidden' id='txtcartaBote4' name='txtcartaBote4' readonly value="<?php echo $cartas[$arrCartasBote[3]];?>"/>
<input type='hidden' id='txtcartaBote5' name='txtcartaBote5' readonly value="<?php echo $cartas[$arrCartasBote[4]];?>"/>

<div id='preFlop'>
	<table border='1' align='center'>
		<tr>
			<th>Carta 1</th>
			<th>Carta 2</th>
			<th>Gestionar Turno</th>
		</tr>
		<tr>
			<td><input type='text' id='txtcarta1' name='txtcarta1' readonly value='<?php echo $cartas[$carta1];?>'/></td>
			<td><input type='text' id='txtcarta2' name='txtcarta2' readonly value='<?php echo $cartas[$carta2];?>'/></td>
			<td><button id='btnTurno' name='btnTurno' value='gestionarTurno' onclick='gestionarTurno();' title='Gestionar Turno'>Gestionar Turno</button></td>
		</tr>
		<?php 
			for($i=2;$i<=$numJugadores;$i++){
				echo "<tr id='otrasCartas' style='display:none'>";
			
				echo "<td><input type='text' id='txtcarta1-".$i."' name='txtcarta1-".$i."' readonly value='".$cartas[$arrCartas1Jug[$i]]."'/></td>";
				echo "<td><input type='text' id='txtcarta1-".$i."' name='txtcarta1-".$i."' readonly value='".$cartas[$arrCartas2Jug[$i]]."'/></td>";
					
				echo "</tr>";
			}
		?>
	</table>
	<br>
	<table border='1' align='center'>
		<tr>
			<?php 
				for($i=1;$i<=$numJugadores;$i++){
					echo "<th> Jugador ".$i." Apuesta</th>";
				}
			?>
		</tr>
		<tr>
			<?php 
				for($i=1;$i<=$numJugadores;$i++){
					echo "<td align='center'><input type='text' id='txtApuesta".$i."' name='txtApuesta".$i."' readonly value='0'/></td>";
				}
			?>
		</tr>
		<tr>
			<?php 
				for($i=1;$i<=$numJugadores;$i++){
					echo "<td align='center'><button id='btnApuesta".$i."' name='btnApuesta".$i."' onclick='gestionarAccion(".$i.");' >Acciones</button></td>";
				}
			?>
		</tr>
		<tr>
			<?php 
				for($i=1;$i<=$numJugadores;$i++){
					echo "<th> Bote Jug. ".$i." Apuesta</th>";
				}
			?>
		</tr>
		<tr>
			<?php 
				for($i=1;$i<=$numJugadores;$i++){
					echo "<td align='center'><input type='text' id='txtBote".$i."' name='txtBote".$i."' readonly value='100000'/></td>";
				}
			?>
		</tr>
	</table>
</div>
