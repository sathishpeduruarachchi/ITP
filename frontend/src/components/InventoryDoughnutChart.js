import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(
  Tooltip,
  Legend,
  ArcElement,
);

const DoughnutChart = () => {
  const [chartData, setChartData] = useState({
    labels: ['LOW', 'MEDIUM', 'HIGH'],
    datasets: [
      {
        label: '# of Votes',
        data: [0, 0, 0], // Initialize with zeros
        backgroundColor: ['#FF5733', '#36A2EB', '#FFCD56'],
      },
    ],
  });

  useEffect(() => {
    fetch('https://6363c8f68a3337d9a2e7d805.mockapi.io/api/to-do')
      .then((response) => response.json())
      .then((data) => {
        const prioritiesCount = {
          LOW: 0,
          MEDIUM: 0,
          HIGH: 0,
        };

        data.forEach((item) => {
          prioritiesCount[item.priority]++;
        });

        setChartData((prevData) => ({
          ...prevData,
          datasets: [
            {
              ...prevData.datasets[0],
              data: [
                prioritiesCount.LOW,
                prioritiesCount.MEDIUM,
                prioritiesCount.HIGH,
              ],
            },
          ],
        }));
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const options = {
    maintainAspectRatio: false,
    // scales: {
    //   y: {
    //     beginAtZero: true,
    //   },
    // },
    legend: {
      labels: {
        fontSize: 25,
      },
    },
  };

  return (
    <div>
      <Doughnut data={chartData} height={400} options={options} />
    </div>
  );
};

export default DoughnutChart;




// const data = {
//     labels: [
//       'Red',
//       'Blue',
//       'Yellow'
//     ],
//     datasets: [{
//       label: 'My First Dataset',
//       data: [300, 50, 100],
//       backgroundColor: [
//         'rgb(255, 99, 132)',
//         'rgb(54, 162, 235)',
//         'rgb(255, 205, 86)'
//       ],
//       hoverOffset: 4
//     }]
//   };


