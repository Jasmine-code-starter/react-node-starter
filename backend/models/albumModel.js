
import { DataTypes } from 'sequelize';
import sequelize from '../db/index.js';

const Album = sequelize.define('Album', {
    imageCollection: {
        type: DataTypes.STRING,
        allowNull: false,
    }, 
    userId: {
        type: DataTypes.STRING,
        allowNull: false,
    }
  }, {
      tableName: 'Album',
      timestamps: false,
  });

export default Album;