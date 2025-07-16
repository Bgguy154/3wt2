const dotenv = require('dotenv');
dotenv.config();
console.log('✅ MONGO_URI loaded:', process.env.MONGO_URI);
 // <-- Debug line

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', userRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ MongoDB Connected');
  app.listen(process.env.PORT, () => {
    console.log(`✅ Server running on port ${process.env.PORT}`);
  });
}).catch((err) => console.log('❌ MongoDB error:', err));
