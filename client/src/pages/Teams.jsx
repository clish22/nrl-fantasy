import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

function Teams() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const getTeams = async () => {
      try {
        const response = await axios.get('http://localhost:3001/teams');
        if (response.status === 200) {
          setTeams(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getTeams();
  }, []);

  return (
    <>
      <h1>NRL Fantasy Draft - Teams</h1>
      <Table className="" striped bordered hover>
        <thead>
          <tr>
            <th>Team Name</th>
            <th>URL</th>
            <th>Founded</th>
            <th>Members</th>
          </tr>
        </thead>
        <tbody>
          {teams &&
            teams.map((team) => {
              return (
                <tr key={team._id}>
                  <td>{team.teamName}</td>
                  <td>
                    <a href={team.nrlURL}>{team.nrlURL}</a>
                  </td>
                  <td>{team.founded}</td>
                  <td>{team.members}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </>
  );
}

export default Teams;
