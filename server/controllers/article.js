const { mysql } = require('../qcloud')
const { getCurrentDayStart } = require('../utils.js')

// the route of article
const article = {}

// get all articles list
article.getArticleList = async ctx => {
  const currentDayStart = getCurrentDayStart()
  const articles = await mysql("articles").select().orderBy('id', 'desc')
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

  if (!id) {
    ctx.state.data = {
      errMsg: '请输入文章ID'
    }
  }

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

  if (!articleTitle || !articleContent || !nickName) {
    ctx.state.data = {
      errMsg: '请输入完整内容'
    }
  }

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
  const queryId = await mysql("user").where({ nickName }).select("id")
  ctx.state.data = await mysql.select('*').from("user").join('articles', function () {
    this.on('user.id', '=', 'articles.authorId').on('user.id', '=', parseInt(queryId[0].id));
  });
}

// get article comment list
article.getArticleComment = async ctx => {
  const { articleId } = ctx.query

  if (!articleId) {
    ctx.state.data = {
      errMsg: '请输入文章ID'
    }
  }

  const addReadingQuantity = await mysql('articles').where('id', '=', parseInt(articleId)).increment('reading_quantity', 1)

  ctx.state.data = await mysql.select('*').from("comment").join('user', function () {
    this.on('comment.articleId', '=', parseInt(articleId)).on('user.id', '=', 'comment.userId')
  });
}

// hot article
article.getHotArticle = async ctx => {
  ctx.state.data = await mysql('articles').orderBy('reading_quantity', 'desc').limit(5)
}

// comment some article
article.addComment = async ctx => {
  const { commentValue, nickName, articleId } = ctx.request.body

  if (!commentValue || !nickName || !articleId) {
    ctx.state.data = {
      errMsg: '请输入完整内容'
    }
  }

  const queryAuthorId = await mysql("user").where({ nickName }).select("*")
  const authorId = queryAuthorId && queryAuthorId[0] && queryAuthorId[0].id
  const currentTime = new Date().getTime()

  ctx.state.data = await mysql('comment').insert({
    comment_time: currentTime,
    content: commentValue,
    userId: authorId,
    articleId
  })
}

module.exports = article
