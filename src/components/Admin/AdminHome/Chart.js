import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, Title, LineElement, CategoryScale, LinearScale, PointElement, ChartDataLabels);

const commonOptions = {
  cutout: '30%',
  plugins: {
    datalabels: {
      display: false,
    },
    legend: {
      display: false,
    },
  },
};

export const prospectsData = {
  datasets: [
    {
      data: [121, 39],
      backgroundColor: ['#3498db', '#ecf0f1'],
      borderWidth: 1,
    },
  ],
  labels: [],
  options: commonOptions,
};

export const donorsData = {
  datasets: [
    {
      data: [180, 20],
      backgroundColor: ['#e74c3c', '#ecf0f1'],
      borderWidth: 1,
    },
  ],
  labels: [],
  options: commonOptions,
};

export const bloodGroupData = {
  datasets: [
    {
      data: [2, 6, 4, 3],
      backgroundColor: ['#1abc9c', '#3498db', '#9b59b6', '#e74c3c'],
      borderWidth: 1,
    },
  ],
  labels: ['Blood Group AB+', 'Blood Group A-', 'Blood Group B-', 'Blood Group B+'],
  options: commonOptions,
};

export const donationTrendsData = {
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
