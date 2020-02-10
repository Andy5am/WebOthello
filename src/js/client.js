// Andy Castillo 18040
// Ejercicio Othello
// 9.02.2020

//Se importaron funcones de lodash y mathjs
import lastIndexOf from 'lodash/lastIndexOf'
import indexOf from 'lodash/indexOf'
import drop from 'lodash/drop'
import dropRight from 'lodash/dropRight'
import isEmpty from 'lodash/isEmpty'
import zip from 'lodash/zip'
import unzip from 'lodash/unzip'
import flattenDeep from 'lodash/flattenDeep'
import { transpose } from 'mathjs'

//se llama al dom
const root = document.getElementById('root');

//funcion para sumar dos numeros
const sumar = (a = 0, b) => a + b;

//Funcion para verificar si se puede hacer un movimiento horizontal o vertical
const verificarHor = (lista, indexF, indexC, state) => {
	const length = lista.length;
	const valor = state.turnoJugador1? 1:-1;
//Consigue el ulitmo y primer index del elemento de su mismo color en la fila
	let indexIz = lastIndexOf(lista,valor,indexC);
	let indexDer = indexOf(lista,valor,indexC);
	state.board[indexF][indexC] = state.turnoJugador1? -1:1;
//Comprueba que si hay para izquierda y derecha sino es el index que se apacho
	if(indexIz < 0 || indexIz === indexC -1){
		indexIz = indexC;
	}
	//Se hace mas pequeña la lista para solo dejar los elemento a cambiar de color
	lista = drop(lista, indexIz + 1);
	if(indexDer < 0 || indexDer === indexC +1){
		indexDer = indexC;
	}
	lista = dropRight(lista, length - indexDer);
//Si la lista modificada no esta vacia
//Se verifica que solo hayan elementos del otro color
	if (!isEmpty(lista)) {
		if (valor > 0) {
			//state.board[indexF][indexC] = 1;
			if (lista.reduce(sumar) === (indexIz - indexDer + 1)
				) {
				//state.board = transpose(state.board);
				state.board[indexF].map((fila, col) => {
					if (col > indexIz && col < indexDer) {
						state.board[indexF][col] = 1;

					}
				})
				state.board[indexF][indexC] = 0;
				return true;
			}else{
				state.board[indexF][indexC] = 0;
				return false;
			}
		}else{
			//state.board[indexF][indexC] = -1;
			if (lista.reduce(sumar) === (indexDer - indexIz - 1)
			) {
				state.board[indexF].map((fila, col) => {
					if (col > indexIz && col < indexDer) {
						state.board[indexF][col] = -1;
					}
				})
				state.board[indexF][indexC] = 0;
				return true;
			}else{
				state.board[indexF][indexC] = 0;
				return false;
			}
		}
	}else {
		state.board[indexF][indexC] = 0;
		return false;
	}	
}

//Funcion para verificar si se puede hacer movimiento Diagonal Arriba Izquierda
const verificarDiaArI = (indexF, indexC, state, continuar = false) => {
	const valor = state.turnoJugador1? 1:-1;
	const notValor = state.turnoJugador1? -1:1;
	let resultado = false;
	//Se verifica que no sea en la orilla donde ya no hay espacios
	if(indexF === 0 || indexC === 0){
		return resultado;
	}
	//Si la siguinte pieza es del otro color se vuelve a llamar la funcion
	if (state.board[indexF-1][indexC-1]===notValor) {
		continuar = true;
		resultado = verificarDiaArI(indexF-1,indexC-1,state,continuar);
	}else if (state.board[indexF-1][indexC-1] === valor){
//Si la siguiente pieza es del mismo color se ve si ya se habia encontrado una de otro antes
		resultado = continuar ;
	}
	return resultado;
}

//Funcion para ver movimiento Diagonla Arriba Derecha
//Igual que la anterior solo cambia donde se evalua
const verificarDiaArD = (indexF, indexC, state, continuar = false) =>{
	const valor = state.turnoJugador1? 1:-1;
	const notValor = state.turnoJugador1? -1:1;
	let resultado = false;
	if(indexF === 0 || indexC === 7){
		return resultado;
	}
	if (state.board[indexF-1][indexC+1] === notValor){
		continuar = true;
		resultado = verificarDiaArD(indexF-1,indexC+1,state,continuar);
	}
	if (state.board[indexF-1][indexC+1] === valor){
		resultado = continuar;
	}
	return resultado;
}

