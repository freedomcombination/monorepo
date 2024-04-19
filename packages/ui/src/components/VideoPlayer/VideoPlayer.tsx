import { FC, useState } from 'react'

import { AspectRatio, Box, useBoolean } from '@chakra-ui/react'
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa'
import ReactPlayer from 'react-player'

import { getMediaUrl } from '@fc/utils'

type VideoPlayerProps = {
  ratio?: number
  url: string
  light?: string
}

const VideoPlayer: FC<VideoPlayerProps> = ({ ratio = 16 / 9, url, light }) => {
  const [isPlaying, setIsPlaying] = useBoolean(false)
  const [fallbackUrl, setFallbackUrl] = useState<string>()

  return (
    <Box pos={'relative'} role={'group'}>
      <AspectRatio
        ratio={ratio}
        w="full"
        rounded={'lg'}
        overflow="hidden"
        onClick={setIsPlaying.toggle}
        cursor="pointer"
        bg={'gray.50'}
      >
        <ReactPlayer
          playing={isPlaying}
          url={fallbackUrl || url}
          width="100%"
          height="100%"
          light={light}
          onError={() => {
            const fallback = getMediaUrl(url, true)
            setFallbackUrl(fallback)
          }}
          // playIcon={}
        />
      </AspectRatio>
      <Box
        opacity={0}
        _groupHover={{ opacity: 1 }}
        boxSize={12}
        color="whiteAlpha.700"
        as={isPlaying ? FaPauseCircle : FaPlayCircle}
        pos={'absolute'}
        top={'50%'}
        left={'50%'}
        transform={'translate(-50%, -50%)'}
        transition={'opacity .2s ease-in-out'}
        // Pointer events are disabled so that the video can be played
        // when clicking on the play icon
        pointerEvents={'none'}
      />
    </Box>
  )
}

export default VideoPlayer
