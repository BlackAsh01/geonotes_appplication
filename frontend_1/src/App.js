import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Map from './components/Map';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

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

  const handleNoteCreate = async (newNote) => {
    try {
      const response = await axios.post('http://localhost:5000/api/notes', newNote);
      setNotes((prevNotes) => [...prevNotes, response.data]);
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  const handlePinDrop = (location) => {
    // Handle the selected location (e.g., store it in the state)
    setSelectedLocation(location);
    console.log('Selected Location:', location);
  };

  return (
    <div>
      <header>
        <h1>Geo-Tagged Notes App</h1>
      </header>
      <div className="container">
        <Map notes={notes} onPinDrop={handlePinDrop} />
        <NoteForm onNoteCreate={handleNoteCreate} />
        <NoteList notes={notes} />
      </div>
      {selectedLocation && (
        <div>
          <h2>Selected Location</h2>
          <p>Latitude: {selectedLocation.latitude}</p>
          <p>Longitude: {selectedLocation.longitude}</p>
        </div>
      )}
    </div>
  );
};

export default App;
