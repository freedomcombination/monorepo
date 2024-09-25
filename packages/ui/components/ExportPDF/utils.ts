import { camelCase, startCase } from 'lodash'

import type { StrapiLocale, StrapiModel, UploadFile } from '@fc/types'
import { getMediaUrl } from '@fc/utils/getMediaUrl'

import { I18nNamespaces } from '../../@types/i18next'
import { localeTimeFormat } from '../../hooks/useLocaleTimeFormat'
import { CellConfig, WTableRowProps } from '../WTable'

type TranslateFunction = (key: string, options?: object) => string
type PDFCellData = string | object

const turkishToEnglishMap: { [key: string]: string } = {
  ç: 'c',
  Ç: 'C',
  ğ: 'g',
  Ğ: 'G',
  ı: 'i',
  I: 'I',
  İ: 'I',
  ö: 'o',
  Ö: 'O',
  ş: 's',
  Ş: 'S',
  ü: 'u',
  Ü: 'U',
}

const convertTRCharsToEN = (input: string): string => {
  return input
    .split('')
    .map(char => turkishToEnglishMap[char] || char)
    .join('')
}

/**
 * Retrieves a rounded base64 image from the given URL.
 *
 * @param {string} url - The URL of the image.
 * @return {Promise<string>} A promise that resolves to the rounded base64 image, or '-' if there was an error.
 */
const getRoundedBase64FromUrl = async (url: string): Promise<string> => {
  const response = await fetch(url)
  const blob = await response.blob()

  return new Promise<string>(resolve => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const size = 64

      canvas.width = size
      canvas.height = size

      ctx!.beginPath()
      ctx!.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI)
      ctx!.closePath()
      ctx!.clip()

      ctx!.drawImage(img, 0, 0, size, size)

      resolve(canvas.toDataURL())
    }
    img.onerror = () => {
      resolve('-')
    }
    img.src = URL.createObjectURL(blob)
  })
}

const getImageForPDF = async (images: UploadFile | UploadFile[]) => {
  const image = Array.isArray(images) ? images[0] : images
  if (!image) return '-'
  const thumbnail = (image?.formats?.thumbnail?.url ||
    image?.formats?.xsmall ||
    image?.formats?.small ||
    image?.formats?.medium ||
    image?.formats?.large ||
    image?.formats?.xlarge ||
    image?.url) as unknown as UploadFile
  const url = getMediaUrl(thumbnail)

  return await getRoundedBase64FromUrl(url) // getBase64FromUrl(url)
}

/**
 * Generates the content for a cell in a PDF export.
 *  !NOTE: This function has the same functionality as the `WTableCell` component
 *  'packages\ui\src\components\WTable\WTableCell.tsx'.
 *
 * @param {T[keyof T]} value - The value of the cell.
 * @param {CellConfig<T>} cellConfig - The configuration for the cell.
 * @param {keyof T} field - The field of the cell.
 * @param {StrapiLocale} locale - The locale for formatting the date.
 * @param {TranslateFunction} t - The translation function.
 * @return {string} The content for the cell.
 */
const getCellForPDF = async <T extends StrapiModel>(
  value: T[keyof T],
  cellConfig: CellConfig<T>,
  field: keyof T,
  model: T,
  locale: StrapiLocale,
  t: TranslateFunction,
): Promise<PDFCellData> => {
  const { type, transform, transformPDF } = cellConfig

  // TODO ADD MODEL FOR PDF

  const convertFunc = transformPDF ?? transform
  const data = (
    typeof convertFunc === 'function' ? convertFunc(value as T[keyof T]) : value
  ) as string | number | boolean

  let cellContent: string

  // Badge
  if (type === 'badge') {
    cellContent = `[${t(data?.toString() || '-')}]`
  }

  // Date
  else if (type === 'date') {
    const { formattedDate } = localeTimeFormat(
      data as string,
      'dd MMM yy',
      locale,
    )
    cellContent = formattedDate ?? '-'
  }

  // Image
  else if (type === 'image') {
    const result = await getImageForPDF(value as UploadFile | UploadFile[])
    if (result !== '-')
      return { image: await getImageForPDF(value as UploadFile | UploadFile[]) }
    cellContent = '-'
  } else {
    cellContent = data?.toString() || '-'
  }

  return field === 'description' ? cellContent.slice(0, 120) : cellContent
}

/**
 * Generates an array of strings representing columns for a PDF export.
 * !NOTE: This function has the same functionality as the `WTable` component at line 62
 * 'packages\ui\src\components\WTable\WTable.tsx'.
 *
 * @param {WTableRowProps<T>['columns']} columns - The columns to be converted.
 * @param {TranslateFunction} t - The translation function.
 * @return {string[]} An array of strings representing the columns for PDF export.
 */
export const getColumnsForPDF = <T extends StrapiModel>(
  columns: WTableRowProps<T>['columns'],
  t: TranslateFunction,
): string[] => {
  return columns.map(column => {
    const { accessorKey, label } = column
    const translationLabel = t(
      (label || accessorKey) as keyof I18nNamespaces['common'],
      {
        defaultValue: label || startCase(camelCase(accessorKey as string)),
      },
    )

    return convertTRCharsToEN(translationLabel)
  })
}

/**
 * Generates an array of strings representing a row for a PDF export.
 * !NOTE: This function has the same functionality as the `WTableRow` component
 * 'packages\ui\src\components\WTable\TableRow.tsx'.
 *
 * @param {T} model - The model object to generate the row for.
 * @param {{ [key in keyof T]?: CellConfig<T> }} columns - The columns to include in the row.
 * @param {StrapiLocale} locale - The locale for formatting the date.
 * @param {TranslateFunction} t - The translation function.
 * @return {string[]} An array of strings representing the row for the PDF export.
 */
const getRowForPDF = <T extends StrapiModel>(
  model: T,
  columns: Array<CellConfig<T>>,
  locale: StrapiLocale,
  t: TranslateFunction,
): Promise<PDFCellData[]> => {
  return Promise.all(
    columns.map(async column => {
      const field = column.accessorKey as keyof T
      const value = model[field]

      const cellValue = await getCellForPDF(
        value,
        column,
        field,
        model,
        locale,
        t,
      )

      return typeof cellValue === 'string'
        ? convertTRCharsToEN(cellValue)
        : cellValue
    }),
  )
}

/**
 * Generates an array of strings representing rows for a PDF export.
 * !NOTE: This function has the same functionality as the `WTable` component at line 103
 * 'packages\ui\src\components\WTable\WTable.tsx'.
 *
 * @param {T[]} data - The array of data objects to generate rows for.
 * @param {WTableRowProps<T>['columns']} columns - The columns to include in the rows.
 * @param {StrapiLocale} locale - The locale for formatting the date.
 * @param {TranslateFunction} t - The translation function.
 * @return {string[][]} An array of arrays of strings representing the rows for PDF export.
 */
export const getRowsForPDF = <T extends StrapiModel>(
  data: T[],
  columns: WTableRowProps<T>['columns'],
  locale: StrapiLocale,
  t: TranslateFunction,
): Promise<PDFCellData[][]> => {
  return Promise.all(
    data.map(async model => {
      return await getRowForPDF(model, columns, locale, t)
    }),
  )
}
