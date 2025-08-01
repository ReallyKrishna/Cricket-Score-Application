import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link, useParams, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const API_URL = 'http://localhost:5000';

function Home() {
  const [matches, setMatches] = useState([]);
  const [teams, setTeams] = useState('');
  const navigate = useNavigate();

  const fetchMatches = async () => {
    const res = await axios.get(`${API_URL}/matches`);
    setMatches(res.data);
  };

  const startMatch = async () => {
    if (!teams.trim()) return;
    await axios.post(`${API_URL}/matches/start`, { teams });
    setTeams('');
    fetchMatches();
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Cricket Scoreboard</h1>
      <div style={styles.inputGroup}>
        <input
          type="text"
          value={teams}
          onChange={e => setTeams(e.target.value)}
          placeholder="Team A vs Team B"
          style={styles.input}
        />
        <button onClick={startMatch} style={styles.button}>Start Match</button>
      </div>
      <ul>
        {matches.map(match => (
          <li key={match.matchId} style={styles.matchItem}>
            <Link to={`/match/${match.matchId}`} style={styles.link}>{match.teams} ({match.status})</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Match() {
  const { id } = useParams();
  const [match, setMatch] = useState({});
  const [commentary, setCommentary] = useState([]);
  const [form, setForm] = useState({ over: '', ball: '', eventType: '' });

  const fetchMatch = async () => {
    const res = await axios.get(`${API_URL}/matches/${id}`);
    setMatch(res.data.match);
    setCommentary(res.data.commentary);
  };

  const addCommentary = async () => {
    const { over, ball, eventType } = form;
    if (!over || !ball || !eventType) return;
    await axios.post(`${API_URL}/matches/${id}/commentary`, { over, ball, eventType });
    setForm({ over: '', ball: '', eventType: '' });
  };

  const updateStatus = async (status) => {
    await axios.patch(`${API_URL}/matches/${id}/${status}`);
    fetchMatch();
  };

  useEffect(() => {
    fetchMatch();
    socket.on(`commentary-${id}`, data => {
      setCommentary(prev => [...prev, data]);
    });
    return () => socket.off(`commentary-${id}`);
  }, [id]);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>{match.teams} ({match.status})</h2>
      <div style={styles.inputGroup}>
        <input
          type="number"
          value={form.over}
          onChange={e => setForm({ ...form, over: e.target.value })}
          placeholder="Over"
          style={styles.inputSmall}
        />
        <input
          type="number"
          value={form.ball}
          onChange={e => setForm({ ...form, ball: e.target.value })}
          placeholder="Ball"
          style={styles.inputSmall}
        />
        <input
          type="text"
          value={form.eventType}
          onChange={e => setForm({ ...form, eventType: e.target.value })}
          placeholder="Event (run, wicket...)"
          style={styles.input}
        />
        <button onClick={addCommentary} style={styles.button}>Add</button>
      </div>
      <div style={styles.buttonGroup}>
        <button onClick={() => updateStatus('pause')} style={styles.button}>Pause</button>
        <button onClick={() => updateStatus('resume')} style={styles.button}>Resume</button>
      </div>
      <h3>Live Commentary</h3>
      <ul>
        {commentary.map((c, i) => (
          <li key={i} style={styles.commentItem}>
            Over {c.over}.{c.ball} - {c.eventType}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/match/:id" element={<Match />} />
      </Routes>
    </Router>
  );
}

const styles = {
  container: { padding: 20, maxWidth: 800, margin: 'auto', backgroundColor: '#f5f5f5', borderRadius: 8 },
  heading: { textAlign: 'center', color: '#333' },
  inputGroup: { display: 'flex', gap: 10, marginBottom: 20 },
  input: { padding: 10, flex: 2, borderRadius: 4, border: '1px solid #ccc' },
  inputSmall: { padding: 10, width: 80, borderRadius: 4, border: '1px solid #ccc' },
  button: { padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' },
  buttonGroup: { display: 'flex', gap: 10, marginBottom: 20 },
  matchItem: { backgroundColor: 'white', padding: 10, marginBottom: 10, borderRadius: 4 },
  commentItem: { backgroundColor: '#fff', padding: 10, marginBottom: 5, borderLeft: '4px solid #3f51b5' },
  link: { textDecoration: 'none', color: '#333', fontWeight: 'bold' },
};
