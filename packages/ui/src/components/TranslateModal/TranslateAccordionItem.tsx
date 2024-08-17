import { Accordion, Badge, Box, HStack, Stack, Text } from '@chakra-ui/react'
import { BsTranslate } from 'react-icons/bs'

import { StrapiTranslatableModel } from '@fc/types'

import { TranslateAccordionItemProps } from './types'
import { Button } from '../Button'
import { Flag } from '../Flag'
import { Tooltip } from '../Tooltip'

const localeColorSchemes = {
  en: 'purple',
  nl: 'orange',
  tr: 'cyan',
}

export const TranslateAccordionItem = <T extends StrapiTranslatableModel>({
  content,
  description,
  locale,
  missingTranslations,
  publishedAt,
  approvalStatus,
  title,
  handleTranslate,
}: TranslateAccordionItemProps<T>) => {
  return (
    <Accordion.Item>
      <Accordion.ItemTrigger as={HStack} cursor="pointer">
        <HStack flex={'1'}>
          <HStack gap={2} flex={'1'}>
            <Flag locale={locale} />
            <HStack>
              <Text
                fontWeight={700}
                maxW={{ base: 150, lg: 300 }}
                lineClamp={1}
              >
                {title}
              </Text>

              {approvalStatus && (
                <>
                  <Badge
                    display={{ base: 'none', lg: 'flex' }}
                    variant="outline"
                    colorPalette={
                      approvalStatus === 'approved' ? 'green' : 'yellow'
                    }
                  >
                    {approvalStatus}
                  </Badge>
                  <Box
                    display={{ base: 'block', lg: 'none' }}
                    boxSize={3}
                    rounded="full"
                    flexShrink={0}
                    bg={
                      approvalStatus === 'approved' ? 'green.400' : 'yellow.400'
                    }
                  />
                </>
              )}

              <Badge
                display={{ base: 'none', lg: 'flex' }}
                variant="outline"
                colorPalette={publishedAt ? 'purple' : 'gray'}
              >
                {publishedAt ? 'Published' : 'Draft'}
              </Badge>
              <Box
                display={{ base: 'block', lg: 'none' }}
                boxSize={3}
                rounded="full"
                flexShrink={0}
                bg={publishedAt ? 'purple.400' : 'gray.400'}
              />
            </HStack>
          </HStack>

          {missingTranslations && (
            <HStack>
              {missingTranslations.map(missingTranslation => (
                <Tooltip
                  key={missingTranslation}
                  label={`Translate to ${missingTranslation}`}
                  bg={missingTranslation === 'nl' ? 'orange.300' : 'purple.300'}
                  hasArrow
                >
                  <Button
                    size="xs"
                    textTransform={'uppercase'}
                    leftIcon={<BsTranslate />}
                    colorPalette={localeColorSchemes[missingTranslation]}
                    variant="ghost"
                    onClick={e => {
                      e.stopPropagation()
                      handleTranslate([locale, missingTranslation])
                    }}
                  >
                    {missingTranslation}
                  </Button>
                </Tooltip>
              ))}
            </HStack>
          )}
        </HStack>

        <Accordion.ItemIndicator />
      </Accordion.ItemTrigger>
      <Accordion.ItemContent pb={4}>
        <Stack gap={2}>
          {description && (
            <Stack>
              <Text fontSize="lg" fontWeight={700}>
                Description
              </Text>
              <Text>{description}</Text>
            </Stack>
          )}
          {content && (
            <Stack>
              <Text fontSize="lg" fontWeight={700}>
                Content
              </Text>
              {/* TODO: Display in markdown format */}
              <Box>{content}</Box>
            </Stack>
          )}
        </Stack>
      </Accordion.ItemContent>
    </Accordion.Item>
  )
}
