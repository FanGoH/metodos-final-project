import { matrix, log, pow, multiply, inv, index } from "mathjs";

const regresionPotencia = (x = [], y = []) => {
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

	return {
		coeficientes: resultado,
		evaluar: (x) => {
			return resultado._data[0] * pow(x, resultado._data[1]);
		},
		toString: `${resultado._data[0].toFixed(
			3
		)}x${resultado._data[1].toFixed(3).toString().sup()} `,
	};
};

export { regresionPotencia };
