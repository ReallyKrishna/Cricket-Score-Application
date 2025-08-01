const Match = require('../models/Match');
const Commentary = require('../models/Commentary');
const Counter = require('../models/Counter');

async function getNextMatchId() {
  const counter = await Counter.findOneAndUpdate(
    { key: 'matchId' },
    { $inc: { count: 1 } },
    { new: true, upsert: true }
  );
  return counter.count;
}

exports.startMatch = async (req, res) => {
  const { teams } = req.body;
  const matchId = await getNextMatchId();

  const match = new Match({ matchId, teams });
  await match.save();

  res.status(201).json(match);
};

exports.addCommentary = async (req, res) => {
  const matchId = parseInt(req.params.id);
  const { over, ball, eventType } = req.body;

  const commentary = new Commentary({ matchId, over, ball, eventType });
  await commentary.save();

  req.app.get('io').emit(`commentary-${matchId}`, commentary);

  res.status(201).json(commentary);
};

exports.getMatchDetails = async (req, res) => {
  const matchId = parseInt(req.params.id);
  const match = await Match.findOne({ matchId });
  const commentary = await Commentary.find({ matchId }).sort({ timestamp: 1 });

  res.json({ match, commentary });
};

exports.pauseMatch = async (req, res) => {
  const match = await Match.findOneAndUpdate(
    { matchId: req.params.id },
    { status: 'paused' },
    { new: true }
  );
  res.json(match);
};

exports.resumeMatch = async (req, res) => {
  const match = await Match.findOneAndUpdate(
    { matchId: req.params.id },
    { status: 'ongoing' },
    { new: true }
  );
  res.json(match);
};

exports.getAllMatches = async (req, res) => {
  const matches = await Match.find({});
  res.json(matches);
};
