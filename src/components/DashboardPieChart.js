import React from "react";
// import Chart from "chart.js/auto";
import { Pie } from "react-chartjs-2";

const DashboardPieChart = ({ amountPayed, amountDue }) => {
    let pieData = [amountPayed, amountDue]
    debugger
    const labels = ["Amount Payed", "Amount Due"];
    const data = {
        labels: labels,
        datasets: [
            {
                label: "Amount Payed compared to Amount Due ",
                backgroundColor: [
                    "rgb(90, 87, 255)",
                    "rgb(255, 228, 87)"
                ],
                hoverOffset: 4,
                // borderColor: "rgb(0,0,255)",
                data: [30, 1300],
            },
        ],

    };
    debugger
    return (
        <div>
            <Pie data={data} />
        </div>
    );
}

export default DashboardPieChart;

