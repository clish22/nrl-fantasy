//react component for the home page

import React from 'react';
import './Home.css';

//react component for the home page
function Home() {
  return (
    <div className="App">
      <h1>NRL Fantasy Draft</h1>
      <p id="bio">
        Welcome to the NRL Fantasy Draft. This is a web application that allows you to draft your
        own NRL fantasy team. You can choose from all the players in the NRL and draft them into
        your team. You can also view the teams of other users and compare them to your own team. You
        can also view the stats of all the players in the NRL.
      </p>
    </div>
  );
}

export default Home;
