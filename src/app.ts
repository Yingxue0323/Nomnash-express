import express from 'express';
import { Express, Request, Response} from 'express';
import { connectDB } from './configs/db';
import dotenv from 'dotenv';
import logger from './utils/logger';
import { registerRoutes } from './routes/index';
import { errorHandler } from './middlewares/errorHandler';
import path from 'path';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// middleware
app.use(express.json());

// static files
// app.use('/public', express.static(path.join(__dirname, 'public')));

// connect to database
connectDB();

// register routes
registerRoutes(app);

// error handler
app.use(errorHandler);

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});

export default app;