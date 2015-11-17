window.onload= function(){
	
	$("#btnCargaCont").click(function(){
		cargarContenido();
    });	
}

function traeCarta(numCarta){
	var cartas = ["As Picas", "Dos Picas", "Tres Picas","Cuatro Picas","Cinco Picas","Seis Picas","Siete Picas","Ocho Picas","Nueve Picas","Diez Picas","J Picas","Q Picas","K Picas",
		           "As Corazones", "Dos Corazones", "Tres Corazones","Cuatro Corazones","Cinco Corazones","Seis Corazones","Siete Corazones","Ocho Corazones","Nueve Corazones","Diez Corazones","J Corazones","Q Corazones","K Corazones",
		           "As Treboles", "Dos Treboles", "Tres Treboles","Cuatro Treboles","Cinco Treboles","Seis Treboles","Siete Treboles","Ocho Treboles","Nueve Treboles","Diez Treboles","J Treboles","Q Treboles","K Treboles",
		           "As Diamantes", "Dos Diamantes", "Tres Diamantes","Cuatro Diamantes","Cinco Diamantes","Seis Diamantes","Siete Diamantes","Ocho Diamantes","Nueve Diamantes","Diez Diamantes","J Diamantes","Q Diamantes","K Diamantes"
		           ];
	return cartas[numCarta];
}

function cargarContenido(){
	var cantJugadores = $('#numJugadores').val();
	
	if (cantJugadores<2 || cantJugadores>5){
		alert('La Cantidad de Jugadores debe ser minimo 2 maximo 5');
		return false;
	}
	
	 var parametros = {
             "cantJugadores" : cantJugadores,
             "valorCaja2" : 2
     };
	
	$.ajax({
		data:  parametros,
	    url:   '../php/ajax/ajaxPoker.php',
	    type:  'post',
	    beforeSend: function () {
	            $("#div1").html("Procesando, espere por favor...");
	    },
	    success:  function (response) {
	    	 	//$("#div1").html();
	            $("#div1").html(response);
	    }		
    });
}

function crearJugador(jugador){
	$("#creaJugador").attr('title', jugador);
	 
	$("#creaJugador").dialog({
		  autoOpen: false,
		  resizable: false,
		  height:250,
		  modal: true,
		  buttons: {
		   "Aceptar": function() {
			  $("#frm").submit();
		   }
		  }
		 });
	
	$( "#creaJugador" ).dialog( "open" );
}

function alertaPreFlop(numJugador,id,jugador,texto){
	
	 var dialogo = $('<div title="'+jugador+'" style="display:none" class="loading">'+"<span>"+texto+"</span>"
			 +"<table>"
			 +'</div>').appendTo('body');
	 
	 dialogo.dialog({
		  autoOpen: false,
		  resizable: false,
		  height:250,
		  width:550,
		  modal: true,
		  buttons: {
		   "Apostar o Igualar": function() {
			   igualaApuesta(numJugador);
			   decideTurno(id,numJugador,dialogo);			   
		   },
		   "Doblar": function() {
			   doblaApuesta(numJugador);
			   decideTurno(id,numJugador,dialogo);			   
		   },
		   "Apostar Todo": function() {
			   apuestaTodo(numJugador);
			   decideTurno(id,numJugador,dialogo);			   
		   },
		   "Descartar": function() {
			   terminaJuego();	
			   $(this).dialog('close');
		   }
		  }
		 });
	
	 dialogo.dialog( "open" );
}

function decideTurno(turno,numJugador,dialogo){
	 $(dialogo).dialog('close');
	 
	if($('#limJugadores').val()-1<numJugador){
		var bote = parseInt($('#txtBote').val())+parseInt($('#txtApuesta1').val())+parseInt($('#txtApuesta2').val());
		$('#txtBote').val(bote);
		$('#txtApuesta1').val('0');
		$('#txtApuesta2').val('0');
		if(turno =='PreFlop'){
			gestionaTurno(1,'Flop');
		}else if(turno =='Flop'){
			gestionaTurno(1,'Turn');
		}else if(turno =='Turn'){
			gestionaTurno(1,'River');
		}if(turno =='River'){
			gestionaTurno(1,'Final');
		}		
		
	}else{
		gestionaTurno(numJugador+1,turno);			
	}
}

function gestionaTurno(numJugador, turno){	
		//mostrarAyuda(0,numJugador);
		alertaPreFlop(numJugador,turno,turno+' turno jugador '+numJugador,'¿Que Desea Hacer?');	
}

