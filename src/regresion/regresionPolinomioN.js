import { pow, matrix, multiply, inv } from "mathjs";

const evaluateFunction = (coefficients = [], x) => {
	return coefficients.reduce((total, number, indx) => {
		return total + number * pow(x, indx);
	}, 0);
};

const realFunction = (coefficientes, xArray) => {};
// close mapping of the function, delta x = 0

const regressionN = (degreeOfRegression, x = [], y = []) => {
	let aux = [];
	let rSide = [];
	for (let i = 0; i <= degreeOfRegression; i++) {
		rSide.push(
			x.reduce((sum, value, indx) => {
				return sum + pow(value, i) * y[indx];
			}, 0)
		);
	}

	const powerArray = [];
	for (let i = 0; i <= 2 * degreeOfRegression + 1; i++) {
		powerArray.push(
			x.reduce((sum, value) => {
				return sum + pow(value, i);
			}, 0)
		);
	}

	for (let i = 0; i <= degreeOfRegression; i++) {
		const row = [];
		for (let j = 0; j <= degreeOfRegression; j++) {
			row.push(powerArray[i + j]);
		}
		aux.push(row);
	}

	aux = matrix(aux);
	rSide = matrix(rSide);

	const resultado = multiply(inv(aux), rSide);

	return {
		resultado,
		evaluar: (x) => evaluateFunction(resultado._data, x),
	};
};

export { regressionN };
