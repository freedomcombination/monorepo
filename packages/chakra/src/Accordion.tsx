import {
  Accordion as ChakraAccordion,
  HStack,
  Icon,
  type IconProps,
} from '@chakra-ui/react'
import { LuChevronDown } from 'react-icons/lu'

type AccordionItemTriggerProps = ChakraAccordion.ItemTriggerProps

export const AccordionItemTrigger = (props: AccordionItemTriggerProps) => {
  const { children, ...rest } = props

  return (
    <ChakraAccordion.ItemTrigger {...rest}>
      <HStack gap="4" flex="1" textAlign="start" width="full">
        {children}
      </HStack>
      <ChakraAccordion.ItemIndicator>
        <LuChevronDown />
      </ChakraAccordion.ItemIndicator>
    </ChakraAccordion.ItemTrigger>
  )
}

type AccordionItemContentProps = ChakraAccordion.ItemContentProps

export const AccordionItemContent = (props: AccordionItemContentProps) => {
  return (
    <ChakraAccordion.ItemContent>
      <ChakraAccordion.ItemBody {...props} />
    </ChakraAccordion.ItemContent>
  )
}

export const AccordionItemIcon = (props: IconProps) => {
  return <Icon color="fg.muted" fontSize="lg" {...props} asChild />
}

export const AccordionRoot = ChakraAccordion.Root
export const AccordionItem = ChakraAccordion.Item

export const Accordion = AccordionRoot
export const AccordionButton = AccordionItemTrigger
export const AccordionPanel = AccordionItemContent
export const AccordionIcon = AccordionItemIcon