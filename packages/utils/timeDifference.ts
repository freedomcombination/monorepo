
const getMinuteDifferenceBetweenTimeZones = (
  city1Timezone: string,
  city2Timezone: string,
  date: Date | string | number = new Date()
): number => {
  const now = new Date(date);
  const city1Time = new Date(
    now.toLocaleString('en-US', { timeZone: city1Timezone })
  );
  const city2Time = new Date(
    now.toLocaleString('en-US', { timeZone: city2Timezone })
  );

  const differenceInMinutes =
    (city2Time.getTime() - city1Time.getTime()) / (1000 * 60);

  return Math.round(differenceInMinutes);
}

export const getMinuteDifferenceAmsterdamBetweenUTC = (date?: Date | string | number) =>
  getMinuteDifferenceBetweenTimeZones('UTC', 'Europe/Amsterdam', date)

export const getMinuteDifferenceAmsterdamBetweenLocal = (date?: Date | string | number) =>
  getMinuteDifferenceBetweenTimeZones(
    Intl.DateTimeFormat().resolvedOptions().timeZone,
    'Europe/Amsterdam',
    date
  )
