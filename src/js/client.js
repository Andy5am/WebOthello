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


const root = document.getElementById('root');

const sumar = (a = 0, b) => a + b;

const verificarHor = (lista, indexF, indexC, state) => {
	const length = lista.length;
	const valor = state.turnoJugador1? 1:-1;
	let indexIz = lastIndexOf(lista,valor,indexC);
	let indexDer = indexOf(lista,valor,indexC);

	if(indexIz < 1){
		indexIz = indexC;
	}
	lista = drop(lista, indexIz + 1);

	if(indexDer < 1){
		indexDer = indexC;
	}
	lista = dropRight(lista, length - indexDer);
	
	if (!isEmpty(lista)) {
		if (valor > 0) {
			if (lista.reduce(sumar) === (indexIz - indexDer + 1)) {
				state.board[indexF][indexC] = 1;
				state.board[indexF].map((fila, col) => {
					if (col > indexIz && col < indexDer) {
						state.board[indexF][col] = 1;
					}
				})
				return true;
			}else{
				return false;
			}
		}else{
			if (lista.reduce(sumar) === (indexDer - indexIz - 1)) {
				state.board[indexF][indexC] = -1;
				state.board[indexF].map((fila, col) => {
					if (col > indexIz && col < indexDer) {
						state.board[indexF][col] = -1;
					}
				})
				return true;
			}else{
				return false;
			}
		}
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

			//state.board[fila][columna] = state.turnoJugador1?1:-1;
			//console.log('verificado')
			//console.log(verificarHor(state.board[fila],fila, columna, state));
			const verificado = verificarHor(state.board[fila],fila, columna, state)
			if (verificado) {
				state.turnoJugador1 = !state.turnoJugador1;
				// console.log("turno")
				// console.log(state.turnoJugador1)
			}
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
