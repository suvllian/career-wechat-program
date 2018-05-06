const {mysql}=require("../qcloud.js")
module.exports=async ctx=>{
  let{newName,nickName}=ctx.query;
  ctx.state.data =  await mysql("user").where({nickName}).update(`name,${newName}`);
}