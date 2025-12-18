"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const dotenv = __importStar(require("dotenv"));
const authRoutes_1 = require("./routes/authRoutes");
const databaseService_1 = require("./services/databaseService");
// Load environment variables
dotenv.config();
const app = (0, fastify_1.default)({ logger: true });
// Initialize database service
const databaseService = new databaseService_1.DatabaseService();
// Register routes
app.get('/', async (request, reply) => {
    return { message: 'Bringlare Account Centre API' };
});
// Register authentication routes
app.register(authRoutes_1.authRoutes, { prefix: '/api/auth' });
// Graceful shutdown
async function closeGracefully(signal) {
    console.log(`Received signal to terminate: ${signal}`);
    try {
        await app.close();
        console.log('Fastify server closed');
    }
    catch (err) {
        console.error('Error closing Fastify server:', err);
    }
    process.exit(0);
}
process.on('SIGINT', () => closeGracefully('SIGINT'));
process.on('SIGTERM', () => closeGracefully('SIGTERM'));
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
