'use strict'
const AbstractError = require('./abstract')

class RuntimeError extends AbstractError {}

module.exports = RuntimeError
