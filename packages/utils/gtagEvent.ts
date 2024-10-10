type GTagEvent = {
  action: string
  category: string
  label: string
  value: number
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const gtagEvent = ({ action, category, label, value }: GTagEvent) => {
  return (window as any).gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  })
}