function terminaJuego(){	
	alert('Ha perdido, el juego a terminado');	
}

function apostarTodo(numJugador){
	
	var apuesta = parseInt($('#txtApuesta'+numJugador).val());
	var bote = parseInt($('#txtBote'+numJugador).val());

	$('#txtApuesta'+numJugador).val(apuesta+bote);
	$('#txtBote'+numJugador).val('0');					
	
	$('#btnApuesta'+numJugador).attr('disabled',true);
}

function apuestaMaxima(){
	var limJugadores = $('#limJugadores').val();
	var subeApuestaAux=0;
	var apuestaMax=0;
	
	for(var i=2;i<=limJugadores;i++){
		subeApuestaAux = parseInt($('#txtApuesta'+i).val());
		if (apuestaMax < subeApuestaAux){
			apuestaMax = subeApuestaAux;
		}
	}
	
	return apuestaMax;
}

function valorCarta(carta){
	var vector=new Array();
	if (carta < 13){
		vector['Num']= carta+1;
		vector['Palo'] = 1;
	}else if (carta < 26){
		vector['Num']= carta-13+1;
		vector['Palo'] = 2;
	}else if (carta < 39){
		vector['Num']= carta-26+1;
		vector['Palo'] = 3;
	}else if (carta < 52){
		vector['Num']= carta-39+1;
		vector['Palo'] = 4;
	}
	
	return vector;
}

function valorApuesta(){
	var apuesta = parseInt($('#txtApuesta1').val());
	var limJugadores = $('#limJugadores').val();
	var subeApuestaAux = 0;
	var subeApuesta = 0;
	for(var i=2;i<=limJugadores;i++){
		subeApuestaAux = parseInt($('#txtApuesta'+i).val());
		if (apuesta < subeApuestaAux && subeApuesta<=subeApuestaAux){
			subeApuesta = subeApuestaAux-apuesta;
		}
	}
	return subeApuesta;	
}

function porcentajeBote(porcen, subeApuesta){
	var bote = parseInt($('#txtBote1').val());
	if((bote*porcen) < subeApuesta ){
		return false;
	}
	return true;
}

function vlrPorcentajeBote(subeApuesta){
	var bote = parseInt($('#txtBote1').val());
	return subeApuesta * bote/100
}


