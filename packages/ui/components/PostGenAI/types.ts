import { ThemeTypings } from '@chakra-ui/react'

import {
  ArchivePostType,
  GeneratedArchiveContentPost,
} from '../GenPostProvider'

export type PostGenAIProps = {
  archiveContentId: number
  content: string
  onSuccess?: (data: ArchivePostType[]) => void
  colorScheme?: ThemeTypings['colorSchemes']
  onlySentences?: boolean
  apiUrl: string
  parseIncomplete: (incompleteText: string) => GeneratedArchiveContentPost[]
  parseCompleted: (completeText: string) => ArchivePostType[]
  onSave: (data: ArchivePostType[]) => Promise<void>
  noBorder?: boolean
}
