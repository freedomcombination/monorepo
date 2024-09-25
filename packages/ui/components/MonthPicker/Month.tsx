import React from 'react'

import { Flex } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { MonthProps } from './types'

export const Month = ({
  startMonth,
  endMonth,
  yearOffset,
  monthIndex,
  disableFuture,
  handleMonthClick,
}: MonthProps) => {
  const today = new Date()
  const year = today.getFullYear() + yearOffset

  const isCurrentMonth = yearOffset === 0 && today.getMonth() === monthIndex

  const isMonthSelected = (month: Date) => {
    if (!startMonth || !endMonth) {
      return false
    }
    const startYearMonth = startMonth.getFullYear() * 12 + startMonth.getMonth()
    const endYearMonth = endMonth.getFullYear() * 12 + endMonth.getMonth()
    const currentYearMonth = month.getFullYear() * 12 + month.getMonth()

    return (
      currentYearMonth >= startYearMonth && currentYearMonth <= endYearMonth
    )
  }

  const isMonthStart = (month: Date) => {
    return month.getTime() === (startMonth?.getTime() || 0)
  }

  const isMonthEnd = (month: Date) => {
    if (!endMonth) {
      return false
    }

    const endYearMonth = endMonth.getFullYear() * 12 + endMonth.getMonth()
    const currentYearMonth = month.getFullYear() * 12 + month.getMonth()

    return currentYearMonth === endYearMonth
  }

  const monthStart = new Date(year, monthIndex, 1)
  const isSelected = isMonthSelected(monthStart)
  const isStart = isMonthStart(monthStart)
  const isEnd = isMonthEnd(monthStart)
  const isDisabled = disableFuture && monthStart > today

  const { locale } = useRouter()

  return (
    <Flex
      justify={'center'}
      rounded={'md'}
      p={4}
      borderWidth={2}
      borderColor={'transparent'}
      {...(isCurrentMonth && {
        bg: 'primary.50',
        borderColor: 'primary.500',
      })}
      {...(isSelected && {
        bg: isCurrentMonth ? 'primary.600' : 'primary.400',
        color: 'white',
      })}
      {...((isStart || isEnd) && {
        bg: 'primary.500',
        color: 'white',
      })}
      cursor={isDisabled ? 'default' : 'pointer'}
      opacity={isDisabled ? 0.5 : 1}
      onClick={isDisabled ? undefined : () => handleMonthClick(monthStart)}
    >
      {new Intl.DateTimeFormat(locale, { month: 'short' }).format(monthStart)}
    </Flex>
  )
}
