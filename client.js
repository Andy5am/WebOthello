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

const root = document.getElementById('root');
console.log(root, typeof(root));

root.style.height = '100px';
root.style.backgroundColor = 'red';
root.onclick = () => {
	alert("si puedo!")
}
