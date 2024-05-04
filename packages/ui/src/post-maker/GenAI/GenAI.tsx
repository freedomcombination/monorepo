import { useState } from 'react'

import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Progress,
  Stack,
  Switch,
  Textarea,
  ThemeTypings,
  Wrap,
} from '@chakra-ui/react'
import { useCompletion } from 'ai/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { FaSave } from 'react-icons/fa'
import { FaStop, FaTrash } from 'react-icons/fa6'
import { RiAiGenerate } from 'react-icons/ri'

import { StrapiLocale } from '@fc/types'
import { toastMessage } from '@fc/utils'

import { EditablePost } from './EditablePost'
import {
  ArchivePost,
  GeneratedArchiveContentPost,
  useGenPostContext,
} from './GenPostProvider'

export type PostGenAIProps = {
  archiveContentId: number
  content: string
  onSuccess?: (data: ArchivePost[]) => void
  colorScheme?: ThemeTypings['colorSchemes']
  onlySentences?: boolean
  apiUrl: string
  parseIncomplete: (incompleteText: string) => GeneratedArchiveContentPost[]
  parseCompleted: (completeText: string) => ArchivePost[]
  onSave: (data: ArchivePost[]) => Promise<void>
  noBorder?: boolean
}

const LANGUAGE_NAMES: Record<StrapiLocale, string> = {
  en: 'English',
  nl: 'Nederlands',
  tr: 'Türkçe',
}

