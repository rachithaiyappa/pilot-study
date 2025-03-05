import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary components with Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SummaryChart = ({ summary }) => {
  return (
    <div className="chart-container">
    <Bar
        data={{
            labels: ["Adopt", "Not Interested"],
            datasets: [
            {
                label: "Percentage",
                data: [summary.adopt, summary.notInterested],
                backgroundColor: ["#4caf50", "#f44336"],
            },
            ],
            }}
            options={{
                responsive: true,
                // maintainAspectRatio: false,
                scales: {
                x: { 
                    // set x label
                    title: {
                    display: true,
                    text: "Adoption Decision",
                    font: {
                        size: 30, // Increase font size for x-axis label
                    },
                    },
                    ticks: {
                    font: {
                        size: 30, // Increase font size for x-axis labels
                    },
                    },
                },
                y: { 
                    // set x label
                    title: {
                    display: true,
                    text: "Percentage of users",
                    font: {
                        size: 30, // Increase font size for x-axis label
                    },
                    },
                    ticks: {
                    font: {
                        size: 30, // Increase font size for x-axis labels
                    },
                    },
                },
                },
            }}
        />
    </div>
  );
};

export default SummaryChart;