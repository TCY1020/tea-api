'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('client_host', {
      clientId: { type: Sequelize.STRING(50), field: 'client_id', primaryKey: true },
      host: { type: Sequelize.STRING(50), field: 'host', allowNull: false },
      createdAt: { type: Sequelize.DATE, field: 'created_at', defaultValue: Sequelize.NOW },
      updatedAt: { type: Sequelize.DATE, field: 'updated_at', defaultValue: Sequelize.NOW },
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('client_host')
  },
}
