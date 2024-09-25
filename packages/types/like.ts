export type LikeMutationArgs = {
  id: number
  type: 'like' | 'unlike'
  token?: string | null
  recaptchaToken?: string
}
