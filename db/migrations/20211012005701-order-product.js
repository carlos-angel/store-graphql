'use strict';
const { DataTypes, Sequelize } = require('sequelize');
const { PRODUCT_TABLE } = require('./../models/order.model');
const { ORDER_TABLE } = require('./../models/order.model');
const { ORDER_PRODUCT_TABLE } = require('./../models/order-product.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(ORDER_PRODUCT_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
      },
      amount: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      orderId: {
        field: 'order_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: ORDER_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      productId: {
        field: 'product_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: PRODUCT_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(ORDER_PRODUCT_TABLE);
  },
};
