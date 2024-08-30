export const formatNumber = (num: number, options?: Intl.NumberFormatOptions): string | undefined => {
  // TODO: Check for options
  return Intl.NumberFormat('en', options).format(num)
}
