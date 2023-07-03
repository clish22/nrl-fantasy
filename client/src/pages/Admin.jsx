import React, { useState } from 'react';
import axios from 'axios';

function Admin() {
  const [teamName, setTeamName] = useState('');
  const [url, setUrl] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitSuccessDetails, setSubmitSuccessDetails] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { teamName: teamName, url: url };
    try {
      const response = await axios.post('http://localhost:3001/admin', data);
      if (response.status === 200) {
        setSubmitSuccess(true);
        setSubmitSuccessDetails(response.data);
        setTeamName('');
        setUrl('');
        setTimeout(() => {
          setSubmitSuccess(false);
          setSubmitSuccessDetails({});
        }, 5000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>Admin</h1>
      <p className="text-start fs-4">Add a new team</p>
      <form className="text-start" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="team-name">Team Name: </label>
          <input
            id="team-name"
            type="text"
            placeholder="Team Name"
            className="mx-2"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="established">URL:</label>
          <input
            id="url"
            type="text"
            placeholder="URL"
            className="mx-2"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {submitSuccess && (
        <p className="text-success">
          Team added successfully with database ID: {submitSuccessDetails.insertedId}!
        </p>
      )}
    </>
  );
}

export default Admin;
