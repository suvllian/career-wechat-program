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
    // 添加文章
    addArticleUrl: `${host}/weapp/addArticle`,
    // 获取贴子列表
    articlesUrl: `${host}/weapp/article`,
    // 贴子具体内容
    specialArticleUrl: `${host}/weapp/specialArticle`,
    // 帖子评论内容
    getArticleCommentUrl: `${host}/weapp/getArticleComment`,
    // 增加阅读量
    addReadingQuantityUrl: `${host}/weapp/addReadingQuantity`,
    // 获取热门帖子
    getHotArticleUrl: `${host}/weapp/getHotArticle`,

    //行业选择
    directionUrl: `${host}/weapp/getAll`,
    // 职业middle选择
    middleUrl: `${host}/weapp/getMiddle`,
    finalUrl: `${host}/weapp/getFinal`
  }
};

module.exports = config;
