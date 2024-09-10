import { FC, useState } from 'react'

import { Separator, Stack } from '@chakra-ui/react'
import slugify from '@sindresorhus/slugify'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import {
  Alert,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@fc/chakra'
import { useCreateModelMutation } from '@fc/services'
import {
  Post,
  PostCreateInput,
  StrapiTranslatableCreateInput,
  UploadFile,
} from '@fc/types'
import { generateOgImageParams } from '@fc/utils'

import { ImageRecognizer } from '../ImageRecognizer/ImageRecognizer'
import { RecognizedImage } from '../ImageRecognizer/types'
import { ModelSelect } from '../ModelSelect'

type CreatePostFromCapsModalProps = {
  isOpen: boolean
  onClose: () => void
}

export const CreatePostFromCapsModal: FC<CreatePostFromCapsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [state, setState] = useState<Record<number, RecognizedImage>>({})
  const createPostMutation = useCreateModelMutation<
    Post,
    StrapiTranslatableCreateInput
  >('posts')
  const { locale } = useRouter()
  const [recognized, setRecognized] = useState<boolean>(false)

  const {
    formState: { errors },
    watch,
    control,
    handleSubmit,
    setValue,
  } = useForm()

  const onCreate = () => {
    const hashtags = watch('hashtags')

    Object?.values(state).map(async item => {
      const { text, file, id } = item

      const body = {
        description: text,
        locale,
        publishedAt: null,
        content: text,
        caps: file as unknown as UploadFile,
        hashtag: Number(hashtags?.value) as number,
      } as unknown as StrapiTranslatableCreateInput

      const slug =
        body.description?.slice(0, 10) && slugify(body.description.slice(0, 10))

      const bodyData = {
        ...body,
        slug,
      } as StrapiTranslatableCreateInput

      const imageProps = generateOgImageParams()
      const postBody = bodyData as PostCreateInput
      postBody.imageParams = imageProps

      try {
        const value = await createPostMutation.mutateAsync(body)
        if (text === value.description) {
          setState(prev => {
            const prevState = { ...prev }
            delete prevState[id]

            return { ...prevState }
          })
        }
      } catch (error) {
        console.error('Create post error', error)
      }
    })
    setRecognized(false)
  }

  const onReset = () => {
    setState({})
    setRecognized(false)
    setValue('hashtags', undefined)
  }

  const handleClose = () => {
    onReset()
    onClose()
  }

  return (
    <Modal
      open={isOpen}
      onOpenChange={e => (e.open ? null : handleClose())}
      centered
      size="xl"
      closeOnInteractOutside={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Multiple Hashtag Post</ModalHeader>
        <Stack m={10} as={'form'} onSubmit={handleSubmit(onCreate)}>
          <ModelSelect
            endpoint={'hashtags'}
            required={true}
            name={'hashtags' as string}
            label={'Hashtags'}
            errors={errors}
            control={control}
            zIndex={1}
          />
        </Stack>
        <ModalBody>
          <ImageRecognizer
            state={state}
            setState={setState}
            recognized={recognized}
            setRecognized={setRecognized}
          />

          <Separator />
        </ModalBody>
        <ModalFooter justifyContent="space-between">
          <Button colorPalette="red" onClick={handleClose}>
            Cancel
          </Button>
          <Button colorPalette="red" onClick={onReset}>
            Reset
          </Button>
          {/* disabled={!files} */}
          <Button disabled={!state} colorPalette="blue" onClick={onCreate}>
            Create
          </Button>
        </ModalFooter>
        {Object?.values(state).map(item => {
          const { id, isError } = item
          if (isError) {
            return (
              <Alert status="error" key={id}>
                An error occured
              </Alert>
            )
          }
        })}
      </ModalContent>
    </Modal>
  )
}
