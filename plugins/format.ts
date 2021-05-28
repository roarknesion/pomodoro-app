const format = (s: number) => {
  const perday = { seconds: 86400, hours: 24 }

  const days = ~~(s / perday.seconds)
  const seconds = ~~(s % perday.seconds)

  const hms = new Date(seconds * 1000).toISOString().substring(11, 19)

  return hms
    .replace(/^(\d+)/, h => `${Number(h) + days * perday.hours}`.padStart(2, '0'))
    .replace(/^00:/, '')
    .split('')
}

export default format
