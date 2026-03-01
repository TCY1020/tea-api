const { Controller } = require('egg')

class HomeController extends Controller {
  async index() {
    const { ctx } = this
    const user = await ctx.model.User.findAll({
      raw: true,
    })
    console.log(user)
    ctx.body = 'hi, egg'
  }
}

module.exports = HomeController
