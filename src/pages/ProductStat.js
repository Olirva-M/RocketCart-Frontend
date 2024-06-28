import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the components
Chart.register(ArcElement, Tooltip, Legend);

const ProductStat = ({sold, notsold}) => {
  const data = {
    labels: ['Sold', 'Not Sold'],
    datasets: [
      {
        data: [sold, notsold], 
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)', // Blue
          'rgba(0, 0, 0, 0.2)',      // Black
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',   // Blue
          'rgba(0, 0, 0, 1)',        // Black
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div style={{ width: '400px', height: '400px' }}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default ProductStat;
