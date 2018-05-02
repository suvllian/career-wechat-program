const { mysql } = require('../qcloud')

module.exports = async ctx => {
  const { id } = ctx.query

  ctx.state.data = await mysql.select('*').from("articles").join('user', function() {
    this.on('user.id', '=', 'articles.authorId').on('articles.id', '=', parseInt(id))
  });
}
