import { deleteMutation } from './delete'
import { localizeMutation } from './localize'
import { postMutation } from './post'
import { putMutation } from './put'

export const Mutation = {
  post: postMutation,
  put: putMutation,
  delete: deleteMutation,
  localize: localizeMutation,
}
