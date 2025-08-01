#  Cricket Scoring App

A full-stack real-time cricket scoreboard built with **Node.js**, **MongoDB**, **React**, and **Socket.IO**. Users can start matches, add ball-by-ball commentary, and view real-time match updates without refreshing the page.

---

##  Features

* Start a new cricket match (auto-generated 4-digit Match ID)
* View ongoing matches
* Add ball-by-ball commentary
* Real-time updates using WebSockets (Socket.IO)
* Pause/Resume a match
* Clean UI using only plain CSS (no external UI libraries)

---

##  Tech Stack

### Backend:

* Node.js
* Express.js
* MongoDB (Mongoose)
* Socket.IO

### Frontend:

* React.js
* React Router
* Axios
* Socket.IO Client

---

##  Project Structure

```
cricket-scoring-app/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── cricket-scoreboard/
│   ├── public/
│   └── src/
│       ├── App.js
│       └── index.js
```

---

##  Getting Started

###  Prerequisites

* Node.js installed
* MongoDB running locally or on Atlas

###  Backend Setup

```bash
cd backend
npm install
npm start
```

Backend runs on: `http://localhost:5000`

###  Frontend Setup

```bash
cd cricket-scoreboard
npm install
npm start
```

Frontend runs on: `http://localhost:3000`

---

##  API Endpoints

### `POST /matches/start`

Start a new match.

```json
{
  "teams": "India vs Australia"
}
```

### `POST /matches/:id/commentary`

Add commentary to a match.

```json
{
  "over": 10,
  "ball": 2,
  "eventType": "Four"
}
```

### `GET /matches/:id`

Get match details and all commentary.

### `GET /matches`

Get all ongoing matches.

### `PATCH /matches/:id/pause`

Pause a match.

### `PATCH /matches/:id/resume`

Resume a paused match.

---

##  UI Overview

* Homepage: Start a match, view list of ongoing matches
* Match Page: Add commentary, pause/resume match, view live updates

---

##  Constraints

* Plain CSS only (no Tailwind or Material UI)
* Match ID must be 4-digit auto-incremented
* Commentary updates must be in real-time using Socket.IO

---

##  Bonus Features

* Pause/Resume match state

---

##  License

This project is open-source and free to use.

---

##  Want Help?

Feel free to raise issues or contribute to this project!
