import React, { useEffect, useState } from 'react';

function App() {
  const [apiStatus, setApiStatus] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/health`)
      .then(res => res.json())
      .then(data => setApiStatus(data.status))
      .catch(() => setApiStatus('error'));
  }, []);

  return (
    <div>
      <h1>Portfolio</h1>
      <p>Backend status: {apiStatus || 'checking...'}</p>
    </div>
  );
}

export default App;