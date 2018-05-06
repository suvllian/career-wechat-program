const { mysql } = require('../qcloud')
module.exports = async ctx => { 
  const { nickName }=ctx.query;

ctx.state.data = await mysql("user").where({nickName}).select("*");

}