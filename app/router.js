/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app

  const someMiddleware = [
    app.middleware.verifyToken(),
  ]
  router.post('0001', '/api/member/register', controller.login.register)
  router.post('0002', '/api/member/login', controller.login.login)
  router.post('0003', '/api/member/google-login', controller.login.googleLogin)
  router.group({ prefix: '/api', middlewares: [ ...someMiddleware ] }, router => {
    router.get('1001', '/', controller.home.index)
    router.post('1002', '/multiplication-table', controller.home.getMultiplicationTable)
  })
}
