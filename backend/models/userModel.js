
import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../db/index.js';

const User = sequelize.define('User', {
    username: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
  }, {
      tableName: 'User',
      timestamps: false,
  });

export default User;