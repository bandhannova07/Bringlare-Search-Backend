import fastify from 'fastify';
import dotenv from 'dotenv';
import { authRoutes } from './routes/authRoutes';
import { DatabaseService } from './services/databaseService';

// Load environment variables
dotenv.config();

const app = fastify({ logger: true });

// Initialize database service
const databaseService = new DatabaseService();

// Register routes
app.get('/', async (request, reply) => {
  return { message: 'Bringlare Account Centre API' };
});

// Register authentication routes
app.register(authRoutes, { prefix: '/api/auth' });

// Start the server
const start = async () => {
  try {
    // Initialize database connection
    await databaseService.initialize();
    
    await app.listen({ port: parseInt(process.env.PORT || '3000'), host: '0.0.0.0' });
    console.log(`Server running at http://localhost:${process.env.PORT || 3000}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();