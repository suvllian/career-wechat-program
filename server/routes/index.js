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

/**
 * 用户相关操作
 */

// 获取用户信息
router.get('/getUserInfo', controllers.user.getUserInfo)
// 修改用户名
router.post("/changeName", controllers.user.changeName)

/**
 * 文章相关操作
 */

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
// 设置帖子阅读量
router.get('/addReadingQuantity', controllers.article.addReadingQuantity)
// 获取热门贴
router.get('/getHotArticle', controllers.article.getHotArticle)


// 渲染首页的行业列表
router.get("/getAll",controllers.direction.all)
// 渲染career页面的职业列表
router.get("/getMiddle",controllers.direction.middle)
router.get("/getFinal", controllers.direction.final)
module.exports = router
