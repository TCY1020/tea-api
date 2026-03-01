'use strict'

const { EggBaseError } = require('egg-errors')
const Services = require('../../public/service_code')

class AbstractError extends EggBaseError {
  constructor(msg, service = null, info = null) {
    super({ message: msg })
    // Service code
    this.service = '00'
    if (service && typeof service === 'object') {
      const name = service.constructor.name
      console.log('name???', name)
      this.service = Services[name] || '00'
    }

    // Always return 200 HTTP
    this.status = 200

    // Extra info for debugging or detail
    this.info = info
  }

  getBody(project, api, code) {
    const ret = {
      error_code: `${project}-${api}-${this.service}-${code.code}`,
      error_msg: code.message || this.message,
    }

    if (this.info) {
      ret.info = this.info
    }

    return ret
  }

  getHttpStatus() {
    return this.status
  }
}

module.exports = AbstractError