//Funcion para cambiar la piezas de color en Diagonal Arriba Izquierda
//Hace lo mismo que la anterior solo que si la siquiente es de otro color cambia su valor
const cambiarDiaArI = (indexF, indexC, state, continuar= false) => {
	const valor = state.turnoJugador1 ? 1:-1;
	const notValor = state.turnoJugador1 ? -1:1;
	if (state.board[indexF-1][indexC-1]===notValor) {
		continuar = true;
		state.board[indexF-1][indexC-1] = valor;
		cambiarDiaArI(indexF-1,indexC-1,state,continuar);
	}else if (state.board[indexF-1][indexC-1]=== valor){
		if (continuar) {
			return true;
		}else {
			return false;
		}
	}else{
		return false;
	}
}

//Funcion para cambiar la piezas de color en Diagonal Arriba Derecha
//Hace lo mismo que la anterior solo que si la siquiente es de otro color cambia su valor
const cambiarDiaArD = (indexF, indexC, state, continuar=false) => {
	const valor = state.turnoJugador1 ? 1:-1;
	const notValor = state.turnoJugador1 ? -1:1;
	if (state.board[indexF-1][indexC+1]===notValor) {
		continuar = true;
		state.board[indexF-1][indexC+1] = valor;
		cambiarDiaArD(indexF-1,indexC+1,state,continuar);
	}else if (state.board[indexF-1][indexC+1] === valor){
		if (continuar) {
			return true;
		}else {
			return false;
		}
	}else{
		return false;
	}
}

//Funcion para ver movimiento Diagonla Abajo Derecha
//Igual que la anterior solo cambia donde se evalua
const verificarDiaAbD = (indexF, indexC, state, continuar = false) =>{
	const valor = state.turnoJugador1? 1:-1;
	const notValor = state.turnoJugador1? -1:1;
	let resultado = false;
	if(indexF === 7 || indexC === 7){
		return resultado;
	}
	if (state.board[indexF+1][indexC+1] === notValor){
		continuar = true;
		resultado = verificarDiaAbD(indexF+1,indexC+1,state,continuar);
	}
	if (state.board[indexF+1][indexC+1] === valor){
		resultado = continuar;
	}
	return resultado;
}

//Funcion para cambiar la piezas de color en Diagonal Abajo Derecha
//Hace lo mismo que la anterior solo que si la siquiente es de otro color cambia su valor
const cambiarDiaAbD = (indexF, indexC, state, continuar=false) => {
	const valor = state.turnoJugador1 ? 1:-1;
	const notValor = state.turnoJugador1 ? -1:1;
	if (state.board[indexF+1][indexC+1]===notValor) {
		continuar = true;
		state.board[indexF+1][indexC+1] = valor;
		cambiarDiaAbD(indexF+1,indexC+1,state,continuar);
	}else if (state.board[indexF+1][indexC+1] === valor){
		if (continuar) {
			return true;
		}else {
			return false;
		}
	}else{
		return false;
	}
}

//Funcion para ver movimiento Diagonla Abajo Izquierda
//Igual que la anterior solo cambia donde se evalua
const verificarDiaAbI = (indexF, indexC, state, continuar = false) =>{
	const valor = state.turnoJugador1? 1:-1;
	const notValor = state.turnoJugador1? -1:1;
	let resultado = false;
	if(indexF === 7 || indexC === 0){
		return resultado;
	}
	if (state.board[indexF+1][indexC-1] === notValor){
		continuar = true;
		resultado = verificarDiaAbI(indexF+1,indexC-1,state,continuar);
	}
	if (state.board[indexF+1][indexC-1] === valor){
		resultado = continuar;
	}
	return resultado;
}

