// JavaScript Document

var posiciontop = 0;
var posicionleft = 0;
var tamanoMosquit = 0;
var contarvecesmueve = 0;
var intervalouno = "";
var intervaloFinal = "";
var intervalocreamosquitos = "";
var segundos = 10;
var controldetiempo = "";
var i = 0;
var matados = 0;
var puntos = 0;
var numerodemosquitos = 5;
var nivel = 1;
var fondo = '';
var mosquitonivel = '';
var mosquitonivelsplash = '';
var mosquitofinalnivel = '';


function parametros_niveles() {

	switch (nivel) {
		case 1:
			mosquitofinalnivel = 'img/3334423_orig.gif';
			mosquitonivel = 'img/mosquito1.gif';
			mosquitonivelsplash = 'img/mosquito1splash.gif';
			fondo = 'url(img/fondo-2.png)';
			segundos = 20;
			numerodemosquitos = 3;
			break;

		case 2:
			mosquitofinalnivel = 'img/8014053_orig.gif';
			mosquitonivel = 'img/mosquito6.gif';
			mosquitonivelsplash = 'img/mosquito6splash.gif';
			fondo = 'url(img/fondo-6.jpg)';
			segundos = 30;
			numerodemosquitos = 5;
			break;

		case 3:
			mosquitofinalnivel = 'img/mosquito0.gif';
			mosquitonivel = 'img/mosquito0.gif';
			mosquitonivelsplash = 'img/mosquito0splash.gif';
			fondo = 'url(img/fondo-9.jpg)';
			segundos = 30;
			numerodemosquitos = 6;
			break;
		case 9:
			mosquitofinalnivel = 'img/smash-2.png';
			mosquitonivel = 'img/mosquito6.gif';
			mosquitonivelsplash = 'img/mosquito6splash.gif';
			fondo = 'url(img/fondo-9.jpg)';
			segundos = 30;
			numerodemosquitos = 3;
			break;
	}
}

function iniciarJuego() {
	document.body.style.backgroundImage = 'url(img/fons.jpg)';
	document.body.innerHTML = '<div class="boton" onclick="pintamosquitos();">Empezar</div>';
}

function pintamosquitos() {

	parametros_niveles();

	document.body.style.backgroundImage = fondo;

	document.body.innerHTML = '<div id="puntos">PUNTOS: 0</div>' +
		'<div id="tiempo">TIME: 0</div>' +
		'<div id="nivel">NIVEL: ' + nivel + '</div>' +
		'<div id="findetiempo">Se te acabo el tiempo!!!!!! ' +
		'	<div class="boton" onclick="nuevapartida();">Nueva partida</div>' +
		'</div>' +
		'<div id="mosquitoFin" onclick="mataFinal();">' +
		'	<img src="' + mosquitofinalnivel + '" />' +
		'</div>' +
		'<div id="contenedormosquitos"></div>';


	for (i = 0; i < numerodemosquitos; i++) {

		document.getElementById('contenedormosquitos').innerHTML += '<div id="mosquito' + i + '" class="stavivo"><img id="mosquitoImg' + i + '" src="' + mosquitonivel + '" onclick="manmatao(' + i + ');" width="100%" /></div>';

		posiciontop = Math.floor(Math.random() * 90) + 1;
		posicionleft = Math.floor(Math.random() * 90) + 1;
		tamanoMosquit = Math.floor(Math.random() * 70) + 30;

		if (posiciontop > 75) {
			posiciontop = 75;
		} //limite posicion mosquitos
		if (posicionleft > 90) {
			posiciontop = 90;
		}

		document.getElementById('mosquito' + i).style.top = posiciontop + '%';
		document.getElementById('mosquito' + i).style.left = posicionleft + '%';
		document.getElementById('mosquito' + i).style.width = tamanoMosquit + 'px';

	}

	intervalouno = setInterval(mueve, 2000);
	controldetiempo = setInterval(tiempo, 1000);

}

function tiempo() {
	segundos = segundos - 1;

	if (segundos < 10) {
		document.getElementById('tiempo').innerHTML = 'TIME: 0' + segundos;
	} else {
		document.getElementById('tiempo').innerHTML = 'TIME: ' + segundos;
	}


	if (segundos == 0) {
		clearInterval(controldetiempo);
		clearInterval(intervalouno);
		document.getElementById('findetiempo').style.display = 'block';
	}

}