function valorMano(turno){
	var menor = 0;
	var mayor = 0;
	var diferencia = 0;
	var res = new Array();
	
	var baseHechos = new Array();
	
	var carta1 = new Array();
	var carta2 = new Array();
	var cartaB1 = new Array();
	var cartaB2 = new Array();
	var cartaB3 = new Array();
	carta1 = valorCarta(parseInt($('#numCarta1').val()));
	carta2 = valorCarta(parseInt($('#numCarta2').val()));
	cartaB1 = valorCarta(parseInt($('#numcartaBote1').val()));
	cartaB2 = valorCarta(parseInt($('#numcartaBote2').val()));
	cartaB3 = valorCarta(parseInt($('#numcartaBote3').val()));
	var carta ='';
	if (turno == 1){
		
		if(carta1['Num'] == carta2['Num']){// Pareja

			baseHechos['M'] = ''+carta1['Num']; //Mano
			baseHechos['P'] = 1; // Tiene actual Pareja
			baseHechos['PB'] = vlrPorcentajeBote(valorApuesta()); 
			
			if (carta1['Num'] >10 || carta1['Num']==1){
				if (carta1['Num']==1){
					carta = 'As';
				}else if (carta1['Num']==11){
					carta = 'J';
				}else if (carta1['Num']==12){
					carta = 'Q';
				}else if (carta1['Num']==13){
					carta = 'K';
				}
				baseHechos['M'] = carta;
				baseHechos['PM'] = 100;
				baseHechos['MB'] = 'Poker';
			}else if (carta1['Num'] >6){
				baseHechos['PM'] = 80;	
				baseHechos['MB'] = 'Poker';
			}else if (carta1['Num'] >4){
				baseHechos['PM'] = 60;			
				baseHechos['MB'] = 'Poker';
			}else if (carta1['Num'] >1){
				baseHechos['PM'] = 40;
				baseHechos['MB'] = 'Poker';
			}
		}else{// SI no es pareja
			if (carta1['Num']<carta2['Num']){
				menor = carta1['Num'];
				mayor = carta2['Num'];
				diferencia = carta2['Num']-carta1['Num'];
			}else{
				menor = carta2['Num'];
				mayor = carta1['Num'];
				diferencia = carta1['Num']-carta2['Num'];
			}
			if (mayor==1 || menor == 1){
				carta = 'As';
			}else if (mayor==11){
				carta = 'J';
			}else if (mayor==12){
				carta = 'Q';
			}else if (mayor==13){
				carta = 'K';
			}else {
				carta = mayor;
			}
			if(carta1['Palo'] == carta2['Palo']){// Misma Pinta
							
				baseHechos['C'] = 'C'; // Tiene proyecto de Color
				baseHechos['PB'] = vlrPorcentajeBote(valorApuesta()); 
				
				if (menor > 9||(menor == 1  && diferencia > 8)){
					baseHechos['PM'] = 100;
					baseHechos['MB'] = 'Escalera Real';
				}else if (menor > 5||(menor == 1  && diferencia > 4)){
					baseHechos['PM'] = 60;
					baseHechos['MB'] = 'Escalera de Color';
				}else{
					baseHechos['PM'] = 40;
					baseHechos['MB'] = 'Escalera de Color';
				}
				
			}else{
				if (menor > 9||(menor == 1  && diferencia > 8)){
					baseHechos['PM'] = 80;
					baseHechos['MB'] = 'Escalera';
				}else if (menor > 5||(menor == 1  && diferencia > 4)){
					baseHechos['PM'] = 40;
					baseHechos['MB'] = 'Full';
				}else{
					baseHechos['PM'] = 20;
					baseHechos['MB'] = 'Full';
				}
			}
		}
		
	}// Fin Turno 1
	else{
		var cartas = new Array();
		
		cartas [0] = carta1['Num'];
		cartas [1] = carta2['Num'];
		cartas [2] = cartaB1['Num'];
		cartas [3] = cartaB2['Num'];
		cartas [4] = cartaB3['Num'];
		
		cartas.sort();
		
		alert('cartas: '+cartas[0]+'-'+cartas[1]+'-'+cartas[2]+'-'+cartas[3]+'-'+cartas[4]);
	}
	
	return baseHechos;
}

