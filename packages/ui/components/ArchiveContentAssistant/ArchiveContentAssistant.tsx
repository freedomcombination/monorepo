
import { useEffect, useState } from 'react'

import { Button, FormControl, Highlight, HStack, Stack, Text, Textarea, VStack, Wrap } from '@chakra-ui/react'
import { useAssistant, Message } from 'ai/react'
import { useTranslation } from 'next-i18next'
import { GiCheckMark } from 'react-icons/gi'
import { RiAiGenerate } from 'react-icons/ri'

import { ArchiveContent } from '@fc/types'

import { useFields, useSchema } from '../../hooks'
import { ModelCreateModal } from '../ModelCreateModal'

export const ArchiveContentAssistant = () => {

  const { t } = useTranslation()
  const fields = useFields()
  const schemas = useSchema()
  const [usersMessage, setUsersMessage] = useState('')
  const [assistantsMessage, setAssistantsMessage] = useState('')

  const {
    status,
    messages,
    input,
    setMessages,
    stop,
    submitMessage,
    handleInputChange
  } = useAssistant({
    api: '/api/create-archive'
  })

  useEffect(() => {
    if (messages.length === 1) {
      setUsersMessage(messages[0].content)
    } else if (messages.length === 2) {
      setAssistantsMessage(messages[1].content)
    }
  }, [messages])

  return (
    <Stack spacing={4} gap={2} w='100%'>

      <form onSubmit={(e) => {
        e.preventDefault()
        setMessages([])
        setUsersMessage('')
        setAssistantsMessage('')
        submitMessage()
      }}>
        <Stack spacing={4} p={2} w='100%' bg={'green.100'}>
          <FormControl>
            <Textarea
              name="message"
              disabled={status !== 'awaiting_message'}
              value={input}
              onChange={handleInputChange}
              rows={6}
              bg={'whiteAlpha.700'}
              w='100%'
              placeholder='Paste the news article...'
            />
          </FormControl>
          <Wrap>
            {status === 'in_progress' ? (
              <Button
                leftIcon={<RiAiGenerate />}
                type='submit'
                w='100%'
                colorScheme='gray'
                onClick={stop}
              >
                {t('cancel')}
              </Button>
            ) : (
              <Button
                leftIcon={<RiAiGenerate />}
                type='submit'
                w='100%'
              >
                {t('analyze')}
              </Button>

            )}
          </Wrap>
        </Stack>
      </form>
      {/* In case someone wants to check assistant's status */}
      {/* <Stack p={2} bg={'yellow.100'}>
        <Text fontSize={'small'}>status: {status}</Text>
      </Stack> */}

      {
        messages.length > 0 && (
          <VStack p={2} spacing={4} gap={2} bg={'green.100'}>
            {messages.map((message: Message) => (
              message.role === 'assistant' ? (
                <>
                  <HStack
                    key={message.id}
                    gap={2}
                    w='100%'
                  >
                    <Text w='6rem' color={'gray.600'}>Assistant: </Text>
                    <Text w='100%'>
                      <Highlight
                        query={['categories', 'tags']}
                        styles={{ bg: 'red.100', rounded: 'full' }}
                      >{message.content}</Highlight>
                    </Text>
                  </HStack>
                  <ModelCreateModal<ArchiveContent>
                    title='Archive Creation with Assistant'
                    endpoint='archive-contents'
                    fields={fields['archive-contents']!}
                    schema={schemas['archive-contents']!}
                    buttonProps={{
                      leftIcon: <GiCheckMark />
                    }
                    }
                    initialValues={{
                      content: usersMessage,
                      // categories: JSON.parse(assistantsMessage).categories,
                      // tags: JSON.parse(assistantsMessage).tags,
                    }}
                  >
                    Accept
                  </ModelCreateModal>
                </>
              ) : (
                <HStack
                  key={message.id}
                  gap={2}
                  w='100%'
                >
                  <Text w='6rem' color={'gray.600'}>User: </Text>
                  <Text w='100%'>{message.content}</Text>
                </HStack>
              )
            ))}
          </VStack>
        )
      }
    </Stack>
  )
}