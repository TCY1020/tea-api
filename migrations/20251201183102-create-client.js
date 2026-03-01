'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('client', {
      id: { type: Sequelize.STRING(50), primaryKey: true },
      name: { type: Sequelize.STRING(50), allowNull: false },
      scope: { type: Sequelize.STRING(50), allowNull: false },
      hallId: { type: Sequelize.INTEGER, field: 'hall_id', allowNull: true },
      enable: { type: Sequelize.BOOLEAN, defaultValue: true },
      createdAt: { type: Sequelize.DATE, field: 'created_at', defaultValue: Sequelize.NOW },
      updatedAt: { type: Sequelize.DATE, field: 'updated_at', defaultValue: Sequelize.NOW },
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('client')
  },
}
