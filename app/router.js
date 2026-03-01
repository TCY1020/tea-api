/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  // router.get('/', controller.home.index)

  const someMiddleware = [
    app.middleware.verifyToken(),
  ]
  router.post('0001', '/api/login/register', controller.login.register)
  router.group({ prefix: '/api', middlewares: [ ...someMiddleware ] }, router => {
    router.get('/', controller.home.index)
    router.post('/multiplication-table', controller.home.getMultiplicationTable)
  })
}
