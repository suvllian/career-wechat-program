const { mysql } = require('../qcloud')
module.exports = async ctx => {
  const { id } = ctx.query

  ctx.state.data = await mysql("articles").where('id', id);
}
