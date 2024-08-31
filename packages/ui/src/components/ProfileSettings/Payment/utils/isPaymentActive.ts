export const isPaymentActive = () => {
  return (
    process.env.NODE_ENV !== 'production' || process.env.ALLOW_COURSE_PAYMENT
  )
}
