/*const sumar = (a, b) => a + b;

const enteros = [1, 2, 3, 4, 5];

console.log(enteros.map(i => i * i));

console.log(enteros.reduce(sumar, 0));

const miObjeto = {
  x: 0,
  y: 100,
  w:  [1,2,3],
};

const miOtroObjeto = {
  ...miObjeto,
  z: -2,
};

miObjeto.w.push(4);

console.log(miOtroObjeto);

const {x, y} = miObjeto;*/

import lastIndexOf from 'lodash/lastIndexOf'
import indexOf from 'lodash/indexOf'
import drop from 'lodash/drop'
import dropRight from 'lodash/dropRight'
import isEmpty from 'lodash/isEmpty'
import zip from 'lodash/zip'
import unzip from 'lodash/unzip'
import flattenDeep from 'lodash/flattenDeep'
import { transpose } from 'mathjs'


const root = document.getElementById('root');

const sumar = (a = 0, b) => a + b;

// const verificarVer = (lista, indexF, indexC, state) => {
// 	console.log("hola")
// 	console.log(state.board)
// 	const length = lista.length;
// 	const valor = state.turnoJugador1? 1:-1;
// 	console.log(lista);
// 	let indexIz = lastIndexOf(lista,valor,indexC);
// 	let indexDer = indexOf(lista,valor,indexC);
// 	console.log(indexIz, indexDer);
// 	if(indexIz < 1){
// 		indexIz = indexC;
// 	}
// 	lista = drop(lista, indexIz + 1);
// 	console.log(lista)
// 	if(indexDer < 1){
// 		indexDer = indexC;
// 	}
// 	lista = dropRight(lista, length - indexDer);
// 	console.log(lista)
// 	if (!isEmpty(lista)) {
// 		if (valor > 0) {
// 			if (lista.reduce(sumar) === (indexIz - indexDer + 1)) {
// 				state.board = transpose(state.board);
// 				const verificadoV = verificarVer(state.board[indexC],indexC, indexF,state);
// 				state.board = transpose(state.board);
// 				state.board[indexF][indexC] = 1;
// 				state.board[indexF].map((fila, col) => {
// 					if (col > indexIz && col < indexDer) {
// 						state.board[indexF][col] = 1;
// 					}
// 				})
// 				return true;
// 			}else{
// 				state.board = transpose(state.board);
// 				if(verificarVer(state.board[indexC],indexC, indexF,state)){
// 					state.board = transpose(state.board);
// 					return true
// 				}else{
// 					state.board = transpose(state.board);
// 					return false;
// 				}
// 			}
// 		}else{
// 			if (lista.reduce(sumar) === (indexDer - indexIz - 1)) {
// 				state.board = transpose(state.board);
// 				const verificadoV = verificarVer(state.board[indexC],indexC, indexF,state);
// 				state.board = transpose(state.board);
// 				state.board[indexF][indexC] = -1;
// 				state.board[indexF].map((fila, col) => {
// 					if (col > indexIz && col < indexDer) {
// 						state.board[indexF][col] = -1;
// 					}
// 				})
// 				return true;
// 			}else{
// 				state.board = transpose(state.board);
// 				if(verificarVer(state.board[columna],columna, fila,state)){
// 					state.board = transpose(state.board);
// 					return true;
// 				}else{
// 					state.board = transpose(state.board);
// 					return false;
// 				}
// 			}
// 		}
// 	}else{
// 		return false;
// 	}	
// }

