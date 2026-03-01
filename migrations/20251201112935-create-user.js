'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user', {
      id: { type: Sequelize.INTEGER, field: 'id', primaryKey: true, autoIncrement: true },
      username: { type: Sequelize.STRING(50), field: 'username', allowNull: false },
      enable: { type: Sequelize.BOOLEAN, field: 'enable', defaultValue: true },
      hallId: { type: Sequelize.INTEGER, field: 'hall_id', allowNull: true },
      type: { type: Sequelize.INTEGER, field: 'type', defaultValue: 1 },
      createdAt: { type: Sequelize.DATE, field: 'created_at', defaultValue: Sequelize.NOW },
      updatedAt: { type: Sequelize.DATE, field: 'updated_at', defaultValue: Sequelize.NOW },
    })
    await queryInterface.addConstraint('user', {
      fields: [ 'username', 'hall_id' ],
      name: 'unique_username_hallId',
      type: 'unique',
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user')
  },
}
