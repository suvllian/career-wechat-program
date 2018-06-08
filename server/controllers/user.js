const { mysql } = require('../qcloud')

const user = {}

user.addUser = async ctx => {
  const { users } = ctx.request.body;
  const { nickName, avatarUrl, gender } = users;

  if (!users || !nickName || !avatarUrl) {
    ctx.state.data = {
      errMsg: '用户信息不完整'
    }
  }

  const queryResult = await mysql("user").where({ nickName }).select("*")

  if (!queryResult.length) {
    ctx.state.data = await mysql("user").insert({ nickName, avatarUrl, gender })
  }

  ctx.state.data = queryResult
}

user.getUserInfo = async ctx => {
  const { nickName } = ctx.query
  const userInfo = await mysql("user").where({ nickName }).select("*")

  ctx.state.data = userInfo && userInfo[0]
}

user.changeName = async ctx => {
  const { phone, name, userInfo } = ctx.request.body;
  const { nickName } = userInfo;

  if (!phone || !name || !nickName) {
    ctx.state.data = {
      errMsg: '用户信息不完整'
    }
  }

  ctx.state.data = await mysql("user").where({ nickName }).update({ phone, name });
}

module.exports = user