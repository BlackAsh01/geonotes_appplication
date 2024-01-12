// frontend/src/components/NoteList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NoteList = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/notes');
        setNotes(response.data);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div>
      <h2>Notes</h2>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <strong>Note:</strong> {note.content} <br />
            {note.latitude !== undefined && note.longitude !== undefined ? (
              <React.Fragment>
                <strong>Coordinates:</strong> {note.latitude.toFixed(6)}, {note.longitude.toFixed(6)}
              </React.Fragment>
            ) : (
              <span>Invalid coordinates</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteList;
