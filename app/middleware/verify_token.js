'use strict'

module.exports = () => {
  return async function verifyToken(ctx, next) {
    console.log('verify_token')
    console.log('headers', ctx.request.headers)
    console.log('ip', ctx.request.ip)
    // const clientHost = await ctx.service.auth.verifyToken({ headers: ctx.request.headers })
    // await ctx.service.auth.generateHostToken({ headers: ctx.request.headers, ip: ctx.request.ip })
    await next()
  }
}
