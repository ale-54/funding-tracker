import React from 'react'
import { Line } from 'react-chartjs-2'
import 'chart.js/auto'

function IndustryTrendChart({ data }) {
  if (!data || data.length === 0) return <p>Loading...</p>

  // Group funding by industry and year
  const industryTrends = data.reduce((acc, item) => {
    const year = item.year // Use the 'year' field directly
    const industry = item.industry
    acc[industry] = acc[industry] || {}
    acc[industry][year] = (acc[industry][year] || 0) + item.amount
    return acc
  }, {})

  // Extract unique years and sort them
  const years = [...new Set(data.map((item) => item.year))].sort((a, b) => a - b)

  // Prepare datasets for the line chart
  const datasets = Object.keys(industryTrends).map((industry) => ({
    label: industry,
    data: years.map((year) => industryTrends[industry][year] || 0),
    fill: false,
    borderColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`, // Random color for each industry
    tension: 0.4, // Smooth lines
  }))

  const chartData = {
    labels: years,
    datasets,
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
          text: 'Funding Amount (USD)',
        },
        beginAtZero: true,
      },
    },
  }

  return <Line data={chartData} options={options} />
}

export default IndustryTrendChart