export const useToast = () => {
  return (args: {
    title: string
    description?: string
    status: 'success' | 'error' | 'warning' | 'info'
    duration?: number
    isClosable?: boolean
  }) => {
    console.log(args)
  }
}
