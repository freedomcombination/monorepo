import { FC } from "react"

import { Text } from "@chakra-ui/react"

import { KeyValue } from "../../../KeyValueView"



export const StatusRejected: FC = () => {

  return (
    <KeyValue tKey='approvalStatus'>
      <Text color={'red.500'}>Bu kurs için başvurunuz reddedildi.</Text>
    </KeyValue>
  )
}
