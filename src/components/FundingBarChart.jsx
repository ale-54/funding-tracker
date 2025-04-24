import React from 'react'
import { Bar } from 'react-chartjs-2'
import 'chart.js/auto'

function FundingBarChart({ data }) {
  if (!data || data.length === 0) return <p>Loading...</p>

  // Calculate total funding by year
  const fundingByYear = data.reduce((acc, item) => {
    const year = item.year // Use the 'year' field from the data
    acc[year] = (acc[year] || 0) + item.amount
    return acc
  }, {})

  const years = Object.keys(fundingByYear).sort((a, b) => a - b)
  const totals = years.map((year) => fundingByYear[year])

  const chartData = {
    labels: years,
    datasets: [
      {
        label: 'Total Funding by Year',
        data: totals,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Year',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Total Funding (USD)',
        },
        beginAtZero: true,
      },
    },
  }

  return <Bar data={chartData} options={options} />
}

export default FundingBarChart