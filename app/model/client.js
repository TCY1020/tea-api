'use strict'

module.exports = app => {
  const { STRING, DATE, BOOLEAN, INTEGER } = app.Sequelize

  const Client = app.model.define('client', {
    id: { type: STRING(50), primaryKey: true },
    name: STRING(50),
    scope: STRING(50),
    secret: STRING(50),
    enable: { type: BOOLEAN, defaultValue: true },
    hallId: { type: INTEGER, field: 'hall_id' },
    createdAt: { type: DATE, field: 'created_at', defaultValue: DATE().NOW },
    updatedAt: { type: DATE, field: 'updated_at', defaultValue: DATE().NOW },
  }, {
    freezeTableName: true,
    timestamps: true,
    underscored: false,
  })

  Client.associate = function() {
    app.model.Client.hasMany(app.model.ClientHost, { foreignKey: 'clientId', targetKey: 'id' })
  }

  return Client
}
