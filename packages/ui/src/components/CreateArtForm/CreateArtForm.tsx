import { useRef, useState } from 'react'

import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
  Textarea,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import slugify from '@sindresorhus/slugify'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { FieldErrorsImpl, useForm } from 'react-hook-form'
import useFormPersist from 'react-hook-form-persist'
import { FaPlus, FaUpload } from 'react-icons/fa'

import { useAuthContext } from '@fc/context'
import { useCreateModelMutation, useStrapiRequest } from '@fc/services'
import { ArtCreateInput, Category } from '@fc/types'

import { ArtCreateSuccessAlert } from './CreateArtSuccessAlert'
import { createArtSchema } from './schema'
import { CreateArtFormFieldValues } from './types'
import { FilePicker } from '../FilePicker'
import { FormItem } from '../FormItem'
import { Navigate } from '../Navigate'
import { WSelect } from '../WSelect'

export const CreateArtForm = () => {
  const [image, setImage] = useState<File>()
  const { locale } = useRouter()
  const { t } = useTranslation()
  const categories = useStrapiRequest<Category>({
    endpoint: 'categories',
  })
  const queryClient = useQueryClient()

  const { user, profile } = useAuthContext()

  const cancelRef = useRef<HTMLButtonElement>(null)
  const formDisclosure = useDisclosure()
  const successDisclosure = useDisclosure()
  const toast = useToast()

  const {
    register,
    watch,
    setValue,
    formState,
    handleSubmit,
    reset: resetForm,
    control,
  } = useForm<CreateArtFormFieldValues>({
    resolver: yupResolver(createArtSchema),
    mode: 'all',
  })

  useFormPersist(`create-art`, {
    watch,
    setValue,
    ...(typeof window !== 'undefined' && { storage: window.sessionStorage }),
  })

  const errors = formState.errors as FieldErrorsImpl<CreateArtFormFieldValues>
  const isValid = formState.isValid

  const { mutate, isPending } = useCreateModelMutation('arts')
  const { pathname } = useRouter()
  const loginHref = `/login?returnUrl=${pathname}`

  const createArt = async (
    data: CreateArtFormFieldValues & { image: File },
  ) => {
    if (!user) return

    const slug = slugify(data.title)

    const formBody: ArtCreateInput = {
      title_en: data.title,
      title_nl: data.title,
      title_tr: data.title,
      description_en: data.description,
      description_nl: data.description,
      description_tr: data.description,
      slug,
      categories: data.categories?.map(c => Number(c.value)) || [],
      publishedAt: null,
      image: image as File,
    }

    mutate(formBody, {
      onSuccess: () => {
        closeForm()
        successDisclosure.onOpen()
        queryClient.invalidateQueries({ queryKey: ['user-arts', profile?.id] })
      },
      onError: () => {
        toast({
          title: 'Error',
          description: 'Something went wrong',
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      },
    })
  }

  const handleCreateArt = async (data: CreateArtFormFieldValues) => {
    createArt({ ...data, image: image as File })
  }

  const resetFileUploader = () => {
    setImage(undefined)
  }

  const closeForm = () => {
    resetFileUploader()
    resetForm()
    formDisclosure.onClose()
  }

  return (
    <>
      {/* SUCCESS ALERT */}
      <ArtCreateSuccessAlert
        isOpen={successDisclosure.isOpen}
        onClose={successDisclosure.onClose}
        ref={cancelRef}
      />

      <Button size="lg" onClick={formDisclosure.onOpen}>
        <Box mr={{ base: 0, lg: 4 }}>
          <FaUpload />
        </Box>
        <Box display={{ base: 'none', lg: 'block' }}>{t('art.upload')}</Box>
      </Button>

      <Modal
        isCentered
        closeOnOverlayClick={false}
        isOpen={formDisclosure.isOpen}
        onClose={closeForm}
        size={user ? '4xl' : 'md'}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bg="primary.500" color={'white'}>
            {t('art.upload')}
          </ModalHeader>
          <ModalCloseButton color={'white'} />
          <ModalBody pos="relative" py={6}>
            {/* LOADING */}
            {isPending && (
              <Center
                zIndex={1}
                pos="absolute"
                top={0}
                left={0}
                boxSize="full"
                bg="whiteAlpha.900"
              >
                <Spinner size="xl" />
              </Center>
            )}

            {!user && (
              <VStack>
                <Text>
                  <>{t('you-must-logged-in')} </>
                  <Navigate href={loginHref} color="primary.500">
                    {t('login')}
                  </Navigate>
                </Text>
              </VStack>
            )}

            {/* CREATE FORM */}
            {user && (
              <SimpleGrid columns={{ base: 1, lg: 2 }} gap={4}>
                <FilePicker onLoaded={files => setImage(files[0])} />
                <Stack
                  spacing={4}
                  as="form"
                  onSubmit={handleSubmit(handleCreateArt)}
                >
                  <FormItem
                    name="title"
                    isRequired
                    errors={errors}
                    register={register}
                  />
                  <WSelect
                    name="categories"
                    errors={errors}
                    control={control}
                    isMulti
                    options={
                      categories.data?.data?.map(c => ({
                        value: c.id.toString(),
                        label: c[`name_${locale}`],
                      })) || []
                    }
                  />

                  <FormItem
                    name="description"
                    as={Textarea}
                    isRequired
                    errors={errors}
                    register={register}
                  />

                  <ButtonGroup alignSelf="end">
                    <Button onClick={closeForm} mr={3} ref={cancelRef}>
                      {t('cancel')}
                    </Button>
                    <Button
                      isDisabled={
                        !image || (image as any)?.length === 0 || !isValid
                      }
                      type="submit"
                      rightIcon={<FaPlus />}
                    >
                      {t('create')}
                    </Button>
                  </ButtonGroup>
                </Stack>
              </SimpleGrid>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
