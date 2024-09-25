import { formatNumber } from './formatNumber'

export const formatPrice = (
  price: number,
  minFraction = 2,
  maxFraction = 2,
): string => {
  return (
    formatNumber(price, {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: minFraction,
      maximumFractionDigits: maxFraction,
    }) ?? price.toFixed(minFraction)
  )
}
