import { AlertStatus, createStandaloneToast } from '@chakra-ui/react'

const { toast } = createStandaloneToast()

/**
 * this function is used to show toast message
 * @param  {String} title title of the toast
 * @param {String}  description   description of the toast
 * @param {("info" | "warning" | "success" | "error")}  status   status of the toast
 */

export const toastMessage = (
  title: string | null,
  description: string | null,
  status: AlertStatus,
) => {
  toast({
    title,
    description,
    status,
    duration: 5000,
    position: 'top-right',
    isClosable: true,
  })
}
