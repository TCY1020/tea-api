'use strict'
const projectCode = '00'
const AbstractError = require('../lib/error/abstract')
const ErrorCode = require('../public/error_code')

module.exports = {
  errorHandle(err, ctx) {
    const api = ctx._matchedRouteName || '0000'
    const name = err.constructor.name
    let code
    if (ErrorCode[name]) {
      code = ErrorCode[name][err.message] || ErrorCode[name].default
    }

    if (err instanceof AbstractError) {
      ctx.body = err.getBody(projectCode, api, code)
      ctx.status = err.getHttpStatus()
    } else {
      code = code || ErrorCode.Error.default
      ctx.body = {
        error_code: `${projectCode}-${api}-00-${code.code}`,
        error_msg: code.message || err.message,
      }
      ctx.status = 500
    }

    const accept = ctx.header.accept
    if (!(/json/.test(accept)) && typeof ctx.body === 'object') {
      ctx.body = JSON.stringify(ctx.body)
    }
  },
}
