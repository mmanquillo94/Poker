<?php
class Cartas{
	
	var $cartaPinta;
	var $cartaNumero;
	var $pinta = array('Picas','Corazones','Trebol','Diamantes');
	var $numero = array('A','2','3','4','5','6','7','8','9','10','J','Q','K');
	
	function cartas($pinta,$numero) {
		$this->cartaPinta = $this->pinta[$pinta];
		$this->cartaNumero = $this->numero[$numero];
	}
	function getCartaPinta(){
		return ($this->cartaPinta);
	}
	function getCartaNumero(){
		return ($this->cartaNumero);
	}
		
}