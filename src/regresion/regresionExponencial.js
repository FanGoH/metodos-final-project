import { index, matrix, multiply, inv, pow, log } from "mathjs";

const x = [1, 2, 5, 15, 25, 30, 35, 40];
const y = [99, 95, 85, 55, 30, 24, 20, 15];

const regresionExponencial = (x = [], y = [], graph = false) => {
	let aux = [];
	let rSide = [0, 0];
	const powerArray = [];

	for (let i = 0; i < y.length; i++) {
		rSide[0] += log(y[i]);
		rSide[1] += x[i] * log(y[i]);
	}

	for (let i = 0; i < 3; i++) {
		powerArray.push(
			x.reduce((sum, value) => {
				return sum + pow(value, i);
			}, 0)
		);
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
};

export { regresionExponencial };
//regresionExponencial(x, y);
