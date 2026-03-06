const { Controller } = require('egg')

class HomeController extends Controller {
  async index() {
    const { ctx } = this
    console.log('ctx.state.user', ctx.state.user)
    // const isDisableDb = process.env.DISABLE_DB === 'true'
    // if (!isDisableDb) {
    //   const userList = await ctx.model.User.findAll({
    //     raw: true,
    //   })
    // }
    ctx.body = 'hi, egg'
  }

  async getMultiplicationTable() {
    const { ctx } = this
    const { number } = ctx.request.body
    let multiplicationTable = ''
    for (let i = 1; i <= number; i++) {
      for (let j = 1; j <= 9; j++) {
        multiplicationTable += `${i} * ${j} = ${i * j} \n`
      }
      multiplicationTable += '\n'
    }

    ctx.body = multiplicationTable
  }
}

module.exports = HomeController
