import { pow, matrix, multiply, inv } from "mathjs";

const evaluateFunction = (coefficients = [], x) => {
	return coefficients.reduce((total, number, indx) => {
		return total + number * pow(x, indx);
	}, 0);
};

const toString = (coefficientes = []) => {
	let getX = (i) => {
		if (i == 0) return "";
		if (i == 1) return "x";
		return `x${i.toString().sup()}`;
	};
	let getSign = (c, i) => {
		return c < 0 ? "-" : i == 0 ? "" : "+";
	};
	return coefficientes._data.reduce(
		(a, c, i) =>
			a + ` ${getSign(c, i)} ${Math.abs(c.toFixed(3))}${getX(i)}`,
		""
	);
};

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
		coeficientes: resultado,
		evaluar: (x) => evaluateFunction(resultado._data, x),
		toString: toString(resultado),
	};
};

export { regressionN };
