"use client";
import { Doughnut } from "react-chartjs-2";
import {Chart, ArcElement, Tooltip} from 'chart.js'
Chart.register(ArcElement, Tooltip);

const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
  const data = {
    datasets: [
      {
        label: "Banks",
        data: [1250, 2500, 4000],
        backgroundColor: ["#0747b6", "#2265d8", "#2f91fa"],
      },
    ],
    labels: ["Bank A", "Bank B", "Bank C"],
  };
  return <Doughnut data={data}/>;
};

export default DoughnutChart;