function mueve() {


	for (i = 0; i < numerodemosquitos; i++) {
		posiciontop = Math.floor(Math.random() * 90) + 1;
		posicionleft = Math.floor(Math.random() * 90) + 1;
		tamanoMosquit = Math.floor(Math.random() * 70) + 30;

		if (posiciontop > 75) {
			posiciontop = 75;
		} //limite posicion mosquitos
		if (posicionleft > 90) {
			posiciontop = 90;
		}

		document.getElementById('mosquito' + i).style.top = posiciontop + '%';
		document.getElementById('mosquito' + i).style.left = posicionleft + '%';
		document.getElementById('mosquito' + i).style.width = tamanoMosquit + 'px';
	}


}

function mueveFinal() {

	posiciontop = Math.floor(Math.random() * 90) + 1;
	posicionleft = Math.floor(Math.random() * 90) + 1;

	if (posiciontop > 70) {
		posiciontop = 70;
	} //limite posicion mosquitos
	if (posicionleft > 80) {
		posiciontop = 80;
	}

	document.getElementById('mosquitoFin').style.top = posiciontop + '%';
	document.getElementById('mosquitoFin').style.left = posicionleft + '%';
}

function manmatao(mata) {
	document.getElementById('mosquitoImg' + mata).src = mosquitonivelsplash;
	puntos = puntos + 5;
	//reloj que oculta el mosquito al cabo de un segundo
	setTimeout(function () {
		document.getElementById('mosquito' + mata).style.display = 'none';
	}, 1000);
	document.getElementById('puntos').innerHTML = 'PUNTOS: ' + puntos;

	matados++; //cuento cuantos mosquitos he matao


	if (matados == numerodemosquitos) { //cuando haya matado todos muestro al Boss
		clearInterval(intervalouno);
		document.getElementById('mosquitoFin').style.display = 'block';
		intervaloFinal = setInterval(mueveFinal, 2000); //muevo a Boss
		segundos = 60;
		matados = 0;
	}
}

function mataFinal() {

	matados++;
	if (nivel == 9 & matados == 10) {
		document.getElementById('mosquitoFin').innerHTML = '<img src="img/mosquitoFINALHerido.gif" />';
	}

	if (matados == 20) {

		clearInterval(intervaloFinal);
		clearInterval(controldetiempo);
		if (nivel == 9) {

			document.getElementById('mosquitoFin').innerHTML = '<img src="img/mosquitoFINALdead.gif" />';

			document.getElementById('mosquitoFin').style.top = '70%';

			document.getElementById('mosquitoFin').innerHTML = '<img src="img/smash-2.png" />';

			document.getElementById('findetiempo').innerHTML = 'Fin del juego... ¿Qué quieres hacer?' + '<div class="boton" onclick="window.close();">Salir del juego</div>' +
				'<div class="boton" onclick="nuevapartida();">Empezar de nuevo</div>';
		} else {
			'	<div class="boton" onclick="nuevonivel();">Siguiente Nivel</div>'
		}
		document.getElementById('findetiempo').style.display = 'block';
	}

	puntos = puntos + 15;
	document.getElementById('puntos').innerHTML = 'PUNTOS: ' + puntos;


}

function nuevapartida() {
	nivel = 1;
	posiciontop = 0;
	posicionleft = 0;
	tamanoMosquit = 0;
	contarvecesmueve = 0;
	intervalouno = "";
	intervaloFinal = "";
	intervalocreamosquitos = "";
	segundos = 10;
	controldetiempo = "";
	i = 0;
	matados = 0;
	puntos = 0;
	numerodemosquitos = 5;

	nivel++;
	document.getElementById('findetiempo').style.display = 'none';
	pintamosquitos();

}

function nuevonivel() {
	nivel = nivel + 1;
	posiciontop = 0;
	posicionleft = 0;
	tamanoMosquit = 0;
	contarvecesmueve = 0;
	intervalouno = "";
	intervaloFinal = "";
	intervalocreamosquitos = "";
	controldetiempo = "";
	i = 0;
	matados = 0;

	document.getElementById('findetiempo').style.display = 'none';
	pintamosquitos();
}