import { matrix, log, pow, multiply, inv, index } from "mathjs";

const x = [10, 20, 30, 40, 50, 60, 70, 80];
const y = [1.06, 1.33, 1.52, 1.68, 1.81, 1.91, 2.01, 2.11];

const regresionPotencia = (x = [], y = [], graph = false) => {
	let aux = [];
	let rSide = [0, 0];

	const powerArray = [0, 0, 0];

	for (let i = 0; i < y.length; i++) {
		rSide[0] += log(y[i]);
		rSide[1] += log(x[i]) * log(y[i]);
		powerArray[0] += 1;
		powerArray[1] += log(x[i]);
		powerArray[2] += pow(log(x[i]), 2);
	}

	for (let i = 0; i < 2; i++) {
		const row = [];
		for (let j = 0; j < 2; j++) {
			row.push(powerArray[i + j]);
		}
		aux.push(row);
	}

	aux = matrix(aux);
	rSide = matrix(rSide);

	const resultado = multiply(inv(aux), rSide);

	resultado.subset(index([0]), pow(Math.E, resultado.get([0])));

	console.log(resultado._data);
};

regresionPotencia(x, y);
