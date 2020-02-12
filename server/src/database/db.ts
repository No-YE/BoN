import { Sequelize } from 'sequelize';

export default new Sequelize('bon', '', '', {
  host: '',
  dialect: 'mysql',
  define: {
    underscored: true,
  },
  pool: {
    max: 5,
  },
});