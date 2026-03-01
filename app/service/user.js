'use strict'

const { Service } = require('egg')

class UserService extends Service {
  async getUser({ username, hallId }) {
    const { ctx } = this
    const result = await ctx.model.User.findOne({
      where: { username, hallId },
    })

    return result
  }
  async createUser(user) {
    const { ctx } = this
    const result = await ctx.model.User.create(user)

    return result
  }
}

module.exports = UserService
