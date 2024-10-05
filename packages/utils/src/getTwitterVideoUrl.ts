type TweetVideo = {
  bitrate?: number
  content_type: string
  url: string
}

export const getTwitterVideoUrl = (videos: TweetVideo[]): string => {
  return videos
    .filter(video => video.bitrate)
    .sort((a, b) => a.bitrate! - b.bitrate!)[0].url
}
