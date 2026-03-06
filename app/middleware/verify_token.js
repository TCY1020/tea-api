'use strict'

module.exports = () => {
  return async function verifyToken(ctx, next) {
    await ctx.service.auth.verifyHost({ origin: ctx.request.origin })
    const token = await ctx.service.auth.verifyToken({ headers: ctx.request.headers })
    ctx.state.user = token
    await next()
  }
}
