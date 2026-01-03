import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './Config/db.js';

// 1. IMPORT BOTH ROUTES (Ensure the case matches your folder name 'Routes')
import customerRoutes from './routes/customerRoutes.js';
import userRoutes from './routes/userRoutes.js'; 

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// 2. REGISTER BOTH ROUTES
app.use('/api/customers', customerRoutes);
app.use('/api/users', userRoutes); // THIS IS THE MISSING PIECE causing the 404

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));