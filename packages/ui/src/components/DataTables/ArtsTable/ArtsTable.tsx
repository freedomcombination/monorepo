import { FC, useState } from 'react'

import { useDisclosure } from '@chakra-ui/react'

import { useAuthContext } from '@fc/context'
import { Art } from '@fc/types'

import { useColumns } from '../../../data'
import { ArtApprovalModal } from '../../ArtApprovalModal'
import { DataTable } from '../DataTable'
import { DataTableProps } from '../types'

type ArtsTableProps = Omit<DataTableProps<Art>, 'columns'> & {
  onSuccess?: () => void
}

export const ArtsTable: FC<ArtsTableProps> = ({
  currentPage,
  data: arts,
  onSort,
  onSuccess,
  pageCount,
  pageSize,
  setCurrentPage,
  setPageSize,
  totalCount,
}) => {
  const { profile } = useAuthContext()
  const [selectedIndex, setSelectedIndex] = useState<number>()

  const columns = useColumns<Art>()

  const selectedArt =
    typeof selectedIndex === 'number' ? arts?.[selectedIndex] : null
  const approvalDisclosure = useDisclosure()

  const handleClickRow = (index: number) => {
    setSelectedIndex(index)
    approvalDisclosure.onOpen()
  }

  return (
    <>
      {selectedArt && profile && (
        <ArtApprovalModal
          art={selectedArt}
          editor={profile}
          isOpen={approvalDisclosure.isOpen}
          onClose={approvalDisclosure.onClose}
          artist={selectedArt.artist}
          onSuccess={onSuccess}
        />
      )}
      <DataTable<Art>
        columns={columns.arts!}
        currentPage={currentPage}
        data={arts}
        onClickRow={handleClickRow}
        onSort={onSort}
        pageCount={pageCount}
        pageSize={pageSize}
        setCurrentPage={setCurrentPage}
        setPageSize={setPageSize}
        totalCount={totalCount}
      />
    </>
  )
}
