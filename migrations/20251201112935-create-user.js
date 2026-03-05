'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user', {
      id: { type: Sequelize.INTEGER, field: 'id', primaryKey: true, autoIncrement: true },
      username: { type: Sequelize.STRING(50), field: 'username', allowNull: false },
      password: { type: Sequelize.STRING(255), field: 'password', allowNull: false },
      email: { type: Sequelize.STRING(255), field: 'email', allowNull: false, unique: true },
      enable: { type: Sequelize.BOOLEAN, field: 'enable', defaultValue: true },
      hallId: { type: Sequelize.INTEGER, field: 'hall_id', allowNull: false },
      type: { type: Sequelize.INTEGER, field: 'type', defaultValue: 2 },
      createdAt: { type: Sequelize.DATE, field: 'created_at', defaultValue: Sequelize.NOW },
      updatedAt: { type: Sequelize.DATE, field: 'updated_at', defaultValue: Sequelize.NOW },
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user')
  },
}
