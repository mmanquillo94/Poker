<?php
$cantJugadores= $_POST['cantJugadores'];

echo "<script> crearJugador('Jugador 1')</script>";

?>
<div>
	<center><img src="../imagenes/mesa2.jpg"><center>
</div>

<div style='display:none;' id='creaJugador'>
	<form id='frm' action="../php/vista/poker.php" method="post">
		<input type='hidden' id='numJugadores' name='numJugadores' value='<?php echo $cantJugadores?>'>
		<table>
			<tr>
				<td>
				Carta 1:
				</td>
				<td>
					<select id='carta1Numero' name='carta1Numero'>
						<option value="1">A</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
						<option value="5">5</option>
						<option value="6">6</option>
						<option value="7">7</option>
						<option value="8">8</option>
						<option value="9">9</option>
						<option value="10">10</option>
						<option value="11">J</option>
						<option value="12">Q</option>
						<option value="13">K</option>
					</select>		
				</td>	
				<td>
					<select id='carta1Pinta' name='carta1Pinta'>
						<option value="0">Picas</option>
						<option value="13">Corazones</option>
						<option value="26">Trebol</option>
						<option value="39">Diamantes</option>
					</select>			
				</td>					
			</tr>
			<tr>
				<td>
					Carta 2:
				</td>
				<td>
					<select id='carta2Numero' name='carta2Numero'>
						<option value="1">A</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
						<option value="5">5</option>
						<option value="6">6</option>
						<option value="7">7</option>
						<option value="8">8</option>
						<option value="9">9</option>
						<option value="10">10</option>
						<option value="11">J</option>
						<option value="12">Q</option>
						<option value="13">K</option>
					</select>		
				</td>	
				<td>
					<select id='carta2Pinta' name='carta2Pinta'>
						<option value="0">Picas</option>
						<option value="13">Corazones</option>
						<option value="26">Trebol</option>
						<option value="39">Diamantes</option>
					</select>			
				</td>				
			</tr>
			
		</table>
	</form>	
</div>


