export const formatDate = (dateString: string, format: 'date' | 'datetime' = 'date'): string => {
  const months = [
    'січня',
    'лютого',
    'березня',
    'квітня',
    'травня',
    'червня',
    'липня',
    'серпня',
    'вересня',
    'жовтня',
    'листопада',
    'грудня',
  ]

  const date = new Date(dateString)
  const day = date.getDate()
  const monthName = months[date.getMonth()]
  const year = date.getFullYear()

  if (format === 'date') {
    return `${day} ${monthName} ${year} р.`
    //
  } else if (format === 'datetime') {
    const monthNum = date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth()
    const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
    const seconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()
    const shortYear = year.toString().slice(2, 4)

    return `${day}.${monthNum}.${shortYear} - ${hours}:${minutes}:${seconds}`
    //
  } else {
    return `${day} ${monthName} ${year} р.`
  }
}
