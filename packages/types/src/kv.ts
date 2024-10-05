// Redis key format: <content>::<postId>::<shareCount>::<published>::<archiveId>
export type RedisPost = `${string}::${number}::${number}::${0 | 1}::${number}`

// Redis key format: <content>::<shareCount>
export type RedisQuote = `${string}::${number}`
