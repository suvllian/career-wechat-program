const { mysql } = require('../qcloud')

const getCurrentDayStart = () => {
  const currentTime = new Date()
  const year = currentTime.getFullYear()
  const month = currentTime.getMonth()
  const day = currentTime.getDay()

  return new Date(`${year}-${month}-${day}`).getTime()
}

module.exports = async ctx => {
  const currentDayStart = getCurrentDayStart()
  const articles = await mysql("articles").select()
  const result = {
    today: [],
    yesterday: [],
    twoDays: []
  }
  
  articles.forEach(article => {
    const { publish_time } = article

    if (publish_time >= currentDayStart) {
      result.today.push(article)
    } else if (publish_time > currentDayStart - 86400000 && publish_time < currentDayStart) {
      result.yesterday.push(article)
    } else {
      result.twoDays.push(article)
    }
  })

  ctx.state.data = result
}
