// import { theme } from '@chakra-ui/react'
import { format } from 'date-fns'

import type { AccountStats, AccountStatsBase } from '@fc/types'

import { ChartJSData } from './types'

const theme = {
  colors: {
    blue: {
      500: '#3182ce',
    },
    green: {
      500: '#38a169',
    },
    purple: {
      500: '#805ad5',
    },
    red: {
      500: '#e53e3e',
    },
    pink: {
      500: '#d53f8c',
    },
    orange: {
      500: '#dd6b20',
    },
    yellow: {
      500: '#faf089',
    },
    cyan: {
      500: '#63b3ed',
    },
    teal: {
      500: '#2c7a7b',
    },
  },
}

export const getChartData = (
  stats: AccountStats[],
  field: keyof AccountStatsBase,
): ChartJSData => {
  const { blue, red, green, purple, pink, orange, yellow, cyan, teal } =
    theme.colors

  const borderColors = [
    blue[500],
    green[500],
    purple[500],
    red[500],
    pink[500],
    orange[500],
    yellow[500],
    cyan[500],
    teal[500],
  ]

  const chartData: ChartJSData = {
    labels: [], // array to store dates
    datasets: [], // array to store datasets
  }

  // iterate over unique usernames and create datasets for each user
  stats.forEach((d, index) => {
    const date = new Date(d.date)
    const shortDate = format(date, 'dd/MM')

    const datasetIndex = chartData.datasets.findIndex(
      ds => ds.name === shortDate,
    )

    if (datasetIndex === -1) {
      chartData.datasets.push({
        name: shortDate,
        [d.username]: d[field] as number,
      })
    } else {
      const existingData = chartData.datasets[datasetIndex] as Record<
        string,
        unknown
      >
      existingData[d.username] = d[field]
    }

    const userNameIndex = chartData.labels.findIndex(
      ds => ds.username === d.username,
    )

    if (userNameIndex == -1) {
      chartData.labels.push({
        username: d.username,
        stroke: borderColors[index],
      })
    }
  })

  return chartData
}
