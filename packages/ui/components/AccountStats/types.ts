import type { AccountStatsBase } from '@fc/types'
import type { AccountStats } from '@fc/types'

export type ChartJSData = {
  labels: Array<{
    username: string
    stroke: string
  }>
  datasets: Array<{
    name: string
  }>
}

export type AccountStatsProps = {
  stats: AccountStats[]
  field: keyof AccountStatsBase
}
