import React, { PropsWithChildren, ReactNode, useMemo } from 'react'

import {
  Box,
  BoxProps,
  Button,
  ButtonProps,
  Center,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react'

type TabsProps = PropsWithChildren<BoxProps> & {
  activeTabColor?: string
  inactiveTabColor?: string
}

type TabProps = PropsWithChildren<{
  title: string
  icon?: ButtonProps['leftIcon']
}> &
  BoxProps

type TabData = {
  title: string
  content: ReactNode
  icon?: ButtonProps['leftIcon']
}

export const HorizontalTabs: React.FC<TabsProps> = ({
  children,
  activeTabColor = 'primary.500',
  inactiveTabColor = 'primary.300',
  ...props
}) => {
  const [activeTab, setActiveTab] = React.useState(0)

  const tabs = useMemo(() => {
    const tabs =
      React.Children.map(children, child => {
        //  if (React.isValidElement<TabProps>(child) && child.type === Tab) {
        if (React.isValidElement(child))
          return {
            title: child.props.title,
            content: child.props.children,
            icon: child.props.icon as ButtonProps['leftIcon'],
          } as TabData
        //  }

        return undefined
      })?.filter(tab => tab !== undefined) ?? []

    return tabs
  }, [children])

  return (
    <Box
      borderColor={'gray.300'}
      padding={8}
      height={450}
      borderRadius={'lg'}
      overflow={'hidden'}
      {...props}
    >
      <HStack flex={1} height={'100%'}>
        <VStack
          height={'100%'}
          width={200}
          justifyContent={'start'}
          p={2}
          gap={2}
          borderRightWidth={1}
          borderRightColor={'primary'}
          overflowY={'auto'}
        >
          {tabs.map((tab, index) => (
            <Button
              width={'100%'}
              key={index}
              variant="solid"
              bg={activeTab === index ? activeTabColor : inactiveTabColor}
              {...(tab.icon && { leftIcon: tab.icon })}
              title={tab.title}
              onClick={() => setActiveTab(index)}
            >
              {tab.title}
            </Button>
          ))}
        </VStack>
        <Box flex={1} height={'100%'} width={600} p={4} overflowY={'auto'}>
          {tabs[activeTab]?.content ?? (
            <Center flex={1}>
              <Text>No content</Text>
            </Center>
          )}
        </Box>
      </HStack>
    </Box>
  )
}

export const HorizontalTab: React.FC<TabProps> = ({ children, ...props }) => {
  return (
    <Box
      borderWidth={1}
      borderColor={'gray.300'}
      flex={1}
      p={8}
      borderRadius={'lg'}
      {...props}
    >
      {children}
    </Box>
  )
}
