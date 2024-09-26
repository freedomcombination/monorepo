import { FC } from 'react'

import { Button, Stack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { PSM, createWorker } from 'tesseract.js'

import { ImageRecognizeItem } from './ImageRecognizeItem'
import { ImageRecognizerProps, Languages, RecognizedImage } from './types'
import { FilePicker } from '../FilePicker'

export const ImageRecognizer: FC<ImageRecognizerProps> = ({
  state,
  setState,
  recognized,
  setRecognized,
}) => {
  const handleLoaded = (files: File[], previews: string[]) => {
    const newState = files.reduce(
      (acc, file, index) => {
        const id = Math.random()
        acc[id] = {
          id,
          file,
          preview: previews[index],
          text: '',
          isLoading: false,
          isError: false,
          isProcessed: false,
        }

        return acc
      },
      {} as Record<number, RecognizedImage>,
    )

    setState(newState)
  }

  const router = useRouter()
  const locale = router.locale

  const handleRecognize = async () => {
    const worker = await createWorker(Languages[locale])

    await worker.load()
    await worker.setParameters({ tessedit_pageseg_mode: PSM.AUTO_OSD })

    const items = Object?.values(state)

    for (const item of items) {
      const { id, preview } = item

      try {
        setState(prevState => ({
          ...prevState,
          [id]: {
            ...prevState[id],
            isLoading: true,
          },
        }))

        const result = await worker.recognize(preview)

        const text = result.data.text.replace(/\n/g, ' ').trim()

        setState(prevState => ({
          ...prevState,
          [id]: {
            ...prevState[id],
            text,
            isLoading: false,
            isProcessed: true,
          },
        }))
      } catch (error) {
        console.error(error)

        setState(prevState => ({
          ...prevState,
          [id]: {
            ...prevState[id],
            text: '',
            isLoading: false,
            isError: true,
            isProcessed: true,
          },
        }))
      }
    }

    await worker.terminate()
    setRecognized?.(true)
  }

  return (
    <Stack>
      {!recognized && (
        <>
          <FilePicker maxNumberOfFiles={20} onLoaded={handleLoaded} />
          <Button onClick={handleRecognize}>Recognize</Button>
        </>
      )}
      <Stack spacing={4}>
        {Object?.values(state).map(item => {
          const { id, preview, text, isLoading, isError, isProcessed } = item

          const value = isLoading
            ? 'Recognizing ...'
            : isError
              ? 'Error'
              : isProcessed
                ? text || 'No text found'
                : 'Waiting to be processed'

          return (
            <ImageRecognizeItem
              key={id}
              value={value}
              preview={preview}
              onRemove={() => {
                setState(prev => {
                  const prevState = { ...prev }
                  delete prevState[id]

                  return { ...prevState }
                })
              }}
              onUpdate={text => {
                setState(prev => ({
                  ...prev,
                  [id]: {
                    ...prev[id],
                    text,
                  },
                }))
              }}
            />
          )
        })}
      </Stack>
    </Stack>
  )
}
