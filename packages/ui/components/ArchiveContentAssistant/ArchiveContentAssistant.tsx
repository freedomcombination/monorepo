import {
  Button,
  Code,
  FormControl,
  Stack,
  Text,
  Textarea,
  Wrap,
} from '@chakra-ui/react'
import { Message, useAssistant } from 'ai/react'
import { useTranslation } from 'next-i18next'
import { GiCheckMark } from 'react-icons/gi'
import { RiAiGenerate } from 'react-icons/ri'

import { ArchiveContent } from '@fc/types'

import { useInitialArchiveContentValues } from './useInitialArchiveContentValues'
import { useFields, useSchema } from '../../hooks'
import { ModelCreateModal } from '../ModelCreateModal'

export const ArchiveContentAssistant = () => {
  const { t } = useTranslation()
  const fields = useFields()
  const schemas = useSchema()

  const {
    status,
    messages,
    input,
    setMessages,
    stop,
    submitMessage,
    handleInputChange,
  } = useAssistant({
    api: '/api/create-archive',
  })

  const response = useInitialArchiveContentValues(messages)

  return (
    <Stack gap={4}>
      <form
        onSubmit={e => {
          e.preventDefault()
          setMessages([])
          submitMessage()
        }}
      >
        <Stack gap={4}>
          <FormControl>
            <Textarea
              name="message"
              disabled={status !== 'awaiting_message'}
              value={input}
              onChange={handleInputChange}
              rows={6}
              bg={'whiteAlpha.700'}
              placeholder="Paste the news article..."
            />
          </FormControl>
          <Wrap>
            {status === 'in_progress' ? (
              <Button
                leftIcon={<RiAiGenerate />}
                type="submit"
                colorScheme="gray"
                onClick={stop}
              >
                {t('cancel')}
              </Button>
            ) : (
              <Button leftIcon={<RiAiGenerate />} type="submit">
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

      {messages.length > 0 && (
        <Stack p={4} gap={4} bg={'white'} rounded={'md'} borderWidth={1}>
          {messages.map((message: Message) =>
            message.role === 'assistant' ? (
              <Stack gap={4} key={message.id}>
                <Stack>
                  <Text fontWeight={600}>Assistant:</Text>
                  <Code rounded={'md'} p={2} maxWidth='100%'>
                    {message.content}
                  </Code>
                </Stack>
                <ModelCreateModal<ArchiveContent>
                  title="Archive Creation with Assistant"
                  endpoint="archive-contents"
                  fields={fields['archive-contents']!}
                  schema={schemas['archive-contents']!}
                  buttonProps={{
                    leftIcon: <GiCheckMark />,
                    alignSelf: 'start',
                  }}
                  initialValues={{
                    content: response?.usersMessage?.content ?? '',
                    categories: response?.categories ?? [],
                    prisons: response?.prisons ?? [],
                    victims: response?.victims ?? [],
                  }}
                >
                  Accept
                </ModelCreateModal>
              </Stack>
            ) : (
              <Stack key={message.id}>
                <Text fontWeight={600}>User:</Text>
                <Text noOfLines={3}>{message.content}</Text>
              </Stack>
            ),
          )}
        </Stack>
      )}
    </Stack>
  )
}
