import React, { useEffect, useState } from 'react';
import './Home.css';

function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData('/api/nrl');
  }, []);

  const fetchData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    setData(data);
  };

  return (
    <div className="App">
      <h1>NRL Fantasy Draft</h1>
      {data ? <p>{data.CLUB}</p> : <p>Loading...</p>}
    </div>
  );
}

export default Home;