//Funcion para cambiar la piezas de color en Diagonal Abajo Izquierda
//Hace lo mismo que la anterior solo que si la siquiente es de otro color cambia su valor
const cambiarDiaAbI = (indexF, indexC, state, continuar=false) => {
	const valor = state.turnoJugador1 ? 1:-1;
	const notValor = state.turnoJugador1 ? -1:1;
	if (state.board[indexF+1][indexC-1]===notValor) {
		continuar = true;
		state.board[indexF+1][indexC-1] = valor;
		cambiarDiaAbI(indexF+1,indexC-1,state,continuar);
	}else if (state.board[indexF+1][indexC-1] === valor){
		if (continuar) {
			return true;
		}else {
			return false;
		}
	}else{
		return false;
	}
}

//Funcion para ver quien va ganando
const verGanador = (state) => {
	//Se convierte la matriz en una sola lista y se suman todos sus valores
	const tablero = flattenDeep(state.board);
	const suma = tablero.reduce(sumar);
	if (suma < 0) {
		return -1;
	}else if (suma > 0){
		return 1;
	}else{
		return 0;
	}
}

//Funcion para renderizar las fichas
const renderFicha = ({fila, columna,valor, state}) => {
	const ficha = document.createElement('div');
//El estilo de cada ficha
	ficha.style.height = '25px';
	ficha.style.width = '25px';
	ficha.style.padding = '10px';
	ficha.style.margin = '10px';
	ficha.style.borderRadius = '25px';
	ficha.style.float = 'left';
	if (valor===1) {
		ficha.style.backgroundColor = 'black';
	}else if(valor === -1){
		ficha.style.backgroundColor = 'white';
	}else{
		ficha.style.backgroundColor = 'grey';
	}
//Funcion onclick de las fichas 
//Al apachar se verifica si se puede poner en cada direccion
//En los que se puede se cambia de color
//Y si se pudo en alguno cambia de turno y aparece quien va ganando
	ficha.onclick = () => {




		if (valor === 0) {
			const verificadoH = verificarHor(state.board[fila],fila, columna, state);

			state.board = transpose(state.board);

			const verificadoV = verificarHor(state.board[columna],columna, fila,state);

			state.board = transpose(state.board);
			const verificadoDAI = verificarDiaArI(fila, columna, state);
			if (verificadoDAI) {
				cambiarDiaArI(fila,columna,state);
			}
			const verificadoDAD = verificarDiaArD(fila,columna,state);
			if (verificadoDAD) {
				cambiarDiaArD(fila,columna,state);
			}
			const verificadoDAbD = verificarDiaAbD(fila,columna,state);
			if (verificadoDAbD) {
				cambiarDiaAbD(fila,columna,state);
			}
			const verificadoDAbI = verificarDiaAbI(fila,columna,state);
			if (verificadoDAbI) {
				cambiarDiaAbI(fila,columna,state);
			}
			if (verificadoH || verificadoV || verificadoDAI || verificadoDAD || verificadoDAbI || verificadoDAbD) {
				state.board[fila][columna] = state.turnoJugador1? 1:-1 ;
				state.turnoJugador1 = !state.turnoJugador1;

			}
			if(verGanador(state)===-1){
				console.log("Va ganando el jugador 2: blanco")
			}else if(verGanador(state)===1){
				console.log("Va ganando el jugador 1: negro")
			}else{
				console.log("Van empate")
			}
			const jugador = state.turnoJugador1? "Jugador 1: negro":"Jugador 2: blanco";
			console.log("Es turno del",jugador);
			root.innerHTML = '';
			render(root,state);
		}
	}

	return ficha;
};

//Funcion que renderiza el tablero
const render = (root, state) => {
//Estilo del tablero
	const tablero = document.createElement('div');
	tablero.style.backgroundColor = 'DarkGreen';
	tablero.style.height = '520px';
	tablero.style.width = '520px';
	tablero.style.padding = '20px';
//Creacion de la fichas dentro del tablero
	state.board.map(
		(filas, fila) => {
		filas.map((valor, columna) => renderFicha({fila, columna,valor, state})).forEach(
			ficha => tablero.appendChild(ficha))
	},)
	root.appendChild(tablero);
}
//El estado del juego el cual va cambiando
const state = {
	turnoJugador1 : true,
	board: [[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,1,-1,0,0,0],
			[0,0,0,-1,1,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0]],
		};
//Se llama al render para jugar
render(root, state);
console.log("Es turno del Jugador 1: negro");
