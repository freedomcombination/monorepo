import { FC } from 'react'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

import { AccountStatsProps } from './types'
import { getChartData } from './utils'

export const AccountStats: FC<AccountStatsProps> = ({ stats, field }) => {
  const { labels, datasets } = getChartData(stats, field)

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={datasets}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {labels?.map((name, index) => (
          <Line
            type="monotone"
            key={index}
            dataKey={name.username}
            stroke={name.stroke}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}
