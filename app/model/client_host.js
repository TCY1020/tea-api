'use strict'

module.exports = app => {
  const { STRING, DATE } = app.Sequelize

  const ClientHost = app.model.define('client_host', {
    clientId: { type: STRING(50), field: 'client_id', primaryKey: true },
    host: STRING(50),
    createdAt: { type: DATE, field: 'created_at', defaultValue: DATE().NOW },
    updatedAt: { type: DATE, field: 'updated_at', defaultValue: DATE().NOW },
  }, {
    freezeTableName: true,
    timestamps: true,
    underscored: false,
  })

  ClientHost.associate = function() {
    app.model.ClientHost.belongsTo(app.model.Client, { foreignKey: 'clientId', targetKey: 'id' })
  }

  return ClientHost
}
