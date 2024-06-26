import { Activity, UploadFile } from '@fc/types'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'

export type ActivityDetailProps = {
  source: MDXRemoteSerializeResult
  image: UploadFile | string
  title: string
  activity?: Activity
}
