import { FC, useState } from 'react'

import {
  Badge,
  Box,
  Center,
  Flex,
  Grid,
  GridItem,
  HStack,
  List,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { MdMail } from 'react-icons/md'

import {
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
} from '@fc/chakra'
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
    <Modal open={isOpen} onOpenChange={e => !e && onClose()} size={'lg'}>
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
                defaultValue={`${checkTimer}`}
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
        <ModalBody bg={'gray.50'} p={4}>
          <Grid
            templateColumns="300px 1fr"
            h={'80vh'}
            w={'100%'}
            gap={4}
            overflow={'hidden'}
          >
            <GridItem h={'100%'} overflowY={'auto'}>
              <Stack gap={4}>
                {groups.map(group => (
                  <Stack
                    key={group.groupDate}
                    borderWidth={1}
                    pt={2}
                    borderRadius={'lg'}
                    borderColor={group.isNew ? 'blue.700' : 'gray.200'}
                    gap={3}
                    bg={'white'}
                    overflow={'hidden'}
                  >
                    <HStack px={2} justifyContent={'space-between'}>
                      <Text fontSize={'sm'} fontWeight={600}>
                        {formatDate(
                          group.groupDate,
                          'dd MMMM yyyy HH:mm',
                          locale,
                        )}
                      </Text>
                      <Badge
                        colorScheme={group.isNew ? 'green' : 'blackAlpha'}
                        fontWeight={600}
                        rounded={'full'}
                        variant={'solid'}
                        boxSize={6}
                        lineHeight={6}
                        textAlign={'center'}
                      >
                        {group.mails.length}
                      </Badge>
                    </HStack>
                    <List.Root fontSize={'sm'} m={0}>
                      {group.mails.map(mail => {
                        const selected = selectedMail?.id === mail.id

                        return (
                          <List.Item
                            as={HStack}
                            gap={2}
                            px={2}
                            py={1}
                            key={mail.id}
                            onClick={() => setSelectedMail(mail)}
                            cursor={'pointer'}
                            _hover={{ bg: 'gray.100' }}
                            {...(selected && {
                              bg: 'gray.50',
                              fontWeight: 600,
                            })}
                          >
                            <List.Indicator
                              transform={'translateY(2px)'}
                              asChild
                            >
                              <MdMail />
                            </List.Indicator>
                            <Box lineClamp={2}>{mail.subject}</Box>
                          </List.Item>
                        )
                      })}
                    </List.Root>
                  </Stack>
                ))}
              </Stack>
            </GridItem>
            <GridItem>
              <Stack
                w={'100%'}
                h={'100%'}
                borderRadius={'lg'}
                borderWidth={1}
                bg={'white'}
              >
                {selectedMail ? (
                  <Flex w={'100%'} h={'100%'} flexDirection={'column'}>
                    <KeyValue title="Subject" py={3}>
                      <Text fontWeight={600}>{selectedMail.subject}</Text>
                    </KeyValue>
                    <KeyValue title="To" py={3}>
                      <Stack wrap={'wrap'} maxH={80} overflowY={'auto'}>
                        {selectedMail.to.split(',').map(to => (
                          <Badge
                            variant={'outline'}
                            color={'initial'}
                            key={to}
                            fontSize={'sm'}
                            rounded={'full'}
                            px={3}
                          >
                            {to}
                          </Badge>
                        ))}
                      </Stack>
                    </KeyValue>

                    <Box
                      p={4}
                      boxSize={'full'}
                      dangerouslySetInnerHTML={{
                        __html: selectedMail.html,
                      }}
                    />
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
