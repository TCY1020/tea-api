'use strict'

const MAP = Symbol('Application#map')
const getMap = require('../lib/map')

module.exports = {
  get map() {
    this[MAP] = getMap(this)

    return this[MAP]
  },
}
