import React from 'react'
import { Line } from 'react-chartjs-2'
import 'chart.js/auto'

function IndustryTrendChart({ data }) {
  if (!data || data.length === 0) return <p>Loading...</p>

  // Extract all unique industries and years
  const industries = [...new Set(data.map((item) => item.industry))]
  const years = [...new Set(data.map((item) => item.year))].sort((a, b) => a - b)

  // Initialize industry trends with all industries and years
  const industryTrends = industries.reduce((acc, industry) => {
    acc[industry] = years.reduce((yearAcc, year) => {
      yearAcc[year] = 0
      return yearAcc
    }, {})
    return acc
  }, {})

  // Populate industry trends with actual funding data
  data.forEach((item) => {
    industryTrends[item.industry][item.year] += item.amount
  })

  // Prepare datasets for the line chart
  const datasets = industries.map((industry) => ({
    label: industry,
    data: years.map((year) => industryTrends[industry][year]),
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