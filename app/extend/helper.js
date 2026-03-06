'use strict'

module.exports = {
  getGoogleUsernameByEmail({ email }) {
    const [ rawName ] = email.split('@')
    const username = (rawName || 'google_user').slice(0, 50)

    return username
  },
}
