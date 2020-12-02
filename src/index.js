import "./scss/main.scss";

import { regressionN } from "./regresion/regresionPolinomioN";
import { regresionExponencial } from "./regresion/regresionExponencial";
import { regresionPotencia } from "./regresion/regresionPotencia";

import Chart from "chart.js";

function clearChart(chart) {
	if (chart.clear) {
		chart.clear();
	}
}

const context = document.getElementById("chart").getContext("2d");

const createPolynomialRegresion = (
	xValues = [],
	yValues = [],
	degree,
	pairs
) => {
	const { resultado, evaluar } = regressionN(degree, xValues, yValues);

	const range = xValues[xValues.length - 1] - xValues[0];
	const ITERACIONES = range * 100;
	const saltos = range / ITERACIONES;

	const regressionValues = [];
	for (let i = 0; i < ITERACIONES; i++) {
		const x = xValues[0] + i * saltos;

		regressionValues.push({ x: x, y: evaluar(x) });
	}

	const chart = new Chart(context, {
		type: "scatter",

		data: {
			labels: xValues,
			datasets: [
				{
					label: "Data",
					data: pairs,
				},
				{
					label: "Polynomial example",
					data: regressionValues,
					type: "line",
				},
			],
		},
	});
};

const createPotentialRegresion = (xValues = [], yValues = [], pairs) => {
	const { coeficientes, evaluar } = regresionPotencia(xValues, yValues);

	const range = xValues[xValues.length - 1] - xValues[0];
	const ITERACIONES = range * 100;
	const saltos = range / ITERACIONES;

	const regressionValues = [];
	for (let i = 0; i < ITERACIONES; i++) {
		const x = xValues[0] + i * saltos;

		regressionValues.push({ x: x, y: evaluar(x) });
	}

	const chart = new Chart(context, {
		type: "scatter",

		data: {
			labels: xValues,
			datasets: [
				{
					label: "Data",
					data: pairs,
				},
				{
					label: "Potential example",
					data: regressionValues,
					type: "line",
				},
			],
		},
	});
};

const createExponentialRegresion = (xValues = [], yValues = [], pairs) => {
	const { coeficientes, evaluar } = regresionExponencial(xValues, yValues);

	const range = xValues[xValues.length - 1] - xValues[0];
	const ITERACIONES = range * 100;
	const saltos = range / ITERACIONES;

	const regressionValues = [];
	for (let i = 0; i < ITERACIONES; i++) {
		const x = xValues[0] + i * saltos;

		regressionValues.push({ x: x, y: evaluar(x) });
	}

	const chart = new Chart(context, {
		type: "scatter",

		data: {
			labels: xValues,
			datasets: [
				{
					label: "Data",
					data: pairs,
				},
				{
					label: "Exponential example",
					data: regressionValues,
					type: "line",
				},
			],
		},
	});
};

if (regType.value !== "polynomial") {
	document.querySelector("#pow").disabled = true;
}

regType.addEventListener("change", () => {
	const pow = document.querySelector("#pow");

	if (regType.value != "polynomial") {
		pow.disabled = true;
		return;
	}

	pow.disabled = false;
});

calcular.addEventListener("click", () => {
	clearChart(chart);
	const xValues = JSON.parse(`[${xvalues.value}]`);
	const yValues = JSON.parse(`[${yvalues.value}]`);

	const pow = document.querySelector("#pow").value;

	const pairs = xValues.map((value, indx) => {
		return { x: value, y: yValues[indx] };
	});

	switch (regType.value) {
		case "potential":
			// regresion potencial
			createPotentialRegresion(xValues, yValues, pairs);
			break;
		case "exponential":
			createExponentialRegresion(xValues, yValues, pairs);
			break;

		case "polynomial":
			createPolynomialRegresion(xValues, yValues, pow);

			break;
	}
});
