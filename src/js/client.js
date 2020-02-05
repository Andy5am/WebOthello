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
/*
const contenedorSemaforo = document.createElement('div');

contenedorSemaforo.style.height = '100px';
contenedorSemaforo.style.backgroundColor = 'red';
contenedorSemaforo.onclick = () => {
	alert("si puedo!")
};


root.appendChild(contenedorSemaforo);*/


const root = document.getElementById('root');
//console.log(root, typeof(root));

const verificarH = (lista, index) => {

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






		state.board[fila][columna] = state.turnoJugador1?1:-1;


		state.turnoJugador1 = !state.turnoJugador1;
		root.innerHTML = "";
		render(root,state);
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
