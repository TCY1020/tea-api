'use strict'

const { Controller } = require('egg')
const RuntimeError = require('../lib/error/runtime')

class LoginController extends Controller {
  async register() {
    const { ctx } = this
    const { username, password } = ctx.request.body
    const hallId = 1
    const user = await ctx.service.user.getUser({ username, hallId })
    if (user) {
      throw new RuntimeError('username_already_exists')
    }

    ctx.body = {
      message: 'success',
    }
  }
}

module.exports = LoginController
