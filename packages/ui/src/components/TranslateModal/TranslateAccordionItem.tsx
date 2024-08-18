import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  Button,
  ButtonGroup,
  HStack,
  Stack,
  Text,
  Tooltip,
} from '@chakra-ui/react'
import { BsTranslate } from 'react-icons/bs'

import { StrapiTranslatableModel } from '@fc/types'

import { TranslateAccordionItemProps } from './types'
import { Flag } from '../Flag'

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
    <AccordionItem>
      <AccordionButton as={HStack} cursor="pointer">
        <HStack flex={'1'}>
          <HStack gap={2} flex={'1'}>
            <Flag locale={locale} />
            <HStack>
              <Text
                fontWeight={700}
                maxW={{ base: 150, lg: 300 }}
                noOfLines={1}
              >
                {title}
              </Text>

              {approvalStatus && (
                <>
                  <Badge
                    display={{ base: 'none', lg: 'flex' }}
                    variant="outline"
                    colorScheme={
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
                colorScheme={publishedAt ? 'purple' : 'gray'}
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
            <ButtonGroup>
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
                    colorScheme={localeColorSchemes[missingTranslation]}
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
            </ButtonGroup>
          )}
        </HStack>

        <AccordionIcon ml={4} />
      </AccordionButton>
      <AccordionPanel pb={4}>
        <Stack gap={2}>
          {description && (
            <Stack>
              <Text size="lg" fontWeight={700}>
                Description
              </Text>
              <Text>{description}</Text>
            </Stack>
          )}
          {content && (
            <Stack>
              <Text size="lg" fontWeight={700}>
                Content
              </Text>
              {/* TODO: Display in markdown format */}
              <Box>{content}</Box>
            </Stack>
          )}
        </Stack>
      </AccordionPanel>
    </AccordionItem>
  )
}
