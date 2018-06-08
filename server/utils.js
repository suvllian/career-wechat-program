const getCurrentDayStart = () => {
  const currentTime = new Date()
  const year = currentTime.getFullYear()
  const month = currentTime.getMonth()
  const day = currentTime.getDate()

  return new Date(`${year}-${month + 1}-${day}`).getTime()
}

module.exports = { getCurrentDayStart }