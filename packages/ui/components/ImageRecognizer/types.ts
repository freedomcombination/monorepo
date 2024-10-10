import { Dispatch, SetStateAction } from 'react'

export type RecognizedImage = {
  id: number
  file: File
  preview: string
  text: string
  isLoading: boolean
  isError: boolean
  isProcessed: boolean
}

export enum Languages {
  en = 'eng',
  nl = 'nld',
  tr = 'tur',
}

export type ImageRecognizerProps = {
  recognized?: boolean
  setRecognized?: (recognized: boolean) => void
  state: Record<number, RecognizedImage>
  setState: Dispatch<SetStateAction<Record<number, RecognizedImage>>>
}

export type ImageRecognizeItemProps = {
  key: number
  onUpdate: (value: string) => void
  onRemove: () => void
  value: string
  preview: string
}
