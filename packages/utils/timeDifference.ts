const getMinuteDifferenceBetweenTimeZones = (
  city1Timezone: string,
  city2Timezone: string,
): number => {
  const city1Time = new Date().toLocaleString('en-US', {
    timeZone: city1Timezone,
  })
  const city2Time = new Date().toLocaleString('en-US', {
    timeZone: city2Timezone,
  })

  const city1Date = new Date(city1Time)
  const city2Date = new Date(city2Time)

  const differenceInMinutes =
    (city2Date.getTime() - city1Date.getTime()) / (1000 * 60)

  return Math.round(differenceInMinutes)
}

export const getMinuteDifferenceAmsterdamBetweenUTC = () =>
  getMinuteDifferenceBetweenTimeZones('UTC', 'Europe/Amsterdam')
export const getMinuteDifferenceAmsterdamBetweenLocal = () =>
  getMinuteDifferenceBetweenTimeZones(
    Intl.DateTimeFormat().resolvedOptions().timeZone,
    'Europe/Amsterdam',
  )
