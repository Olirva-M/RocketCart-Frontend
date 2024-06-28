import React, { useEffect, useState, useRef } from 'react';
import { Chart, registerables } from 'chart.js'; // Import Chart and necessary registerables
import { Bar } from 'react-chartjs-2';
import '../css/SellerStat.css'; // Import CSS for styling

// Register necessary components with Chart.js
Chart.register(...registerables);

const SellerStat = () => {
  const [chartData, setChartData] = useState({
    monthlyRevenueData: [],
    monthlyProductSalesData: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulated response (replace with actual fetch code)
        const response = {
          "monthlyProductSalesLast6Months": [
            [2024, 1, 10],
            [2024, 2, 10],
            [2024, 3, 0],
            [2024, 4, 20],
            [2024, 5, 20],
            [2024, 6, 0]
          ],
          "totalRevenueAllTime": 1899.99,
          "totalProductsSoldAllTime": 61,
          "totalRevenueLast6Months": 900.0,
          "totalProductsSoldLastMonth": 20,
          "monthlyRevenueLast6Months": [
            [2024, 1, 100.0],
            [2024, 2, 200.0],
            [2024, 3, 0.0],
            [2024, 4, 200.0],
            [2024, 5, 400.0],
            [2024, 6, 0.0]
          ],
          "totalProductsSoldLast6Months": 60,
          "totalRevenueLastMonth": 400.0
        };

        // No need for response.ok check since it's not a real fetch
        const data = response;
        setChartData({
          monthlyRevenueData: data.monthlyRevenueLast6Months,
          monthlyProductSalesData: data.monthlyProductSalesLast6Months,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="seller-stat-container">
      <h2 className="seller-stat-heading">Seller Statistics</h2>

      <div className="seller-chart">
        <h3>Monthly Revenue Chart</h3>
        <MonthlyRevenueChart monthlyRevenueData={chartData.monthlyRevenueData} />
      </div>

      <div className="seller-chart">
        <h3>Monthly Product Sales Chart</h3>
        <MonthlyProductSalesChart monthlyProductSalesData={chartData.monthlyProductSalesData} />
      </div>
    </div>
  );
};

const MonthlyRevenueChart = ({ monthlyRevenueData }) => {
  const labels = monthlyRevenueData.map(([year, month]) => `${year}-${month}`);
  const data = monthlyRevenueData.map(([_, __, revenue]) => revenue);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Monthly Revenue',
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: data,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
    scales: {
      y: {
        type: 'linear',
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return '$' + value.toFixed(2); // Format as currency
          },
        },
      },
      x: {
        title: {
          display: true,
          text: 'Month',
        },
      },
    },
    maxWidth: 500, // Limit chart width to 500px
  };

  return <Bar data={chartData} options={options} />;
};

const MonthlyProductSalesChart = ({ monthlyProductSalesData }) => {
  const labels = monthlyProductSalesData.map(([year, month]) => `${year}-${month}`);
  const data = monthlyProductSalesData.map(([_, __, sales]) => sales);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Monthly Product Sales',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: data,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
    scales: {
      y: {
        type: 'linear',
        beginAtZero: true,
        ticks: {
          stepSize: 5,
        },
      },
      x: {
        title: {
          display: true,
          text: 'Month',
        },
      },
    },
    maxWidth: 500, // Limit chart width to 500px
  };

  return <Bar data={chartData} options={options} />;
};

export default SellerStat;
