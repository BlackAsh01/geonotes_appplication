// backend/src/utils/db.js
const { Sequelize } = require('sequelize');

const db = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  database:'SpatialDB',
  username:'postgres',
  password: "1234",
  define: {
    timestamps: false,
  },
});

module.exports = db;
