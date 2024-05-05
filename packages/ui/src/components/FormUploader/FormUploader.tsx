import { FC } from "react"

import { Box, VStack } from "@chakra-ui/react"

import { FilePicker } from "../FilePicker"



type FormUploaderProps = {
  onLoaded?: (files: File[], previews: string[]) => void
}

export const FormUploader: FC<FormUploaderProps> = ({ }) => {


  return (
    <VStack spacing={6} align={'stretch'} bg={'blue.300'}>
      <Box borderRadius={'md'} borderWidth={1} borderBottomStyle={'dashed'} borderColor={'gray.200'} p={4}>
        <FilePicker onLoaded={(files, previews) => console.log(files, previews)} height={80} />
      </Box>
      <Box borderRadius={'md'} borderWidth={1} borderBottomStyle={'dashed'} borderColor={'gray.200'} p={4}>

      </Box>
    </VStack>
  )
}
