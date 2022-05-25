
import { DataTypes } from 'sequelize';
import sequelize from '../db/index.js';

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: true,
    }, 
    lastname: {
        type: DataTypes.STRING,
        allowNull: true,
    }, 
    gender: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }, 
    birthdate: {
        type: DataTypes.DATE,
        allowNull: true,
    }
  }, {
      tableName: 'User',
      timestamps: false,
  });

export default User;