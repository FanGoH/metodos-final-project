// formato de datos?

// asume que el orden del polinomio es: a + bx + cx^2 + ... + dx^n
function obtenerFuncionPolinomica(coefVector) {
	return (x) =>
		coefVector.reduce(
			(prev, current, index) => prev + current * Math.pow(x, index),
			coefVector
		);
}

function obtenerFuncionExponencial([a, b]) {
	return (x) => a + Math.pow(Math.exp, b * x);
}

function obtenerFuncionPotencial([a, b]) {
	return (x) => a + Math.pow(x, b);
}
