import React, { useState } from 'react';
import { controlRelay } from '../api/device';

const RelayControl = ({ id }) => {
  const [state, setState] = useState('OFF');

  const toggle = async () => {
    const newState = state === 'ON' ? 'OFF' : 'ON';
    try {
      await controlRelay(id, newState);
      setState(newState);
    } catch (err) {
      console.error('Failed to toggle relay:', err);
    }
  };

  return (
    <div style={{ margin: '10px', border: '1px solid #ccc', padding: '10px' }}>
      <p>Relay {id}: {state}</p>
      <button onClick={toggle}>
        {state === 'ON' ? 'Turn OFF' : 'Turn ON'}
      </button>
    </div>
  );
};

export default RelayControl;
