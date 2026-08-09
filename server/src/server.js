import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import resourceRoutes from './routes/resourceRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get('/', (req, res) => {
  res.json({ message: 'Community Resource Locator API is running 🚀' });
});

app.use('/api/resources', resourceRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});