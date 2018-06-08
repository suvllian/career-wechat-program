/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
  prefix: '/weapp'
})
const controllers = require('../controllers')

// 从 sdk 中取出中间件
// 这里展示如何使用 Koa 中间件完成登录态的颁发与验证
const { auth: { authorizationMiddleware, validationMiddleware } } = require('../qcloud')

// --- 登录与授权 Demo --- //
// 登录接口
router.get('/login', authorizationMiddleware, controllers.login)
// 用户信息接口（可以用来验证登录态）
// router.get('/user', validationMiddleware, controllers.user)

// --- 图片上传 Demo --- //
// 图片上传接口，小程序端可以直接将 url 填入 wx.uploadFile 中
router.post('/upload', controllers.upload)
// --- 信道服务接口 Demo --- //
// GET  用来响应请求信道地址的
router.get('/tunnel', controllers.tunnel.get)
// POST 用来处理信道传递过来的消息
router.post('/tunnel', controllers.tunnel.post)

// --- 客服消息接口 Demo --- //
// GET  用来响应小程序后台配置时发送的验证请求
router.get('/message', controllers.message.get)
// POST 用来处理微信转发过来的客服消息
router.post('/message', controllers.message.post)

// 获取用户信息
router.get('/getUserInfo', controllers.user.getUserInfo)
// 修改用户名
router.post("/changeName", controllers.user.changeName)
// 添加用户
router.post("/addUser", controllers.user.addUser)

// 添加文章
router.post('/addArticle', controllers.article.addArticle)
// 文章列表
router.get('/article', controllers.article.getArticleList)
// 具体文章内容
router.get('/specialArticle', controllers.article.getSpecialArticle)
// 获取我的帖子
router.get('/getMyArticle', controllers.article.getMyArticle)
// 获取帖子评论内容
router.get('/getArticleComment', controllers.article.getArticleComment)
// 获取热门贴
router.get('/getHotArticle', controllers.article.getHotArticle),
// some user comment some article
router.post('/addComment', controllers.article.addComment),

// 渲染首页的行业列表
router.get("/getAll", controllers.direction.all)
// 渲染career页面的职业列表
router.get("/getMiddle", controllers.direction.middle)
// 渲染详情页
router.get("/getFinal", controllers.direction.final)
//获取职业名字
router.get("/getCareerName", controllers.direction.professionType)

// get list of job by profession
router.get("/getJobsByProfession", controllers.publish.getJobsByProfession)
// someone apply for jobs
router.post("/applyJob", controllers.publish.applyJob)
// 
router.get("/getMyApplyList", controllers.publish.getMyApplyList)
// 
router.get("/getHotApplyList", controllers.publish.getHotApplyList)
// 渲染我的求职列表
// 渲染我的内推列表
router.get("/getMyPushes", controllers.publish.getMyPushes);
//发布内推
router.post("/addPushes", controllers.publish.addPushes);
module.exports = router
