<?php

require_once '../clases/cartas.php';
class Jugadores{
	var $numJugador;
	var $carta1;
	var $carta2;
	
	function jugadores($numJuga, $car1 = null, $car2 = null) {
		$this->numJugador = $numJuga;
		$this->carta1 = $car1;
		$this->carta2 = $car2;
	}
	
	function getJugador(){
		print 'El jugador '.$this->numJugador.' Carta 1: '.$this->carta1->getCartaNumero().' '.$this->carta1->getCartaPinta().' Carta 2: '.$this->carta2->getCartaNumero().' '.$this->carta2->getCartaPinta();
	}
	
}