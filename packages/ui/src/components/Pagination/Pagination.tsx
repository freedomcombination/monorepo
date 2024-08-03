import { FC } from 'react'

import { HStack } from '@chakra-ui/react'
import { BsThreeDots } from 'react-icons/bs'
import { TbChevronLeft, TbChevronRight } from 'react-icons/tb'

import { DOTS } from './dots'
import { PaginationProps } from './types'
import { usePagination } from './usePagination'
import { Button } from '../Button'
import { IconButton } from '../IconButton'

// https://stackblitz.com/edit/react-1zaeqk
export const Pagination: FC<PaginationProps> = ({
  onPageChange,
  totalCount,
  siblingCount = 0,
  currentPage,
  ...rest
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
  })

  if (!paginationRange || paginationRange.length === 0) return null

  if (currentPage === 0 || paginationRange.length < 2) {
    return null
  }

  const onNext = () => {
    onPageChange(currentPage + 1)
  }

  const onPrevious = () => {
    onPageChange(currentPage - 1)
  }

  const lastPage = paginationRange[paginationRange.length - 1]

  return (
    <HStack justifyContent={'center'} gap={0} {...rest}>
      {/* Prev button */}
      <IconButton
        aria-label="Previous page"
        icon={<TbChevronLeft />}
        variant="ghost"
        colorPalette="gray"
        disabled={currentPage === 1}
        onClick={onPrevious}
        rounded={'full'}
      />

      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <IconButton
              key={index}
              aria-label="dots"
              rounded={'full'}
              variant="ghost"
              colorPalette="gray"
              disabled
              _disabled={{ opacity: 1 }}
              icon={<BsThreeDots />}
            />
          )
        }

        const isCurrentPage = pageNumber === currentPage

        return (
          <Button
            key={index}
            {...(isCurrentPage && {
              variant: 'solid',
            })}
            rounded={'full'}
            onClick={() => onPageChange(pageNumber as number)}
            variant="ghost"
            colorPalette="gray"
          >
            {pageNumber}
          </Button>
        )
      })}

      {/* Next button */}
      <IconButton
        aria-label="Next page"
        icon={<TbChevronRight />}
        disabled={lastPage === currentPage}
        rounded={'full'}
        onClick={onNext}
        variant="ghost"
        colorPalette="gray"
      />
    </HStack>
  )
}
