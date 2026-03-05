'use strict'
const { Service } = require('egg')
const bcrypt = require('bcrypt')
const RuntimeError = require('../lib/error/runtime')

class UserService extends Service {
  async getUser({ hallId, email, username = null }) {
    const { ctx } = this
    const where = { hallId, email }
    if (username) {
      where.username = username
    }
    const result = await ctx.model.User.findOne({
      where,
    })

    return result
  }
  async createUser({ username, password, hallId, email, type }) {
    const { ctx } = this
    const hashedPassword = await bcrypt.hash(password, 10)
    const result = await ctx.model.User.create({
      username,
      hallId,
      password: hashedPassword,
      email,
      type,
      enable: true,
    })

    return result
  }

  async login({ username, email, password, hallId }) {
    const { ctx } = this
    const user = await ctx.service.user.getUser({ username, email, hallId })
    if (!user) {
      throw new RuntimeError('user_not_found')
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      throw new RuntimeError('invalid_password')
    }

    return user
  }
}

module.exports = UserService