function interprete(baseHechos){
	var mensaje='';
	
	if(baseHechos['ER']==1){
		mensaje += 'Posee una Escalera Real';
	}else if(baseHechos['EC']==1){
		mensaje += 'Posee una Escalera de Color';
	}else if(baseHechos['Pk']==1){
		mensaje += 'Posee un Poker';
	}else if(baseHechos['F']==1){
		mensaje += 'Posee un Full';
	}else if(baseHechos['C']==1){
		mensaje += 'Posee un Color';
	}else if(baseHechos['E']==1){
		mensaje += 'Posee una Escalera';
	}else if(baseHechos['T']==1){
		mensaje += 'Posee un Trio';
	}else if(baseHechos['DP']==1){
		mensaje += 'Posee una Doble Pareja';
	}else if(baseHechos['P']==1){
		mensaje += 'Posee una pareja';
	}else if(baseHechos['CA']==1){
		mensaje += 'Posee una carta Alta';
	}
	
	if(baseHechos['PM']==100){
		mensaje += ' (Alta) de '+baseHechos['M']+'\n'+
		'Tiene excelentes posibilidades de ganar la mano... Mano mas alta buscada '+baseHechos['MB']+'.\n'+
		'Segun su estilo de juego se le aconseja lo siguiente:\n'+
		'1. Apostar Todo (Probablemente alertara a los jugadores y estos se retiraran).\n'+
		'2. Aumentar la apuesta (No mucho para no prevenir a los demas jugadores).\n'+
		'3. Igualar para pasar desapercibido y aumentar en las otras rondas.\n';
	}else if(baseHechos['PM']==80){
		mensaje += ' (Media Alta) de '+baseHechos['M']+'\n'+
		'Tiene buenas posibilidades de ganar la mano... Mano mas alta buscada '+baseHechos['MB']+'.\n';		
		if (porcentajeBote(80/100, valorApuesta()) ){
			mensaje += 'Segun su estilo de juego se le aconseja lo siguiente:\n'+
			'1. Aumentar la apuesta (No mucho para no prevenir a los demas jugadores).\n'+
			'2. Igualar para pasar desapercibido y aumentar en las otras rondas.\n';;
		}else{
			mensaje += 'Sin embargo el valor que debe apostar es muy alto con realación a la favorabilidad de su mano.\n'+
			'Segun su estilo de juego se le aconseja lo siguiente:\n'+
			'1. Igualar la apuesta esperando mejorar la mano en las otras rondas.\n'+
			'2. Descartar la mano y no arriesgar mas dinero sin tener posibilidades altas de ganarla.';
		}
	}else if(baseHechos['PM']==60){
		mensaje += ' (Media) de '+baseHechos['M']+'\n'+
		'Tiene posibilidades medianas de ganar la mano... Mano mas alta buscada '+baseHechos['MB']+'.\n';	
		if (!porcentajeBote(80/100, valorApuesta()) ){
			mensaje += 'Sin embargo el valor que debe apostar es demasiado alto con realación a la favorabilidad de su mano.\n'+
			'Se le aconseja lo siguiente:\n'+
			'1. Descartar la mano y no arriesgar mas dinero sin tener posibilidades altas de ganarla.';
		}else if (!porcentajeBote(60/100, valorApuesta()) ){
			mensaje += 'Sin embargo el valor que debe apostar es alto con realación a la favorabilidad de su mano.\n'+
			'Segun su estilo de juego se le aconseja lo siguiente:\n'+
			'1. Igualar la apuesta esperando mejorar la mano en las otras rondas.\n'+
			'2. Descartar la mano y no arriesgar mas dinero sin tener posibilidades altas de ganarla.';
		}else{
			mensaje += 'Sin embargo el valor que debe apostar es medio con realación a la favorabilidad de su mano.\n'+
			'Segun su estilo de juego se le aconseja lo siguiente:\n'+
			'1. Apostar una minima cantidad para prevenir al rival y hacerlo creer que tiene una buena mano.\n'+
			'2. Igualar la apuesta esperando mejorar la mano en las otras rondas.\n'+
			'3. Descartar la mano y no arriesgar mas dinero sin tener posibilidades altas de ganarla.';
		}
	}else if(baseHechos['PM']==40){
		mensaje += ' (Media Baja) de '+baseHechos['M']+'\n'+
		'Tiene pocas posibilidades  de ganar la mano... Mano mas alta buscada '+baseHechos['MB']+'.\n';	
		if (!porcentajeBote(60/100, valorApuesta()) ){
			mensaje += 'Sin embargo el valor que debe apostar es demasiado alto con realación a la favorabilidad de su mano.\n'+
			'Se le aconseja lo siguiente:\n'+
			'1. Descartar la mano y no arriesgar mas dinero sin tener posibilidades altas de ganarla.';
		}else if (!porcentajeBote(40/100, valorApuesta()) ){
			mensaje += 'Sin embargo el valor que debe apostar es alto con realación a la favorabilidad de su mano.\n'+
			'Segun su estilo de juego se le aconseja lo siguiente:\n'+
			'1. Igualar la apuesta esperando mejorar la mano en las otras rondas.\n'+
			'2. Descartar la mano y no arriesgar mas dinero sin tener posibilidades altas de ganarla.';
		}else{
			mensaje += 'Sin embargo el valor que debe apostar es medio con realación a la favorabilidad de su mano.\n'+
			'Segun su estilo de juego se le aconseja lo siguiente:\n'+
			'1. Apostar una minima cantidad para prevenir al rival y hacerlo creer que tiene una buena mano.\n'+
			'2. Igualar la apuesta esperando mejorar la mano en las otras rondas.\n'+
			'3. Descartar la mano y no arriesgar mas dinero sin tener posibilidades altas de ganarla.';
		}
	}else if(baseHechos['PM']==20){
		mensaje += ' (Baja) de '+baseHechos['M']+'\n'+
		'Tiene bajas posibilidades de ganar la mano... Mano mas alta buscada '+baseHechos['MB']+'.\n';	
		if (!porcentajeBote(40/100, valorApuesta()) ){
			mensaje += 'Sin embargo el valor que debe apostar es demasiado alto con realación a la favorabilidad de su mano.\n'+
			'Se le aconseja lo siguiente:\n'+
			'1. Descartar la mano y no arriesgar mas dinero sin tener posibilidades altas de ganarla.';
		}else if (!porcentajeBote(20/100, valorApuesta()) ){
			mensaje += 'Sin embargo el valor que debe apostar es alto con realación a la favorabilidad de su mano.\n'+
			'Segun su estilo de juego se le aconseja lo siguiente:\n'+
			'1. Igualar la apuesta esperando mejorar la mano en las otras rondas.\n'+
			'2. Descartar la mano y no arriesgar mas dinero sin tener posibilidades altas de ganarla.';
		}else{
			mensaje += 'Sin embargo el valor que debe apostar es medio con realación a la favorabilidad de su mano.\n'+
			'Segun su estilo de juego se le aconseja lo siguiente:\n'+
			'1. Apostar una minima cantidad para prevenir al rival y hacerlo creer que tiene una buena mano.\n'+
			'2. Igualar la apuesta esperando mejorar la mano en las otras rondas.\n'+
			'3. Descartar la mano y no arriesgar mas dinero sin tener posibilidades altas de ganarla.';
		}
	}else{
		mensaje += ' (Mala) de '+baseHechos['M']+'\n'+
		'Tiene malas posibilidades de ganar la mano... Mano mas alta buscada '+baseHechos['MB']+'.\n';	
		if (!porcentajeBote(20/100, valorApuesta()) ){
			mensaje += 'Sin embargo el valor que debe apostar es demasiado alto con realación a la favorabilidad de su mano.\n'+
			'Se le aconseja lo siguiente:\n'+
			'1. Descartar la mano y no arriesgar mas dinero sin tener posibilidades altas de ganarla.';
		}else {
			mensaje += 'Sin embargo el valor que debe apostar es alto con realación a la favorabilidad de su mano.\n'+
			'Segun su estilo de juego se le aconseja lo siguiente:\n'+
			'1. Igualar la apuesta esperando mejorar la mano en las otras rondas.\n'+
			'2. Descartar la mano y no arriesgar mas dinero sin tener posibilidades altas de ganarla.';
		}
	}
	
	return mensaje;
}

