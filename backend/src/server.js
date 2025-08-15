import express from 'express';
import tableRoutes from "./routes/tableRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import menuRoutes from './routes/menuRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import inventoryRoutes from './routes/inventoryRoutes.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import rateLimiter from './middleware/rateLimiter.js';
import cors from "cors";


dotenv.config();

console.log(process.env.MONGO_URI); // Log the MongoDB URI for debugging

const app = express();
const PORT = process.env.PORT || 5002;




app.use(express.json());// Middleware to parse JSON bodies
app.use(cors());  // Place this before your routes
// app.use(rateLimiter);

// app.use((req, res, next) => {
//   console.log(`Req method is ${req.method} & Req URL is '${req.url}'`);
//   next();
// });

app.use("/api/tables", tableRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/inventory', inventoryRoutes);

connectDB().then( () => {
  app.listen(PORT, () => {
    console.log('Server is running on port 5002', PORT);
  });

});


// mongodb+srv://fahmidakarim2002:gJgOcIkU6yqFQqW8@cluster0.iiofbpt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0