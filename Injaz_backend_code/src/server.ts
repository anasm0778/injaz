import  express from 'express';
import { connectToDatabase } from './services/database.service';
import { carsRouter } from './routes/cars.router';
import { driverRouters } from './routes/driver.routes';
import { carsImagesRouter } from './routes/carImages.route';
import  cors from 'cors';
import { authRouter } from './routes/auth.router';
import { carBrandsRouter } from './routes/carBrands.router';
import { carcapacitiesRouter } from './routes/carcapacities.router';
import { cardocumentsRouter } from './routes/cardocuments.router';
import { carfaqsRouter } from './routes/carfaqs.router';
import { carFeaturesRouter } from './routes/carFeatures.router';
import { carInquiryRouter } from './routes/carInquirys.router';
import { carLocationRouter } from './routes/carlocation.router';
import { carModelRouter } from './routes/carModels.router';
import { carServiceRouter } from './routes/carservices';
import { CategoryesRouter } from './routes/categoryes.router';
import { SettingsRouter } from './routes/setting.route';
import { bannersRouter } from './routes/banner';
import carRoutes from './routes/carRoutes';
import * as dotenv from 'dotenv';
import * as log4js from 'log4js';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as fs from 'fs';
import  morgan from 'morgan';
dotenv.config();

// Validate critical environment variables
const requiredEnvVars = ['DB_CONN_STRING', 'DB_NAME'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);
if (missingEnvVars.length > 0) {
  console.error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
  console.error('Please create a .env file with all required variables');
  process.exit(1);
}

const port = normalizePort(process.env.PORT || '4001');

const app = express();

log4js.configure({
  appenders: { injazAdmin: { type: 'file', filename: 'injaz-admin.log' } },
  categories: { default: { appenders: ['injazAdmin'], level: 'info' } },
});

const logger = log4js.getLogger('injazAdmin');

const corsOptions = {
  origin: process.env.CORS_ORIGINS 
    ? process.env.CORS_ORIGINS.split(',').map(origin => origin.trim())
    : ['http://localhost:3000', 'http://localhost:3001'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}

// eslint-disable-next-line 
app.use(morgan('dev'));

app.use(cors(corsOptions));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

// Ensure required directories exist
const uploadsDir = path.join(__dirname, '../uploads');
const publicBannersDir = path.join(__dirname, 'public/banners');
const publicUploadsDir = path.join(__dirname, 'public/uploads');

[uploadsDir, publicBannersDir, publicUploadsDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});

// Serve static files from public directory
app.use('/banners', express.static(path.join(__dirname, 'public/banners')));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

connectToDatabase()
  .then(() => {
    app.use(
      '/user',
      carsRouter,
      carBrandsRouter,
      authRouter,
      carcapacitiesRouter,
      cardocumentsRouter,
      carfaqsRouter,
      carFeaturesRouter,
      carsImagesRouter,
      carInquiryRouter,
      carLocationRouter,
      carModelRouter,
      carServiceRouter,
      CategoryesRouter,
      driverRouters
    );

    app.use('/driver', driverRouters);

    app.use('/admin', SettingsRouter, bannersRouter);
    
    app.use('/testing', carRoutes)

    // Root route to handle GET / requests
    app.get('/', (req, res) => {
      res.status(200).json({
        message: 'Injaz Rent A Car API Server',
        status: 'running',
        version: '1.0.0',
        endpoints: {
          cars: '/user',
          admin: '/admin',
          driver: '/driver',
          testing: '/testing'
        }
      });
    });

    // 404 handler - must be after all routes
    app.use((req, res) => {
      res.status(404).json({
        status: 404,
        message: 'Route not found',
        path: req.originalUrl
      });
    });

    // Global error handling middleware - must be last
    app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
      logger.error('Unhandled error:', err);
      console.error('Unhandled error:', err);
      
      // Handle multer errors
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          status: 400,
          message: 'File too large. Maximum size is 50MB.'
        });
      }
      
      if (err.code === 'LIMIT_UNEXPECTED_FILE') {
        return res.status(400).json({
          status: 400,
          message: 'Unexpected file field'
        });
      }

      // Default error response
      res.status(err.status || 500).json({
        status: err.status || 500,
        message: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
      });
    });

    app.listen(port, () => {
      logger.info(`Server started at http://localhost:${port}`);
      console.log(`Server started at http://localhost:${port}`);
    });
  })
  .catch((error: Error) => {
    logger.error('Database connection failed ', error);
    console.error('Database connection failed:', error);
    process.exit(1);
  });

function normalizePort(val: string): number | string | boolean {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}

// Global process-level error handlers to prevent crashes
process.on('uncaughtException', (error: Error) => {
  console.error('UNCAUGHT EXCEPTION! 💥 Shutting down gracefully...');
  console.error('Error:', error.message);
  console.error('Stack:', error.stack);
  logger.error('Uncaught Exception:', error);
  
  // Give time for logging before exit
  setTimeout(() => {
    process.exit(1);
  }, 1000);
});

process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
  console.error('UNHANDLED REJECTION! 💥');
  console.error('Reason:', reason);
  console.error('Promise:', promise);
  logger.error('Unhandled Rejection:', reason);
  
  // Don't exit on unhandled rejection, just log it
  // This prevents crashes but logs for debugging
});

process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
  logger.info('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('👋 SIGINT RECEIVED. Shutting down gracefully');
  logger.info('SIGINT received, shutting down gracefully');
  process.exit(0);
});
