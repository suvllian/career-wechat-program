/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://nunbdwfh.qcloud.la';

var config = {

  // 下面的地址配合云端 Demo 工作
  service: {
    host,
    // 登录地址，用于建立会话
    loginUrl: `${host}/weapp/login`,
    // 测试的请求地址，用于测试会话
    requestUrl: `${host}/weapp/user`,
    // 测试的信道服务地址
    tunnelUrl: `${host}/weapp/tunnel`,
    // 上传图片接口
    uploadUrl: `${host}/weapp/upload`,

    //获取个人信息
    professionUrl: `${host}/weapp/getUserInfo`,
    //添加个人信息
    addUserUrl: `${host}/weapp/addUser`,
    //改变个人信息
    changeNameUrl: `${host}/weapp/changeName`,

    // 添加文章
    addArticleUrl: `${host}/weapp/addArticle`,
    // 获取贴子列表
    articlesUrl: `${host}/weapp/article`,
    // 贴子具体内容
    specialArticleUrl: `${host}/weapp/specialArticle`,
    // 帖子评论内容
    getArticleCommentUrl: `${host}/weapp/getArticleComment`,
    // 获取热门帖子
    getHotArticleUrl: `${host}/weapp/getHotArticle`,
    // 我的帖子
    getMyArticleUrl: `${host}/weapp/getMyArticle`,
    // 添加评论
    addCommentUrl: `${host}/weapp/addComment`,

    // 获取职业的内推职位
    getJobsByProfessionUrl: `${host}/weapp/getJobsByProfession`,
    // 申请内推
    applyJobUrl: `${host}/weapp/applyJob`,
    // 我的求职
    getMyApplyListUrl: `${host}/weapp/getMyApplyList`,
    // 热门贴
    getHotApplyListUrl: `${host}/weapp/getHotApplyList`,

    //行业选择
    directionUrl: `${host}/weapp/getAll`,
    // 职业middle选择
    middleUrl: `${host}/weapp/getMiddle`,
    finalUrl: `${host}/weapp/getFinal`,
    // 获取职业名
    getCareerName: `${host}/weapp/getCareerName`,

    //我的内推
    getMyPushesUrl: `${host}/weapp/getMyPushes`,
    //发布内推
    addPushesUrl: `${host}/weapp/addPushes`,

  }
};

module.exports = config;
