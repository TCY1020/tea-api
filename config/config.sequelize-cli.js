const localConfig = require('./config.local')

function toSequelizeCliConfig(sequelizeConfig) {
  const cliConfig = {
    username: sequelizeConfig.username,
    password: sequelizeConfig.password,
    database: sequelizeConfig.database,
    host: sequelizeConfig.host,
    port: sequelizeConfig.port,
    dialect: sequelizeConfig.dialect,
  }

  return cliConfig
}

const localSequelizeConfig = localConfig.sequelize

module.exports = {
  development: toSequelizeCliConfig(localSequelizeConfig),
  local: toSequelizeCliConfig(localSequelizeConfig),
}
