import { FC, useState } from 'react'

import {
  Badge,
  Center,
  Flex,
  Grid,
  GridItem,
  HStack,
  ListIcon,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Text,
  UnorderedList,
  VStack,
  Wrap,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { MdMail } from 'react-icons/md'

import { DevMail } from '@fc/types/dev-mail'
import { formatDate } from '@fc/utils/formatDate'

import { useDevMail } from './useDevMail'
import { KeyValue } from '../KeyValueView'

export const DevMailModal: FC = () => {
  const { isOpen, onClose, mails, lastGroupTime, checkTimer, setCheckTimer } =
    useDevMail()
  const { locale } = useRouter()
  const [selectedMail, setSelectedMail] = useState<DevMail | null>(null)

  const groupMails = mails.reduce(
    (acc, mail) => {
      if (!acc[mail.groupDate]) {
        acc[mail.groupDate] = []
      }
      acc[mail.groupDate].push(mail)

      return acc
    },
    {} as Record<string, DevMail[]>,
  )

  const groups = Object.entries(groupMails)
    .map(([groupDate, mails]) => {
      return {
        groupDate,
        title: mails[0].subject,
        mails,
        isNew: lastGroupTime < groupDate,
      }
    })
    .sort((a, b) => (a.groupDate < b.groupDate ? 1 : -1))

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'7xl'}>
      <ModalOverlay />
      <ModalContent m={8}>
        <ModalHeader>
          <HStack justifyContent={'space-between'} mr={10}>
            <Text>Dev Mail</Text>
            <HStack>
              <Text fontSize={'md'} fontWeight={'normal'}>
                Check interval:{' '}
              </Text>
              <NumberInput
                defaultValue={checkTimer}
                min={5}
                max={60}
                step={5}
                width={20}
                onChange={value => setCheckTimer(Number(value))}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </HStack>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody bg={'gray.50'}>
          <Grid
            templateColumns="repeat(5, 1fr)"
            h={'80vh'}
            w={'100%'}
            gap={2}
            overflow={'hidden'}
          >
            <GridItem flexGrow={0} h={'100%'} overflowY={'scroll'}>
              <Stack
                w={'100%'}
                h={'100%'}
                borderRadius={'lg'}
                p={2}
                spacing={4}
                bg={'white'}
              >
                {groups.map(group => (
                  <Stack
                    key={group.groupDate}
                    borderWidth={1}
                    borderRadius={'lg'}
                    borderColor={group.isNew ? 'blue.700' : 'gray.200'}
                    p={2}
                    spacing={3}
                    shadow={group.isNew ? 'lg' : 'md'}
                    cursor={'pointer'}
                  >
                    <HStack justifyContent={'space-between'}>
                      <Text
                        fontSize={'sm'}
                        fontWeight={group.isNew ? 'bold' : 'normal'}
                      >
                        {formatDate(
                          group.groupDate,
                          'dd MMMM yyyy HH:mm',
                          locale,
                        )}
                      </Text>
                      <Badge
                        colorScheme={group.isNew ? 'green' : 'gray'}
                        fontWeight={group.isNew ? 'bold' : 'normal'}
                        fontSize={'lg'}
                      >
                        {group.mails.length}
                      </Badge>
                    </HStack>
                    <UnorderedList>
                      {group.mails.map(mail => (
                        <ListItem
                          _hover={{
                            textDecoration: 'underline',
                            cursor: 'pointer',
                            color: 'blue.500',
                            bg: 'blue.50',
                          }}
                          key={mail.id}
                          w={'100%'}
                          onClick={() => setSelectedMail(mail)}
                          noOfLines={2}
                        >
                          <ListIcon as={MdMail} />
                          {mail.subject}
                        </ListItem>
                      ))}
                    </UnorderedList>
                  </Stack>
                ))}
              </Stack>
            </GridItem>
            <GridItem colSpan={4}>
              <Stack
                w={'100%'}
                h={'100%'}
                borderRadius={'lg'}
                p={2}
                bg={'white'}
              >
                {selectedMail ? (
                  <Flex w={'100%'} h={'100%'} flexDirection={'column'}>
                    <KeyValue title="Subject">
                      <Text fontWeight={'bold'}>{selectedMail.subject}</Text>
                    </KeyValue>
                    <KeyValue title="To">
                      <Wrap maxH={80} overflowY={'auto'}>
                        {selectedMail.to.split(',').map(to => (
                          <Badge
                            key={to}
                            colorScheme={'blue'}
                            fontSize={'sm'}
                            fontWeight={'bold'}
                          >
                            {to}
                          </Badge>
                        ))}
                      </Wrap>
                    </KeyValue>
                    <VStack
                      borderWidth={3}
                      borderRadius={'sm'}
                      flexGrow={1}
                      width={'100%'}
                    >
                      <iframe
                        style={{
                          flex: 1,
                        }}
                        width="100%"
                        height="100%"
                        srcDoc={selectedMail.html}
                      />
                    </VStack>
                  </Flex>
                ) : (
                  <Center h={'100%'}>Select Mail</Center>
                )}
              </Stack>
            </GridItem>
          </Grid>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
