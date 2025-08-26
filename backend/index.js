const express = require('express');
const cors = require('cors');
const mainRoutes = require('./routes/mainRoutes');
const tavilyRoutes = require('./routes/tavilyRoutes');
const authRoutes = require('./routes/authRoutes');
const GVRoutes = require('./routes/GVRoutes');
const groqRoutes = require('./routes/groqRoutes');
const scoreRoutes = require('./routes/scoreRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', mainRoutes);
app.use('/tavily', tavilyRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', GVRoutes);
app.use('/groq', groqRoutes);
app.use('/api/scores', scoreRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});