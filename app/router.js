/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  // router.get('/', controller.home.index)

  const someMiddleware = [
    app.middleware.verifyToken(),
  ]
  router.post('0001', '/api/member/register', controller.login.register)
  router.post('0002', '/api/member/login', controller.login.login)
  router.group({ prefix: '/api', middlewares: [ ...someMiddleware ] }, router => {
    router.get('/', controller.home.index)
    router.post('/multiplication-table', controller.home.getMultiplicationTable)
  })
}
