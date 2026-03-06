'use strict'
const Service = require('egg').Service
const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library')
const RuntimeError = require('../lib/error/runtime')
const ExternalError = require('../lib/error/external')
const AuthorizeError = require('../lib/error/authorize')
const bcrypt = require('bcrypt')

class AuthService extends Service {
  async verifyHost({ origin }) {
    const { ctx } = this
    const clientHost = await ctx.model.ClientHost.findOne({
      where: { host: origin },
      raw: true,
    })
    if (!clientHost) {
      throw new RuntimeError('client_host_not_found')
    }

    return clientHost
  }

  async verifyToken({ headers }) {
    const token = headers.authorization
    if (!token) {
      throw new ExternalError('token_not_found')
    }
    let decoded = null
    try {
      decoded = jwt.verify(token, 'test')
    } catch (error) {
      throw new AuthorizeError('invalid_token')
    }

    return decoded
  }


  async login({ username, email, password, hallId }) {
    const { ctx } = this
    const user = await ctx.service.user.getUser({ username, email, hallId })
    if (!user) {
      throw new ExternalError('user_not_found')
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      throw new ExternalError('invalid_password')
    }

    return user
  }

  async googleLogin({ idToken }) {
    const { ctx, app } = this
    const hallId = 1
    const { USER } = app.map.USER_TYPE
    const googleUser = await this.verifyGoogleIdToken({ idToken })
    let user = await ctx.service.user.getUser({ hallId, email: googleUser.email })
    if (!user) {
      const username = ctx.helper.getGoogleUsernameByEmail({ email: googleUser.email })
      const password = `google_${googleUser.sub}`
      user = await ctx.service.user.createUser({
        username,
        password,
        hallId,
        email: googleUser.email,
        type: USER,
      })
    }

    const userData = user.toJSON()
    delete userData.password
    const token = jwt.sign({ ...userData }, 'test')

    return {
      token,
    }
  }

  async verifyGoogleIdToken({ idToken }) {
    const clientId = this.app.config.google.clientId
    if (!clientId) {
      throw new RuntimeError('google_client_id_not_configured')
    }
    const client = new OAuth2Client(clientId)
    let payload = null
    try {
      const ticket = await client.verifyIdToken({
        idToken,
        audience: clientId,
      })
      payload = ticket.getPayload()
    } catch (error) {
      throw new RuntimeError('invalid_google_id_token')
    }

    if (!payload || !payload.email) {
      throw new RuntimeError('invalid_google_id_token')
    }
    if (payload.email_verified !== true) {
      throw new RuntimeError('google_email_not_verified')
    }

    return {
      sub: payload.sub,
      email: payload.email,
      name: payload.name || '',
    }
  }
}

module.exports = AuthService
