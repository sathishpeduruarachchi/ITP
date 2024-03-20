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
    labels: ['Adding Quantity', 'Before Available', 'Update Quantity', 'Now Available', 'Issue Quantity'],
    datasets: [
      {
        label: 'Inventory Data',
        data: [0, 0, 0, 0, 0],
        backgroundColor: ['#FF5733', '#36A2EB', '#FFCD56', '#1BCD84', '#FF5733'],
      },
    ],
  });

  useEffect(() => {
    fetch('http://localhost:8070/inventory/')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          // Assuming the API response is an array of objects
          const inventoryData = data[0]; // Select the first object in the array

          // Extract the values you want from the API response
          const addingQuantity = inventoryData.adding_quantity;
          const beforeAvailable = inventoryData.before_available_quantity;
          const updateQuantity = inventoryData.update_quantity;
          const nowAvailable = inventoryData.now_available_quantity;
          const issueQuantity = inventoryData.issue_quantity;

          setChartData({
            labels: ['Adding Quantity', 'Before Available', 'Update Quantity', 'Now Available', 'Issue Quantity'],
            datasets: [
              {
                label: 'Inventory Data',
                data: [addingQuantity, beforeAvailable, updateQuantity, nowAvailable, issueQuantity],
                backgroundColor: ['#FF5733', '#36A2EB', '#FFCD56', '#1BCD84', '#FF5733'],
              },
            ],
          });
        } else {
          console.error('Invalid or empty API response.');
        }
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const options = {
    maintainAspectRatio: false,
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
