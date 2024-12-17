import React from "react";
import { Bar } from "react-chartjs-2";

function EmissionChart({ emissionsData }) {
  const generateBarData = () => {
    const labels = emissionsData.map((data) => data.description);
    const data = emissionsData.map((data) => data.co2Emissions);

    return {
      labels,
      datasets: [
        {
          label: "Emisiones CO2 (kg)",
          data: data,
          backgroundColor: "rgba(53, 162, 235, 0.5)",
          borderColor: "rgba(53, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    };
  };

  return (
    <div className="chart-container">
      <h3>Gráfico de Emisiones</h3>
      <Bar data={generateBarData()} />
    </div>
  );
}

export default EmissionChart;
