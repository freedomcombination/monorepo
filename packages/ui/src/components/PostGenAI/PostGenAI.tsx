import { useState } from 'react'

import { HStack, Heading, Stack, Textarea, Group } from '@chakra-ui/react'
import { useCompletion } from 'ai/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { FaSave } from 'react-icons/fa'
import { FaStop, FaTrash } from 'react-icons/fa6'
import { RiAiGenerate } from 'react-icons/ri'

import {
  Button,
  Field,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Progress,
  Switch,
  toaster,
} from '@fc/chakra'
import { StrapiLocale } from '@fc/types'

import { EditablePost } from './EditablePost'
import { PostGenAIProps } from './types'
import { ArchivePostType, useGenPostContext } from '../GenPostProvider'

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
          toaster.create({
            title: 'Error',
            description: 'You exceeded your current quota',
            type: 'error',
          })

          return
        }
      }

      toaster.create({
        title: 'Error',
        description: t('contact.form.failed'),
        type: 'error',
      })
    },
  })

  const completed = isLoading ? parseIncomplete(completion) : null

  const handleSave = async () => {
    setIsSaving(true)
    try {
      onSave(posts)
      removePosts(archiveContentId, true)
      toaster.create({
        title: 'Success',
        description: 'Posts saved',
        type: 'success',
      })
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error)
      toaster.create({ title: 'Error', description: msg, type: 'error' })
      console.error(msg)
    }

    setIsSaving(false)
  }

  return (
    <Stack
      gap={4}
      p={{ base: 4, lg: 8 }}
      bg={`${colorScheme}.100`}
      borderWidth={noBorder ? 0 : 2}
      borderColor={`${colorScheme}.500`}
      rounded={noBorder ? 'none' : 'md'}
    >
      <Heading colorScheme={colorScheme}>Post Generator</Heading>
      <form onSubmit={handleSubmit}>
        <Stack gap={4}>
          <Field label={'Content'}>
            <Textarea
              name="prompt"
              placeholder="Enter a content..."
              value={input}
              onChange={handleInputChange}
              required
              rows={6}
              bg={'whiteAlpha.700'}
            />
          </Field>
          <HStack
            gap={{ base: 4, lg: 8 }}
            flexDirection={{ base: 'column', sm: 'row' }}
          >
            {!onlySentences && (
              <Field label={'Number of Caps Content'}>
                <NumberInput
                  step={1}
                  min={0}
                  max={40}
                  defaultValue={'5'}
                  onValueChange={v => setNumberOfDescriptions(v.valueAsNumber)}
                >
                  <NumberInputField bg={'whiteAlpha.700'} />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Field>
            )}
            <Field label={'Number of Posts'}>
              <NumberInput
                step={1}
                min={0}
                max={40}
                defaultValue={'5'}
                onValueChange={b => setNumberOfSentences(b.valueAsNumber)}
              >
                <NumberInputField bg={'whiteAlpha.700'} />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Field>
            {!onlySentences && (
              <Field label={'Character Limit (Caps)'}>
                <NumberInput
                  step={10}
                  min={80}
                  max={200}
                  defaultValue={`${charLimitOfDescriptions}`}
                  value={`${charLimitOfDescriptions}`}
                  onValueChange={v =>
                    setCharLimitOfDescriptions(v.valueAsNumber)
                  }
                >
                  <NumberInputField bg={'whiteAlpha.700'} />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Field>
            )}
            <Field label={' Character Limit (Posts)'}>
              <NumberInput
                step={10}
                min={100}
                max={200}
                defaultValue={`${charLimitOfSentences}`}
                value={`${charLimitOfSentences}`}
                onValueChange={v => setCharLimitOfSentences(v.valueAsNumber)}
              >
                <NumberInputField bg={'whiteAlpha.700'} />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Field>
          </HStack>
          <Group wrap={'wrap'} justify={'space-between'}>
            <Group wrap={'wrap'} alignContent={'center'}>
              <Field
                w="auto"
                display="flex"
                alignItems="center"
                label={'Always ask before deleting'}
              >
                <Switch
                  id="askBeforeDelete"
                  checked={askBeforeDelete}
                  onCheckedChange={e => setAskBeforeDelete(e.checked)}
                  mr={5}
                />
              </Field>
              {process.env.NODE_ENV !== 'production' && (
                <Field
                  w="auto"
                  display="flex"
                  alignItems="center"
                  label={'Use fake API'}
                >
                  <Switch
                    id="useApiInDev"
                    checked={useFakeApi}
                    onCheckedChange={e => setUseFakeApi(e.checked)}
                    colorScheme={colorScheme}
                  />
                </Field>
              )}
            </Group>
            <Group wrap={'wrap'}>
              <Button
                leftIcon={<RiAiGenerate />}
                disabled={isLoading}
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
                    loading={isSaving}
                    loadingText="Saving..."
                  >
                    Save All
                  </Button>
                  <Button
                    leftIcon={<FaTrash />}
                    type="button"
                    disabled={isSaving}
                    onClick={() => removePosts(archiveContentId)}
                    colorScheme={'red'}
                  >
                    Clear Results
                  </Button>
                </>
              )}
            </Group>
          </Group>
        </Stack>
      </form>

      {isLoading && completed?.length && posts.length === 0 && (
        <Stack gap={4} py={4} transition={'0.5s'} transitionProperty={'all'}>
          <Progress
            size="xs"
            colorScheme={colorScheme}
            bgColor={'whiteAlpha.700'}
          />
          {completed?.map((postObject, index) => (
            <EditablePost
              key={index}
              archiveId={-1}
              postObject={{ ...postObject } as ArchivePostType}
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
