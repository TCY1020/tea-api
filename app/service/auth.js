'use strict'
const Service = require('egg').Service
const jwt = require('jsonwebtoken')
const { randomUUID } = require('crypto')

class AuthService extends Service {
  async verifyToken({ headers }) {
    const { ctx } = this
    const clientHost = await ctx.model.ClientHost.findOne({
      where: { host: headers.host },
      raw: true,
    })


    return clientHost
  }

  async generateHostToken({ headers, ip }) {
    const { ctx } = this
    const clientData = await ctx.model.ClientHost.findOne({
      where: { host: headers.host },
      raw: true,
    })
    console.log('clientData', clientData)
    const jwtToken = jwt.sign({
      clientId: clientData.clientId,
    }, 'test')
    console.log('jwtToken', jwtToken)

    const decoded = jwt.verify(jwtToken, 'test')
    console.log('decoded', decoded)
    if (!clientData) {
      throw new Error('Client not found')
    }
  }
}

module.exports = AuthService
