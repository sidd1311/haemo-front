import React from 'react';
import './AdminHome.css';
import { Line } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';
import { prospectsData, donorsData, bloodGroupData, donationTrendsData } from './Chart';

const AdminHome = () => {
  const lineOptions = {
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
          label: function (context) {
            return `${context.label}: ${context.raw}`;
          },
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
        text: 'Blood Donation Trends',
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
    <div className="admin-home">
      <div className="admin-home-section">
        <div className="chart-container-small">
          <Doughnut data={prospectsData} />
          <p>Prospects</p>
        </div>
        <div className="chart-container-small">
          <Doughnut data={donorsData} />
          <p>Donors</p>
        </div>
        <div className="chart-container">
          <h2>Blood Donation Trends</h2>
          <Line data={donationTrendsData} options={lineOptions} />
        </div>
      </div>

      <div className="admin-home-sidebar">
        <div className="sidebar-item">
          <h4>Recent Donors</h4>
          <ul>
            <li>1. Amit Sharma</li>
            <li>2. Priya Gupta</li>
            <li>3. Rahul Verma</li>
            <li>4. Sneha Patel</li>
          </ul>
        </div>
        <div className="chart-container">
          <Doughnut data={bloodGroupData} />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
