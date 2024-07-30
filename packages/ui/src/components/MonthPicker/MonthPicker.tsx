// Ref: https://github.com/viniarruda/react-month-range-picker
import { FC, useEffect, useState } from 'react'

import {
  Button,
  HStack,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Text,
} from '@chakra-ui/react'
import { FaCalendar, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

import { MonthPickerProps } from './types'
import { Year } from './Year'

export const MonthPicker: FC<MonthPickerProps> = ({
  onRangeSelect,
  onSelect,
  onClear,
  columns = 3,
  disableFuture = false,
  children,
}) => {
  const [startMonth, setStartMonth] = useState<Date | null>(null)
  const [endMonth, setEndMonth] = useState<Date | null>(null)
  const [yearOffset, setYearOffset] = useState<number>(0)

  const today = new Date()
  const currentYear = today.getFullYear()

  const isLastYear = currentYear + yearOffset + 1 > currentYear

  const handleClear = () => {
    setStartMonth(null)
    setEndMonth(null)
    setYearOffset(0)
    onClear && onClear()
  }

  const handleSelectCurrent = () => {
    setStartMonth(new Date(currentYear, today.getMonth(), 1))
  }

  const handleMonthClick = (month: Date) => {
    if (!startMonth || endMonth) {
      setStartMonth(month)
      setEndMonth(null)
    } else if (month < startMonth) {
      setStartMonth(month)
      setEndMonth(startMonth)
    } else {
      setEndMonth(month)
    }
  }

  const handlePrevYear = () => {
    setYearOffset(yearOffset - 1)
  }

  const handleNextYear = () => {
    if (isLastYear && disableFuture) {
      return
    }

    setYearOffset(yearOffset + 1)
  }

  useEffect(() => {
    if (startMonth && typeof onSelect === 'function') {
      onSelect({
        month: startMonth.getMonth() + 1,
        year: startMonth.getFullYear(),
      })
    }

    if (startMonth && endMonth && typeof onRangeSelect === 'function') {
      const getInitialYear = startMonth.getFullYear()
      const getFinalYear = endMonth.getFullYear()
      const initialMonth = startMonth.getMonth() + 1
      const finalMonth = endMonth.getMonth() + 1

      onRangeSelect({
        startMonth: initialMonth,
        startYear: getInitialYear,
        endMonth: finalMonth,
        endYear: getFinalYear,
      })
    }
  }, [startMonth, endMonth, onRangeSelect, onSelect])

  return (
    <Popover isLazy>
      <PopoverTrigger>
        {children || (
          <IconButton
            aria-label="Open calendar"
            variant={'outline'}
            icon={<FaCalendar />}
          />
        )}
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverHeader>
          <HStack justify={'space-between'} align={'center'} gap={2}>
            <IconButton
              aria-label="left"
              variant={'ghost'}
              colorPalette={'gray'}
              icon={<FaChevronLeft />}
              onClick={handlePrevYear}
            />
            <Text>{today.getFullYear() + yearOffset}</Text>
            <IconButton
              aria-label="left"
              variant={'ghost'}
              colorPalette={'gray'}
              icon={<FaChevronRight />}
              isDisabled={isLastYear && disableFuture}
              onClick={handleNextYear}
            />
          </HStack>
        </PopoverHeader>
        <PopoverBody>
          <Year
            columns={columns}
            yearOffset={yearOffset}
            disableFuture={disableFuture}
            handleMonthClick={handleMonthClick}
            startMonth={startMonth}
            endMonth={endMonth}
          />
        </PopoverBody>
        <PopoverFooter
          justifyContent={'space-between'}
          w={'full'}
          display={'flex'}
          px={4}
        >
          <Button variant={'link'} onClick={handleClear}>
            Clear
          </Button>
          <Button variant={'link'} onClick={handleSelectCurrent}>
            Select current
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  )
}
