const { mysql } = require('../qcloud')

const user = {}

user.getUserInfo = async ctx => {
  const { nickName } = ctx.query

  const userInfo = await mysql("user").where({ nickName }).select("*")

  ctx.state.data = userInfo && userInfo[0]
}

user.changeName = async ctx => {
  const { newName, nickName } = ctx.query;
  
  ctx.state.data = await mysql("user").where({ nickName }).update(`name,${newName}`);
}

module.exports = user