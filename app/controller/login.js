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
    let user = await ctx.service.user.login({ username, email, password, hallId })
    user = user.toJSON()
    delete user.password
    const token = jwt.sign({ ...user }, 'test')
    ctx.body = {
      token,
      message: 'success',
    }
  }
}

module.exports = LoginController