function muestraAyuda(turno){
	
	var carta1 = parseInt($('#numCarta1').val());
	var carta2 = $('#numCarta2').val();
	var baseHechos = new Array();
	baseHechos =valorMano(turno);
	
	alert(interprete(baseHechos));	
}

function gestionarAccion(numJugador){
	
	var id="hola"+numJugador;
	var titulo="PreFlop Jugador "+numJugador;
	
	 var dialogo = $('<div title="'+titulo+'" style="display:none" class="loading">'+"<span> Que Desea Hacer? </span>"
			 +"<table>"
			 +'</div>').appendTo('body');
	 
	 dialogo.dialog({
		  autoOpen: false,
		  resizable: false,
		  height:250,
		  width:550,
		  modal: true,
		  buttons: {
		  
		  }
		 });
	 
	 var decideBoton = validaPasar(numJugador);
	 
	 var buttons = dialogo.dialog("option", "buttons");
	 
	 if (decideBoton != 3){
		 
		 if(decideBoton == 1){
			 $.extend(buttons, { 
				 "Pasar": function() {
				   $(this).dialog('close');		   
			   }
			 });			 
		 }else{
			 $.extend(buttons, { 
				 "Igualar": function() {
				   igualar(numJugador);
				   $(this).dialog('close');				   
			   }
			 });
		 }
		 
		 dialogo.dialog("option", "buttons", buttons); // setter
		 $.extend(buttons, { 
			 "Apostar": function() {
			   apostar(numJugador);
			   $(this).dialog('close');	   
		   },"Descartar": function() {
			   terminaJuego();	
			   $(this).dialog('close');
		   } });
		 dialogo.dialog("option", "buttons", buttons); // setter
	 }else{
		 $.extend(buttons, { 
			 "Apostar Todo": function() {
			   apostarTodo(numJugador);
			   $(this).dialog('close');			   
		   },"Descartar": function() {
			   terminaJuego();	
			   $(this).dialog('close');
		   } });
		 dialogo.dialog("option", "buttons", buttons); // setter
	 }
		 
	 if (numJugador == 1){
		 $.extend(buttons, { 
			 "Mostrar Ayuda": function() {
			 muestraAyuda(parseInt($('#turno').val())+1);			   			   
		   }
		 });
		 dialogo.dialog("option", "buttons", buttons); // setter
	 }
	 
	 
	 dialogo.dialog("option", "buttons", buttons); // setter
	 
	 dialogo.dialog( "open" );

}
function validaPasar(numJugador){
	var apuesta = $('#txtApuesta'+numJugador).val();
	var limJugadores = $('#limJugadores').val();
	var decide = 0;
	var decideAux = 0; 
	/*
	 * 1 = Activa Boton Pasar
	 * 2 = Activa Boton Igualar
	 * 3 = Solo Activa Boton Apostar Todo 
	 */
	
	for(var i=1;i<=limJugadores;i++){
		decideAux=0;
		if (apuesta < $('#txtApuesta'+i).val() ){
			decideAux = validaTamanoBote(i,apuesta);
		}else{
			decideAux = 1;
		}
		if(decideAux>decide){
			decide=decideAux;
		}
	}
	return decide;
}

