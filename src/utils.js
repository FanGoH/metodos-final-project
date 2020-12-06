import Chart from "chart.js";

const context = document.getElementById("canvas").getContext("2d");
let currentChart = null;

function clearChart() {
	if (currentChart != null) {
		currentChart.destroy();
	}
}

function getFunctionPoints(fun, start, end, DPI = 100) {
	const range = end - start;
	const step = 1 / DPI;
	return [...new Array(parseInt(range * DPI))].map((_v, i) => ({
		x: start + step * i,
		y: fun(start + step * i),
	}));
}

function renderChart(xValues, dataPairs, fun, type) {
	clearChart();

	const points = getFunctionPoints(
		fun,
		Math.min(...xValues),
		Math.max(...xValues)
	);

	currentChart = new Chart(context, {
		type: "scatter",
		data: {
			labels: xValues,
			datasets: [
				{
					label: "Datos",
					data: dataPairs,
					pointBackgroundColor: "#8a3232",
					pointBorderColor: "#8a3232",
					backgroundColor: "#8a3232",
					pointHoverBorderColor: "#8a3232",
					pointRadius: "6",
				},
				{
					label: type,
					pointBorderWidth: 0,
					fill: false,
					data: points,
					type: "line",
					showLine: true,
					borderColor: "#2e1a21",
					pointRadius: 1,
					pointBackgroundColor: "#2e1a21",
					pointBorderColor: "#2e1a21",
					backgroundColor: "#2e1a21",
					pointHoverBorderColor: "#2e1a21",
				},
			],
		},
		options: { legend: { labels: { fontColor: "black" } } },
	});
}

export { renderChart, clearChart, getFunctionPoints };
