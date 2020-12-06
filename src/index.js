import "./scss/main.scss";

import { regressionN } from "./regresion/regresionPolinomioN";
import { regresionExponencial } from "./regresion/regresionExponencial";
import { regresionPotencia } from "./regresion/regresionPotencia";

import { renderChart } from "./utils";

renderChart(
	[1, 2, 3, 4, 5],
	[(1, 1), (2, 2), (3, 3), (4, 4), (5, 5)],
	(x) => x,
	"Lineal - Ejemplo"
);

const createPolynomialRegresion = (xValues, yValues, pairs, degree) => {
	const { _coeficientes, evaluar, toString } = regressionN(
		degree,
		xValues,
		yValues
	);
	renderChart(xValues, pairs, evaluar, "Regresión polinomial");
	return { evaluar, toString };
};

const createPotentialRegresion = (xValues = [], yValues = [], pairs) => {
	const { _coeficientes, evaluar, toString } = regresionPotencia(
		xValues,
		yValues
	);
	renderChart(xValues, pairs, evaluar, "Regresión Potencial");

	return { evaluar, toString };
};

const createExponentialRegresion = (xValues = [], yValues = [], pairs) => {
	const { _coeficientes, evaluar, toString } = regresionExponencial(
		xValues,
		yValues
	);
	renderChart(xValues, pairs, evaluar, "Regresión Exponencial");
	return { evaluar, toString };
};

pow.disabled = regType.value !== "polynomial";
regType.addEventListener("change", () => {
	pow.disabled = regType.value !== "polynomial";
});

calcular.addEventListener("click", () => {
	const xValues = JSON.parse(`[${xvalues.value}]`);
	const yValues = JSON.parse(`[${yvalues.value}]`);
	const dataPairs = xValues.map((value, indx) => {
		return { x: value, y: yValues[indx] };
	});

	const regressions = {
		potential: createPotentialRegresion,
		exponential: createExponentialRegresion,
		polynomial: createPolynomialRegresion,
	};

	const { evaluar, toString } = regressions[regType.value](
		xValues,
		yValues,
		dataPairs,
		pow.value ? parseInt(pow.value) : 2
	);

	const spanResString = document.querySelector("#formula-resultado");

	spanResString.innerHTML = toString;
	changeEvalFunction(evaluar);
});

let lastCallback = () => {};
function changeEvalFunction(evaluar) {
	console.log(this);
	const resultTarget = document.querySelector("#evaluacion-resultado");
	const evalInput = document.querySelector(".resultado-input");

	evalInput.removeEventListener("change", lastCallback);

	lastCallback = () => {
		console.log("helloworld");
		resultTarget.innerHTML = evaluar(
			parseFloat(document.querySelector(".resultado-input").value)
		)
			.toFixed(3)
			.toString();
	};

	evalInput.addEventListener("change", lastCallback);
}
