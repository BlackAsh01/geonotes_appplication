// backend/src/models/Note.js
const { DataTypes, Sequelize } = require('sequelize');
const db = require('../utils/db');

const Note = db.define('Note', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  location: {
    type: Sequelize.GEOMETRY('POINT'),
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = Note;
