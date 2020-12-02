import { index, matrix, multiply, inv, pow, log, e } from "mathjs";

const regresionExponencial = (x = [], y = []) => {
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

	resultado.subset(index([0]), pow(e, resultado.get([0])));

	return {
		coeficientes: resultado,
		evaluar: (x) => {
			return resultado._data[0] * pow(e, resultado._data[1] * x);
		},
	};
};

export { regresionExponencial };
