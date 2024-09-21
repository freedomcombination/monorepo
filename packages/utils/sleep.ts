// Ref: https://javascript.info/task/delay-promise
export const sleep = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms))
