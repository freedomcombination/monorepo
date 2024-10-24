import {
  Separator,
  HStack,
  Input,
  Stack,
  Text,
  Textarea,
  Field,
} from '@chakra-ui/react'

import type { StrapiTranslatableModel } from '@fc/types'

import { TranslateFormProps } from './types'
import { Flag } from '../Flag'

export const TranslateForm = <T extends StrapiTranslatableModel>({
  translationKey,
  localizedModels,
}: TranslateFormProps<T>) => {
  const [currentLocale, targetLocale] = translationKey

  const currentModel = localizedModels[currentLocale]

  return (
    <Stack justify="stretch">
      {currentModel.title && (
        <Stack>
          <Field.Label htmlFor={`${currentModel.id} title`}>Title</Field.Label>
          <Stack direction={{ base: 'column', lg: 'row' }}>
            <HStack w={{ base: 'full', lg: 400 }} align="baseline">
              <Flag locale={currentLocale} />
              <Text>{currentModel.title}</Text>
            </HStack>
            <HStack flex={1} align="baseline">
              <Flag locale={targetLocale} />
              <Input id={`${currentModel.id} title`} placeholder="Title" />
            </HStack>
          </Stack>
        </Stack>
      )}

      {currentModel.description && (
        <>
          <Separator orientation="horizontal" />

          <Stack>
            <Field.Label htmlFor={`${currentModel.id} description`}>
              Description
            </Field.Label>
            <Stack direction={{ base: 'column', lg: 'row' }}>
              <HStack w={{ base: 'full', lg: 400 }} align="baseline">
                <Flag locale={currentLocale} />
                <Text>{currentModel.description}</Text>
              </HStack>
              <HStack flex={1} align="baseline">
                <Flag locale={targetLocale} />
                <Textarea
                  id={`${currentModel.id} description`}
                  h="auto"
                  minH={{ base: 300, lg: 'auto' }}
                  placeholder="Description"
                />
              </HStack>
            </Stack>
          </Stack>
        </>
      )}

      {currentModel.content && (
        <>
          <Separator orientation="horizontal" />
          <Stack>
            <Field.Label htmlFor={`${currentModel.id} content`}>
              Content
            </Field.Label>
            <Stack direction={{ base: 'column', lg: 'row' }}>
              <HStack w={{ base: 'full', lg: 400 }} align="baseline">
                <Flag locale={currentLocale} />
                <Text maxH={300} overflowY="auto">
                  {currentModel.content}
                </Text>
              </HStack>
              <HStack flex={1} align="baseline">
                <Flag locale={targetLocale} />
                <Textarea
                  id={`${currentModel.id} content`}
                  h="auto"
                  minH={{ base: 300, lg: 'auto' }}
                  placeholder="Content"
                />
              </HStack>
            </Stack>
          </Stack>
        </>
      )}
    </Stack>
  )
}
