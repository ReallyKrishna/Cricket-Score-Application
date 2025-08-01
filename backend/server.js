const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const matchRoutes = require('./routes/matchRoutes');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());
app.use('/', matchRoutes);

app.set('io', io);

mongoose.connect('mongodb://127.0.0.1:27017/cricketApp')
  .then(() => {
    server.listen(5000, () => console.log('Server running on port 5000'));
  });
