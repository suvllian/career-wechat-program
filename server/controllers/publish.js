const { mysql } = require("../qcloud.js")
const { getCurrentDayStart } = require('../utils.js')
const jobs = {}

// get jobs by profession
jobs.getJobsByProfession = async ctx => {
  const { careerId, nickName } = ctx.query;
  const queryId = await mysql("user").where({ nickName }).select("id");

  const allJobs = await mysql("recommadation").where("publish_id", "=", careerId).select("*");
  const hasAppliedJobs = await mysql.select('*').from("recommadation").join('application', function () {
    this.on('application.applicant_id', '=', parseInt(queryId[0].id)).on('recommadation.id', '=', 'application.recommadation_id')
  });

  allJobs.map(job => {
    job.hasApplied = hasAppliedJobs.some(applied => applied.recommadation_id === job.id)
    return job
  })

  ctx.state.data = allJobs
}

// apply jobs
jobs.applyJob = async ctx => {
  const { jobId, nickName } = ctx.request.body

  const queryId = await mysql("user").where({ nickName }).select("id");
  const currentTime = new Date().getTime()

  if (!queryId || !queryId.length) {
    ctx.state.data = { success: false, errMsg: '用户不存在' }
  }

  const increaseApplyCount = await mysql('recommadation').where('id', '=', jobId).increment('applyCount', 1)

  ctx.state.data = await mysql("application").insert({
    apply_time: currentTime,
    apply_status: 'pending',
    applicant_id: queryId[0].id,
    recommadation_id: jobId
  })
}

// 
jobs.getMyApplyList = async ctx => {
  const { nickName } = ctx.query

  const queryId = await mysql("user").where({ nickName }).select("id");

  const hasAppliedJobs = await mysql.select('*').from("recommadation").join('application', function () {
    this.on('application.applicant_id', '=', parseInt(queryId[0].id)).on('recommadation.id', '=', 'application.recommadation_id')
  });

  ctx.state.data = hasAppliedJobs
}

// 
jobs.getHotApplyList = async ctx => {
  ctx.state.data = await mysql('recommadation').whereIn('id', function () {
    this.min('id').from('recommadation').groupBy('publish_id');
  }).orderBy('applyCount', 'desc').limit(4)
}

//获取我的内推列表
jobs.getMyPushes = async ctx => {
  const { nickName } = ctx.query;
  var id = await mysql("user").where({ nickName }).select("id");
  id = id[0].id;
  var time = new Date();
  var recommand = await mysql("recommadation").where({ "author_id": id }).select("*");

  ctx.state.data = recommand;
}

jobs.addPushes = async ctx => {
  const { content, nickName, index } = ctx.request.body;
  const publish_time = getCurrentDayStart();
  var id = await mysql("user").where({ nickName }).select("id");
  id = id[0].id;
  var profession_id = index;
  var name = await mysql("profession").where({ "id": index }).select("name");
  name = name[0].name;
  var ability = content, publish_type = name, publish_id = profession_id,
    author_id = id, status = 1;
  var result = await mysql("recommadation").insert({
    ability,
    publish_time,
    publish_type,
    publish_id,
    author_id,
    status
  });
  ctx.state.data = result;
}


module.exports = jobs