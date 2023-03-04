'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Products', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			product: {
				type: Sequelize.STRING,
				allowNull: false
			},
			productname: {
				type: Sequelize.STRING,
				allowNull: false
			},
			price: {
				type: Sequelize.DECIMAL(10,2),
				allowNull: false
			},
			description: {
				type: Sequelize.STRING,
				allowNull: false
			},
			created_date: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updated_date: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Products');
	}
};
