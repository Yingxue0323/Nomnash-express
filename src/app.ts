import express from 'express';
import { Express, Request, Response} from 'express';
import { connectDB } from './configs/db';
import dotenv from 'dotenv';
import logger from './utils/logger';
import { registerRoutes } from './routes/index';
import { errorHandler } from './middlewares/errorHandler';
import path from 'path';
import session from 'express-session';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import authRoute from './routes/authRoute';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(helmet());
app.use(morgan('dev'));

// Session config
app.use(session({
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  }
}));

// static files
// app.use('/public', express.static(path.join(__dirname, 'public')));

// connect to database
// connectDB();

// register routes
registerRoutes(app);

// error handler
app.use(errorHandler);

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});

export default app;