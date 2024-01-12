// frontend/src/components/NoteForm.js
import React, { useState } from 'react';
import axios from 'axios';

const NoteForm = ({ onNoteCreate }) => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/notes', {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        content,
      });

      onNoteCreate(response.data);
      // Clear the form after successful submission
      setLatitude('');
      setLongitude('');
      setContent('');
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Latitude:
        <input type="text" value={latitude} onChange={(e) => setLatitude(e.target.value)} required />
      </label>
      <label>
        Longitude:
        <input type="text" value={longitude} onChange={(e) => setLongitude(e.target.value)} required />
      </label>
      <label>
        Content:
        <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
      </label>
      <button type="submit">Add Note</button>
    </form>
  );
};

export default NoteForm;
