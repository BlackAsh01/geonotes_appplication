// backend/src/controllers/noteController.js
const { Sequelize, QueryTypes } = require('sequelize');
const Note = require('../models/Note');
const db = require('../utils/db');

exports.createNote = async (req, res) => {
  const { latitude, longitude, content } = req.body;

  try {
    const newNote = await Note.create({
      location: { type: 'Point', coordinates: [longitude, latitude] },
      content,
    });

    res.status(201).json(newNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.findAll();
    res.status(200).json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.searchNotes = async (req, res) => {
  const { latitude, longitude, radius } = req.query;

  try {
    const query = `
      SELECT id, content, ST_X(location::geometry) AS longitude, ST_Y(location::geometry) AS latitude
      FROM "Notes"
      WHERE ST_DWithin(location::geography, ST_MakePoint(:longitude, :latitude)::geography, :radius)
    `;

    const notes = await db.query(query, {
      replacements: { latitude, longitude, radius },
      type: QueryTypes.SELECT,
    });

    res.status(200).json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
