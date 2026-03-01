'use strict'

const isDisableDb = process.env.DISABLE_DB === 'true'

exports.sequelize = {
  enable: !isDisableDb,
  package: 'egg-sequelize',
}

exports.routerGroup = {
  enable: true,
  package: 'egg-router-group',
}
