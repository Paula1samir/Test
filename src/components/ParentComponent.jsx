import React, { useState } from 'react';
import LocationPicker from './LocationPicker';

const ParentComponent = () => {
  // State to hold latitude and longitude
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  return (
    <div>
      <h1>Pick a Location</h1>
      
      {/* Pass setLat and setLng as setValue1 and setValue2 */}
      <LocationPicker setValue1={setLat} setValue2={setLng} />

      {/* Display the selected latitude and longitude */}
      {lat && lng && (
        <div>
          <p>Selected Latitude: {lat}</p>
          <p>Selected Longitude: {lng}</p>
        </div>
      )}
    </div>
  );
};

export default ParentComponent;
