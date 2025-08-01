import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function Match() {
  const { id } = useParams();
  const [match, setMatch] = useState({});
  const [commentary, setCommentary] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/matches/${id}`).then(res => {
      setMatch(res.data.match);
      setCommentary(res.data.commentary);
    });

    socket.on(`commentary-${id}`, (data) => {
      setCommentary(prev => [...prev, data]);
    });

    return () => socket.off(`commentary-${id}`);
  }, [id]);

  return (
    <div>
      <h2>{match.teams} ({match.status})</h2>
      <h3>Live Commentary</h3>
      <ul>
        {commentary.map((c, index) => (
          <li key={index}>
            Over {c.over}.{c.ball} - {c.eventType}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Match;
