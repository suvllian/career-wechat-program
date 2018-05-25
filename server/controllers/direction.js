const { mysql } = require('../qcloud.js');
module.export = async ctx => {
  ctx.state.data = await mysql("profession").select();
}