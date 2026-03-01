'use strict'

module.exports = app => {
  const { STRING, INTEGER, BOOLEAN, DATE } = app.Sequelize

  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    username: STRING(50),
    enable: { type: BOOLEAN, defaultValue: true },
    hallId: { type: INTEGER, field: 'hall_id' },
    type: { type: INTEGER, defaultValue: 1 },
    createdAt: { type: DATE, field: 'created_at', defaultValue: DATE().NOW },
    updatedAt: { type: DATE, field: 'updated_at', defaultValue: DATE().NOW },
  }, {
    freezeTableName: true,
    timestamps: true,
    underscored: false,
  })

  return User
}
