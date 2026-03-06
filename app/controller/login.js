'use strict'

const { Controller } = require('egg')
const RuntimeError = require('../lib/error/runtime')
const jwt = require('jsonwebtoken')

class LoginController extends Controller {
  async register() {
    const { ctx, app } = this
    const { username, password, email } = ctx.request.body
    const hallId = 1
    const user = await ctx.service.user.getUser({ username, hallId, email })
    if (user) {
      throw new RuntimeError('username_already_exists')
    }

    const { USER } = app.map.USER_TYPE
    await ctx.service.user.createUser({ username, password, hallId, email, type: USER })
    ctx.body = {
      message: 'success',
    }
  }
  async login() {
    const { ctx } = this
    const { username, email, password } = ctx.request.body
    const hallId = 1
    let user = await ctx.service.auth.login({ username, email, password, hallId })
    user = user.toJSON()
    delete user.password
    const token = jwt.sign({ ...user }, 'test')
    ctx.body = {
      token,
      message: 'success',
    }
  }

  async googleLogin() {
    const { ctx } = this
    const { idToken } = ctx.request.body
    if (!idToken) {
      throw new RuntimeError('google_id_token_required')
    }

    const result = await ctx.service.auth.googleLogin({ idToken })
    ctx.body = {
      token: result.token,
      message: 'success',
    }
  }
}

module.exports = LoginController
