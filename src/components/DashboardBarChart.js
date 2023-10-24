import React from "react";
import { Bar } from "react-chartjs-2";



const DashboardBarChart = ({ chartData }) => {
  console.log("CHART DATA", chartData)

  const dates = chartData[0]?.map(item => item.date) //["January", "February", "March", "April", "May", "June"];

  console.log("DATES", dates)

  const datesLabels = dates.map((date) =>
    new Date(date).toLocaleDateString());
  const amounts = chartData[0]?.map(item => item.amount);
  const datesAmounts = amounts.map(item => item);
  console.log("DATESLABELS", datesLabels)
  console.log("DATES AMOUNTSSS!", datesAmounts)
  const data = {
    labels: datesLabels,
    datasets: [
      {
        label: "Payment Dates",
        backgroundColor: "rgb(90, 87, 255)",
        borderColor: "rgb(255, 99, 132)",
        data: datesAmounts,
      },
    ],
  };
  return (
    <div>
      <Bar data={data} />
    </div>
  );
};

export default DashboardBarChart;
