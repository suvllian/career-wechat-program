const { mysql } = require('../qcloud')

module.exports = async ctx => {
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