export const PostGenAI = ({
  archiveContentId,
  content,
  onSuccess,
  onlySentences = false,
  parseIncomplete,
  parseCompleted,
  onSave,
  apiUrl,
  colorScheme = 'blue',
  noBorder,
}: PostGenAIProps) => {
  const { t } = useTranslation()
  const [numberOfDescriptions, setNumberOfDescriptions] = useState<number>(5)
  const [numberOfSentences, setNumberOfSentences] = useState<number>(5)
  const [charLimitOfDescriptions, setCharLimitOfDescriptions] =
    useState<number>(200)
  const [charLimitOfSentences, setCharLimitOfSentences] = useState<number>(150)

  const {
    getPosts,
    addPosts,
    removePosts,
    askBeforeDelete,
    setAskBeforeDelete,
  } = useGenPostContext()

  const [isSaving, setIsSaving] = useState(false)
  const [useFakeApi, setUseFakeApi] = useState(true)
  const posts = getPosts(archiveContentId)

  const { locale } = useRouter()

  const language = LANGUAGE_NAMES[locale]

  const body = onlySentences
    ? {
        numberOfPosts: numberOfSentences,
        charLimit: charLimitOfSentences,
        language,
        useFakeApi,
      }
    : {
        numberOfDescriptions,
        numberOfSentences,
        charLimitOfDescriptions,
        charLimitOfSentences,
        language,
        useFakeApi,
      }

  const {
    completion,
    input,
    stop,
    isLoading,
    handleInputChange,
    handleSubmit,
  } = useCompletion({
    api: apiUrl,
    initialInput: content,
    body,
    onFinish(prompt: string, completion: string) {
      const parsedCompletion = parseCompleted(completion)
      const archived = addPosts(archiveContentId, parsedCompletion)
      onSuccess?.(archived)
    },
    onError(error) {
      if (typeof error?.message === 'string') {
        if (error.message.includes('You exceeded your current quota')) {
          toastMessage('Error', 'You exceeded your current quota', 'error')

          return
        }
      }

      toastMessage('Error', t('contact.form.failed'), 'error')
    },
  })

  const completed = isLoading ? parseIncomplete(completion) : null

  const handleSave = async () => {
    setIsSaving(true)
    try {
      onSave(posts)
      removePosts(archiveContentId, true)
      toastMessage('Success', 'Posts saved', 'success')
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error)
      toastMessage('Error', msg, 'error')
      console.error(msg)
    }

    setIsSaving(false)
  }

  return (
    <Stack
      spacing={4}
      p={{ base: 4, lg: 8 }}
      bg={`${colorScheme}.100`}
      borderWidth={noBorder ? 0 : 2}
      borderColor={`${colorScheme}.500`}
      rounded={noBorder ? 'none' : 'md'}
    >
      <Heading colorScheme={colorScheme}>Post Generator</Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel mb={0} fontSize="sm" fontWeight={600}>
              Content
            </FormLabel>
            <Textarea
              name="prompt"
              placeholder="Enter a content..."
              value={input}
              onChange={handleInputChange}
              required
              rows={6}
              bg={'whiteAlpha.700'}
            />
          </FormControl>
          <HStack
            spacing={{ base: 4, lg: 8 }}
            flexDirection={{ base: 'column', sm: 'row' }}
          >
            {!onlySentences && (
              <FormControl>
                <FormLabel mb={0} fontSize="sm" fontWeight={600}>
                  Number of Caps Content
                </FormLabel>
                <NumberInput
                  step={1}
                  min={0}
                  max={40}
                  defaultValue={5}
                  onChange={(a, b) => setNumberOfDescriptions(b)}
                >
                  <NumberInputField bg={'whiteAlpha.700'} />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            )}
            <FormControl>
              <FormLabel mb={0} fontSize="sm" fontWeight={600}>
                Number of Posts
              </FormLabel>
              <NumberInput
                step={1}
                min={0}
                max={40}
                defaultValue={5}
                onChange={(a, b) => setNumberOfSentences(b)}
              >
                <NumberInputField bg={'whiteAlpha.700'} />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            {!onlySentences && (
              <FormControl>
                <FormLabel mb={0} fontSize="sm" fontWeight={600}>
                  Character Limit (Caps)
                </FormLabel>
                <NumberInput
                  step={10}
                  min={80}
                  max={200}
                  defaultValue={charLimitOfDescriptions}
                  value={charLimitOfDescriptions}
                  onChange={(a, b) => setCharLimitOfDescriptions(b)}
                >
                  <NumberInputField bg={'whiteAlpha.700'} />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            )}
            <FormControl>
              <FormLabel mb={0} fontSize="sm" fontWeight={600}>
                Character Limit (Posts)
              </FormLabel>
              <NumberInput
                step={10}
                min={100}
                max={200}
                defaultValue={charLimitOfSentences}
                value={charLimitOfSentences}
                onChange={(a, b) => setCharLimitOfSentences(b)}
              >
                <NumberInputField bg={'whiteAlpha.700'} />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </HStack>
          <Wrap justify={'space-between'}>
            <Wrap alignContent={'center'}>
              <FormControl w="auto" display="flex" alignItems="center">
                <FormLabel htmlFor="askBeforeDelete" mb="0">
                  Always ask before deleting
                </FormLabel>
                <Switch
                  id="askBeforeDelete"
                  isChecked={askBeforeDelete}
                  onChange={e => setAskBeforeDelete(e.target.checked)}
                  mr={5}
                />
              </FormControl>
              {process.env.NODE_ENV !== 'production' && (
                <FormControl w="auto" display="flex" alignItems="center">
                  <FormLabel htmlFor="useApiInDev" mb="0">
                    Use fake API
                  </FormLabel>
                  <Switch
                    id="useApiInDev"
                    isChecked={useFakeApi}
                    onChange={e => setUseFakeApi(e.target.checked)}
                    colorScheme={colorScheme}
                  />
                </FormControl>
              )}
            </Wrap>
            <Wrap>
              <Button
                leftIcon={<RiAiGenerate />}
                isDisabled={isLoading}
                type="submit"
                colorScheme={colorScheme}
              >
                {t('generate')}
              </Button>
              {isLoading && (
                <Button
                  leftIcon={<FaStop />}
                  type="button"
                  onClick={stop}
                  colorScheme="gray"
                >
                  Stop
                </Button>
              )}
              {posts.length > 0 && (
                <>
                  <Button
                    leftIcon={<FaSave />}
                    type="button"
                    onClick={handleSave}
                    colorScheme={'purple'}
                    isLoading={isSaving}
                    loadingText="Saving..."
                  >
                    Save All
                  </Button>
                  <Button
                    leftIcon={<FaTrash />}
                    type="button"
                    isDisabled={isSaving}
                    onClick={() => removePosts(archiveContentId)}
                    colorScheme={'red'}
                  >
                    Clear Results
                  </Button>
                </>
              )}
            </Wrap>
          </Wrap>
        </Stack>
      </form>

      {isLoading && completed?.length && posts.length === 0 && (
        <Stack
          spacing={4}
          py={4}
          transition={'0.5s'}
          transitionProperty={'all'}
        >
          <Progress
            size="xs"
            isIndeterminate
            colorScheme={colorScheme}
            bgColor={'whiteAlpha.700'}
          />
          {completed?.map((postObject, index) => (
            <EditablePost
              key={index}
              archiveId={-1}
              postObject={{ ...postObject } as ArchivePost}
              onlySentences={onlySentences}
              descriptionThreshold={charLimitOfDescriptions}
              sentenceThreshold={charLimitOfSentences}
              colorScheme={colorScheme}
            />
          ))}
        </Stack>
      )}

      {posts.map((postObject, index) => (
        <EditablePost
          key={index}
          archiveId={isSaving ? -1 : archiveContentId}
          onlySentences={onlySentences}
          postObject={postObject}
          descriptionThreshold={charLimitOfDescriptions}
          sentenceThreshold={charLimitOfSentences}
          colorScheme={colorScheme}
        />
      ))}
    </Stack>
  )
}
