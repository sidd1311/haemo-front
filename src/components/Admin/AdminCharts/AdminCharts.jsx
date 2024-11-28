import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import './AdminCharts.css';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement);

const AdminCharts = () => {
  // Blood Donation (Line Chart)
  const donationTrendsData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Donations per Month',
        data: [20, 45, 30, 60, 55, 75, 90, 75, 73, 64, 60, 55],
        borderColor: '#3498db',
        backgroundColor: 'rgba(52, 152, 219, 0.2)',
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  // Blood Type  (Bar Chart)
  const bloodTypeData = {
    labels: ['O+', 'A-', 'B+', 'AB-', 'O-', 'A+', 'B-', 'AB+'],
    datasets: [
      {
        label: 'Number of Donations by Blood Type',
        data: [120, 90, 100, 40, 30, 110, 20, 80],
        backgroundColor: '#e74c3c',
        borderColor: '#c0392b',
        borderWidth: 1,
      },
    ],
  };

  // Donor Age  (Bar Chart)
  const donorAgeData = {
    labels: ['18-25', '26-35', '36-45', '46-60', '60+'],
    datasets: [
      {
        label: 'Number of Donors by Age Distribution',
        data: [30, 40, 20, 5, 5],
        backgroundColor: ['#2ecc71'],
        borderColor: '#34495e',
        borderWidth: 1,
      },
    ],
  };

  // Donor Weight (Bar Chart)
  const weightCategoryData = {
    labels: ['<50kg', '50-70kg', '>70kg'],
    datasets: [
      {
        label: 'Number of Donors by Weight Category',
        data: [15, 50, 35],
        backgroundColor: '#3498db',
        borderColor: '#2980b9',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#000',
          font: {
            weight: 500,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.raw}`;
          }
        },
        bodyFont: {
          color: '#000',
          weight: 500, 
        },
        titleFont: {
          color: '#000',
          weight: 500, 
        },
      },
      title: {
        display: true,
        text: 'Chart',
        color: '#000', 
        font: {
          weight: 600, 
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#000', 
          font: {
            weight: 500, 
          },
        },
      },
      y: {
        ticks: {
          color: '#000', 
          font: {
            weight: 500, 
          },
        },
      },
    },
  };

  return (
    <div className="admin-charts">
      <div className="chart-grid">
        <div className="chart-item">
          <h2>Blood Donation Trends</h2>
          <Line data={donationTrendsData} options={{ ...options, title: { text: 'Blood Donation Trends' } }} />
        </div>
        <div className="chart-item">
          <h2>Donations by Blood Type</h2>
          <Bar data={bloodTypeData} options={{ ...options, title: { text: 'Donations by Blood Type' } }} />
        </div>
        <div className="chart-item">
          <h2>Donor Age Distribution</h2>
          <Bar data={donorAgeData} options={{ ...options, title: { text: 'Donor Age Distribution' } }} />
        </div>
        <div className="chart-item">
          <h2>Donors by Weight Category</h2>
          <Bar data={weightCategoryData} options={{ ...options, title: { text: 'Donors by Weight Category' } }} />
        </div>
      </div>
    </div>
  );
};

export default AdminCharts;
