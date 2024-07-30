import { theme } from '@chakra-ui/theme'
import { format } from 'date-fns'

import { AccountStats, AccountStatsBase } from '@fc/types'

import { ChartJSData } from './types'

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
