// pk.eyJ1IjoiYmxhY2thc2gwMTAyIiwiYSI6ImNscWJhMXBhbTI1cGIybG05NTlobmRpNzcifQ.z5Bkx33nVBbUJHI5RTG-MA

// frontend/src/components/Map.js
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';

const Map = ({ onPinDrop }) => {
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYmxhY2thc2gwMTAyIiwiYSI6ImNscWJhMXBhbTI1cGIybG05NTlobmRpNzcifQ.z5Bkx33nVBbUJHI5RTG-MA';

    const initializeMap = () => {
      const initializedMap = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [0, 0],
        zoom: 2,
      });

      initializedMap.on('click', (e) => {
        const { lng, lat } = e.lngLat;
        onPinDrop({ longitude: lng, latitude: lat });
      });

      setMap(initializedMap);
    };

    if (!map) {
      initializeMap();
    }

    return () => {
      if (map) {
        map.off(); // Remove all event listeners
        map.remove();
        setMap(null);
      }
    };
  }, [onPinDrop]);

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

  useEffect(() => {
    if (map) {
      // Clear existing markers
      Array.from(document.getElementsByClassName('mapboxgl-marker')).forEach((marker) => {
        marker.remove();
      });

      notes.forEach((note) => {
        if (note.location && note.location.coordinates) {
          const [longitude, latitude] = note.location.coordinates;
          if (!isNaN(latitude) && !isNaN(longitude)) {
            new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);
          } else {
            console.warn(`Invalid coordinates for note with ID ${note.id}. Skipping.`);
          }
        } else {
          console.warn(`No location information for note with ID ${note.id}. Skipping.`);
        }
      });
    }
  }, [notes, map]);

  return <div ref={mapContainerRef} style={{ height: '500px', width: '100%' }} />;
};

export default Map;
