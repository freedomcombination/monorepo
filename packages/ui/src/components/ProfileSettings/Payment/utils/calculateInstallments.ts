import { addMonths } from 'date-fns/addMonths'

import { CoursePayment } from '@fc/types'

interface Installment {
  date: Date
  amount: number
  payment: CoursePayment | null
  installmentNumber: number
}

export const calculateInstallments = (
  installmentCount: number,
  installmentStartAfter: string | Date,
  price: number,
  successfulPayments: CoursePayment[],
  installmentInterval = 1,
): Installment[] => {
  const installmentDates: Installment[] = []
  const installmentAmount = price / installmentCount
  installmentInterval = Math.max(1, installmentInterval)

  for (let i = 0; i < installmentCount; i++) {
    installmentDates.push({
      date: addMonths(installmentStartAfter, i * installmentInterval),
      amount: installmentAmount,
      installmentNumber: i + 1,
      payment: null,
    })
  }

  for (const payment of successfulPayments) {
    const installmentIndex = payment.installmentNumber - 1
    installmentDates[installmentIndex].payment = payment
  }

  return installmentDates
}
