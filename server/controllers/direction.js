const {mysql} =require('../qcloud.js');
const career={};
career.all=async ctx=>{
  const all=await mysql("vacations").where('id','<',9).select("*");
    ctx.state.data=all;
}
career.professionType = async ctx => {
  ctx.state.data = await mysql("profession").where("id", ">=", 0).select("name");
}
career.middle=async ctx=>{
  const {ind}=ctx.query;
  const middle=await mysql("profession").where('parentId',ind).select("*");
  ctx.state.data = middle;
}
career.final = async ctx => {
  const { ind } = ctx.query;
  const final = await mysql("profession").where('id', ind).select("*");
  ctx.state.data = final;
}
module.exports=career; 