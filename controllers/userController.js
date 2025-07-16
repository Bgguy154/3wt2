const User = require('../models/user');
const ClaimHistory = require('../models/ClaimHistory');
const mongoose = require('mongoose'); // Import mongoose to use isValidObjectId

exports.getUsers = async (req, res) => {
  const users = await User.find().sort({ totalPoints: -1 });
  res.json(users);
};

exports.addUser = async (req, res) => {
  const user = new User({ name: req.body.name });
  await user.save();
  res.json(user);
};

exports.claimPoints = async (req, res) => {
  const { userId } = req.params;
  const points = Math.floor(Math.random() * 10) + 1;

  let user;
  // Check if userId is a valid ObjectId
  if (mongoose.Types.ObjectId.isValid(userId)) {
    user = await User.findById(userId);
  } else {
    // If not a valid ObjectId, assume it's a username
    user = await User.findOne({ name: userId });
  }
  
  if (!user) return res.status(404).json({ msg: 'User not found' });

  user.totalPoints += points;
  await user.save();

  const history = new ClaimHistory({ userId: user._id, claimedPoints: points }); // Use user._id here
  await history.save();

  res.json({ user, claimedPoints: points });
};

exports.getLeaderboard = async (req, res) => {
  const users = await User.find().sort({ totalPoints: -1 });
  res.json(users.map((user, index) => ({
    name: user.name,
    totalPoints: user.totalPoints,
    rank: index + 1
  })));
};

exports.getHistory = async (req, res) => {
  const history = await ClaimHistory.find().populate('userId');
  res.json(history);
};