const verificarHor = (lista, indexF, indexC, state) => {
	const length = lista.length;
	// console.log(lista)
	const valor = state.turnoJugador1? 1:-1;
	let indexIz = lastIndexOf(lista,valor,indexC);
	let indexDer = indexOf(lista,valor,indexC);
	// console.log(indexIz, indexDer)
	state.board[indexF][indexC] = state.turnoJugador1? -1:1;
	if(indexIz < 0 || indexIz === indexC -1){
		indexIz = indexC;
	}
	lista = drop(lista, indexIz + 1);
	//console.log(lista)
	if(indexDer < 0 || indexDer === indexC +1){
		indexDer = indexC;
	}
	lista = dropRight(lista, length - indexDer);
	// console.log(lista)
	// console.log(indexIz, indexDer)
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

const verificarDiaArI = (indexF, indexC, state, continuar = false) => {
	//console.log("Entre")
	const valor = state.turnoJugador1? 1:-1;
	const notValor = state.turnoJugador1? -1:1;
	// console.log(valor, notValor);
	// console.log(continuar);
	// console.log(indexF, indexC)
	// console.log(state.board[indexF-1][indexC+1])
	let resultado = false;
	if(indexF === 0 || indexC === 0){
		return resultado;
	}
	if (state.board[indexF-1][indexC-1]===notValor) {
//		console.log("soy igual")
		continuar = true;
		resultado = verificarDiaArI(indexF-1,indexC-1,state,continuar);
	}else if (state.board[indexF-1][indexC-1] === valor){
		resultado = continuar ;
		// if (continuar) {
		// 	resultado = true;
		// 	console.log("funciono");
		// }else {
		// 	console.log("termine soy igual");
		// 	resultado = false;
		// }
	}
	// else if (state.board[indexF-1][indexC+1] === 0){
	// 	resultado = false;
	// 	console.log("termine no hay");
	// }
//	console.log("regreso",resultado)
	return resultado;
}

const verificarDiaArD = (indexF, indexC, state, continuar = false) =>{
	//console.log("ARRDer")
	const valor = state.turnoJugador1? 1:-1;
	const notValor = state.turnoJugador1? -1:1;
	let resultado = false;
	//console.log(valor, notValor)
	//console.log(indexF,indexC)
	if(indexF === 0 || indexC === 7){
		return resultado;
	}
	if (state.board[indexF-1][indexC+1] === notValor){
		//console.log("soy identico")
		continuar = true;
		resultado = verificarDiaArD(indexF-1,indexC+1,state,continuar);
	}
	if (state.board[indexF-1][indexC+1] === valor){
		//console.log("hola")
		resultado = continuar;
		//console.log(resultado);
	}
	//console.log("result",resultado)
	return resultado;
}

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

const verificarDiaAbD = (indexF, indexC, state, continuar = false) =>{
	//console.log("ARRDer")
	const valor = state.turnoJugador1? 1:-1;
	const notValor = state.turnoJugador1? -1:1;
	let resultado = false;
	//console.log(valor, notValor)
	//console.log(indexF,indexC)
	if(indexF === 7 || indexC === 7){
		return resultado;
	}
	if (state.board[indexF+1][indexC+1] === notValor){
		//console.log("soy identico")
		continuar = true;
		resultado = verificarDiaAbD(indexF+1,indexC+1,state,continuar);
	}
	if (state.board[indexF+1][indexC+1] === valor){
		//console.log("hola")
		resultado = continuar;
		//console.log(resultado);
	}
	//console.log("result",resultado)
	return resultado;
}

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

const verificarDiaAbI = (indexF, indexC, state, continuar = false) =>{
	//console.log("ARRDer")
	const valor = state.turnoJugador1? 1:-1;
	const notValor = state.turnoJugador1? -1:1;
	let resultado = false;
	//console.log(valor, notValor)
	//console.log(indexF,indexC)
	if(indexF === 7 || indexC === 0){
		return resultado;
	}
	if (state.board[indexF+1][indexC-1] === notValor){
		//console.log("soy identico")
		continuar = true;
		resultado = verificarDiaAbI(indexF+1,indexC-1,state,continuar);
	}
	if (state.board[indexF+1][indexC-1] === valor){
		//console.log("hola")
		resultado = continuar;
		//console.log(resultado);
	}
	//console.log("result",resultado)
	return resultado;
}

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

const verGanador = (state) => {
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

const renderFicha = ({fila, columna,valor, state}) => {
	const ficha = document.createElement('div');

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

const render = (root, state) => {

	const tablero = document.createElement('div');
	tablero.style.backgroundColor = 'DarkGreen';
	tablero.style.height = '520px';
	tablero.style.width = '520px';
	tablero.style.padding = '20px';

	state.board.map(
		(filas, fila) => {
		filas.map((valor, columna) => renderFicha({fila, columna,valor, state})).forEach(
			ficha => tablero.appendChild(ficha))
	},)
	root.appendChild(tablero);
}

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
render(root, state);
console.log("Es turno del Jugador 1: negro");
