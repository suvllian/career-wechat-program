const { mysql } = require('../qcloud')

// the route of article
const article = {}

const getCurrentDayStart = () => {
  const currentTime = new Date()
  const year = currentTime.getFullYear()
  const month = currentTime.getMonth()
  const day = currentTime.getDate()

  return new Date(`${year}-${month + 1}-${day}`).getTime()
}

// get all articles list
article.getArticleList = async ctx => {
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

// get special article
article.getSpecialArticle = async ctx => {
  const { id } = ctx.query

  ctx.state.data = await mysql.select('*').from("articles").join('user', function () {
    this.on('user.id', '=', 'articles.authorId').on('articles.id', '=', parseInt(id))
  });
}

// add article
article.addArticle = async ctx => {
  const { articleTitle, articleContent, nickName } = ctx.request.body
  const publishTime = new Date().getTime()
  const queryAuthorId = await mysql("user").where('nickName', nickName).select('id')
  const authorId = queryAuthorId && queryAuthorId[0].id
  const tag = 'article'

  ctx.state.data = await mysql('articles').insert({
    title: articleTitle,
    content: articleContent,
    authorId: authorId,
    tag: tag,
    publish_time: publishTime
  })
}

// get articles by username
article.getMyArticle = async ctx => {
  const { nickName } = ctx.query

  ctx.state.data = await mysql.select('*').from("articles").join('user', function () {
    this.on('user.id', '=', 'articles.authorId').on('user.nickName', '=', `nickName`)
  });
}

// get articles by username
article.getMyArticle = async ctx => {
  const { nickName } = ctx.query

  ctx.state.data = await mysql.select('*').from("articles").join('user', function () {
    this.on('user.id', '=', 'articles.authorId').on('user.nickName', '=', `nickName`)
  });
}

// get article comment list
article.getArticleComment = async ctx => {
  const { articleId } = ctx.query

  ctx.state.data = await mysql.select('*').from("comment").join('user', function () {
    this.on('comment.articleId', '=', parseInt(articleId)).on('user.id', '=', 'comment.userId')
  });
}

// increase reading quantity of special article
article.addReadingQuantity = async ctx => {
  const { articleId } = ctx.query

  ctx.state.data = await mysql('articles').where('id', '=', parseInt(articleId)).increment('reading_quantity', 1)
}

// hot article
article.getHotArticle = async ctx => {
  ctx.state.data = await mysql('articles').orderBy('reading_quantity', 'desc').limit(4)
}

module.exports = article