function validaTamanoBote(numJugador,apuesta){
	var bote = parseInt($('#txtBote'+numJugador).val());
	var apuesta2 = parseInt($('#txtApuesta'+numJugador).val());
	if (bote+apuesta2 <= apuesta){
		return 3;
	}else{
		return 2;
	}
}

function apostar(numJugador){
	var correcto = false;
	var apuesta = 0;
	var bote = parseInt($('#txtBote'+numJugador).val());
	do{
		apuesta = prompt('Digite el valor de la apuesta',0);
		
		
		apuesta = parseInt(apuesta);
		if (apuesta <= 0 ){
			alert('El valor de la apuesta debe ser mayor a cero');
			correcto = false;
		}else {
			if(apuesta > bote){
				alert('El valor de la apuesta no puede exceder el tamaño del bote '+bote);
				correcto = false;
			}else{				
				correcto = true;
			}
		}
		
		
	}while(correcto == false);
	
	if (correcto == true && apuesta > 0 ){
		var totalApuesta = parseInt($('#txtApuesta'+numJugador).val());
		
		$('#txtApuesta'+numJugador).val(totalApuesta+apuesta);
		$('#txtBote'+numJugador).val(bote-apuesta);
		
		if ($('#txtBote'+numJugador).val() == 0){
			$('#btnApuesta'+numJugador).attr('disabled',true);
		}
		
	}else{
		alert('No se realizo la apuesta');
	}
	
	
}

function igualar(numJugador){
	var apuesta = parseInt($('#txtApuesta'+numJugador).val());
	var bote = parseInt($('#txtBote'+numJugador).val());
	var limJugadores = $('#limJugadores').val();
	var subeApuestaAux = 0;
	var subeApuesta = 0;
	for(var i=1;i<=limJugadores;i++){
		subeApuestaAux = parseInt($('#txtApuesta'+i).val());
		if (apuesta < subeApuestaAux && subeApuesta<=subeApuestaAux){
			subeApuesta = subeApuestaAux;
		}
	}
	
	if (subeApuesta > apuesta){
		$('#txtApuesta'+numJugador).val((subeApuesta-apuesta)+apuesta);
		$('#txtBote'+numJugador).val(bote-(subeApuesta-apuesta));
		
		if ($('#txtBote'+numJugador).val() == 0){
			$('#btnApuesta'+numJugador).attr('disabled',true);
		}
	}
}

function gestionarTurno(){
	var limJugadores = $('#limJugadores').val();
	var bote = parseInt($('#txtBote').val());
	var totalApuesta = 0;
	var turno = parseInt($('#turno').val());
	//alert(bote);
	for(var i=1;i<=limJugadores;i++){
		totalApuesta += parseInt($('#txtApuesta'+i).val());
	}
	
	bote = bote + totalApuesta;
	//alert(bote);
	$('#txtBote').val(bote);
	
	turno = turno+1;
	
	if (turno == 1){
		alert("Empieza el Flop");
		flop();
	}else if (turno == 2){
		alert("Empieza el Turn");
		turn();
	}else if (turno == 3){
		alert("Empieza el River");
		river();
	}else if (turno == 4){
		alert("El juego ha acabado");
	}
	$('#turno').val(turno)
	
}
function flop(){
	
	$('#cartaBote1').val($('#txtcartaBote1').val());
	$('#cartaBote2').val($('#txtcartaBote2').val());
	$('#cartaBote3').val($('#txtcartaBote3').val());
	
	$('#tdCartaBote1').show();
	$('#tdCartaBote2').show();
	$('#tdCartaBote3').show();
}
function turn(){
	
	$('#cartaBote4').val($('#txtcartaBote4').val());	
	$('#tdCartaBote4').show();
	
}function river(){
	
	$('#cartaBote5').val($('#txtcartaBote5').val());
	$('#tdCartaBote5').show();
}



