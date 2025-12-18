"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = require("./routes/authRoutes");
const databaseService_1 = require("./services/databaseService");
// Load environment variables
dotenv_1.default.config();
const app = (0, fastify_1.default)({ logger: true });
// Initialize database service
const databaseService = new databaseService_1.DatabaseService();
// Register routes
app.get('/', async (request, reply) => {
    return { message: 'Bringlare Account Centre API' };
});
// Register authentication routes
app.register(authRoutes_1.authRoutes, { prefix: '/api/auth' });
// Start the server
const start = async () => {
    try {
        // Initialize database connection
        await databaseService.initialize();
        await app.listen({ port: parseInt(process.env.PORT || '3000'), host: '0.0.0.0' });
        console.log(`Server running at http://localhost:${process.env.PORT || 3000}`);
    }
    catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};
start();
