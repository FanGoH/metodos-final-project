const x = [-3, -2, -1, 0, 1, 2, 3];
const y = [7.5, 3, 0.5, 1, 3, 6, 14];

const evaluateFunction = (coefficients = [], x) => {
	return coefficients.reduce((total, number, indx) => {
		return total + number * Math.pow(x, indx);
	}, 0);
};

const realFunction = (coefficientes, xArray) => {};
// close mapping of the function, delta x = 0

const regressionN = (degreeOfRegression, x = [], y = [], graph = false) => {
	let aux = [];
	// Pendiente
	let rSide = [];
	for (let i = 0; i <= degreeOfRegression; i++) {
		rSide.push(
			x.reduce((sum, value, indx) => {
				return sum + Math.pow(value, i) * y[indx];
			}, 0)
		);
	}

	const powerArray = [];
	for (let i = 0; i <= 2 * degreeOfRegression + 1; i++) {
		powerArray.push(
			x.reduce((sum, value) => {
				return sum + Math.pow(value, i);
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

	aux = math.matrix(aux);
	rSide = math.matrix(rSide);

	const resultado = math.multiply(math.inv(aux), rSide);

	return {
		resultado,
		polynomial: (x) => evaluateFunction(resultado, x),
	};
};

regressionN(2, x, y);
