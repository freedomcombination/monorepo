import { useState } from 'react'

import { Button } from '@chakra-ui/react'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { FaFilePdf } from 'react-icons/fa6'

import { StrapiModel } from '@fc/types'

import { getColumnsForPDF, getRowsForPDF } from './utils'
import { I18nNamespaces } from '../../../@types/i18next'
import { ExportPDFProps } from '../../components'

export const ExportPDF = <T extends StrapiModel>({
  data,
  columns,
}: ExportPDFProps<T>) => {
  const [saving, setSaving] = useState(false)
  const { t } = useTranslation()
  const { locale } = useRouter()

  const beginExport = () => {
    setSaving(true)

    exportPDF().finally(() => setSaving(false))
  }

  const exportPDF = async () => {
    const addImageToCell = (
      doc: jsPDF,
      data: string,
      x: number,
      y: number,
      width: number,
      height: number,
    ): void => {
      doc.addImage(data, 'jpeg', x, y, width, height)
    }

    const pdf_columns = getColumnsForPDF(columns, (a, b) =>
      t(a as keyof I18nNamespaces['common'], b ? { ...b } : undefined),
    )
    const pdf_rows = await getRowsForPDF(data, columns, locale, (a, b) =>
      t(a as keyof I18nNamespaces['common'], b ? { ...b } : undefined),
    )

    const doc = new jsPDF({
      orientation: 'landscape',
    })

    autoTable(doc, {
      head: [pdf_columns],
      body: pdf_rows,
      didDrawCell: data => {
        if (typeof data.cell.raw === 'object') {
          data.cell.text = []
          const cellWidth = data.cell.width
          const imageSize = Math.min(cellWidth - 4, 12)

          if (data.row.height < imageSize + 2) {
            data.row.height = imageSize + 2
          }

          const imageX = data.cell.x + cellWidth / 2 - imageSize / 2

          addImageToCell(
            doc,
            (data.cell.raw as { image: string }).image,
            imageX,
            data.cell.y + 1,
            imageSize,
            imageSize,
          )
        }
      },
      willDrawCell: data => {
        if (typeof data.cell.raw === 'object') {
          data.cell.text = []
        }
      },
    })

    doc.save('table.pdf')
  }

  return (
    <Button
      leftIcon={<FaFilePdf />}
      colorScheme="primary"
      variant="outline"
      isLoading={saving}
      onClick={beginExport}
    >
      {t('export-pdf')}
    </Button>
  )
}

export default ExportPDF
