import React, { useEffect, useState } from 'react';
import './Home.css';

function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/nrl');
      const data = await response.json();
      setData(data);
    }
    fetchData();
    console.log(data);
  }, []);

  return (
    <div className="App">
      <h1>NRL Fantasy Draft</h1>
      <p id="bio">
        Welcome to the NRL Fantasy Draft. This is a web application that allows you to draft your
        own NRL fantasy team. You can choose from all the players in the NRL and draft them into
        your team. You can also view the teams of other users and compare them to your own team. You
        can also view the stats of all the players in the NRL.
      </p>
      <h2>2023 NRL Ladder</h2>
      {data ? <p>{data.message}</p> : <p>Loading...</p>}
    </div>
  );
}

export default Home;
