import Sequelize from 'sequelize';

const sequelize = new Sequelize(
    'huang_db',
    'root',
    'hyz@7728',
    {
        host: 'localhost',
        dialect: 'mysql',
    }
)

export default sequelize;
global.sequelize = sequelize;
