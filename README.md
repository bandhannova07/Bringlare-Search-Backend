# Bringlare Backend

This is the backend service for the Bringlare platform.

## Getting Started

### Prerequisites
- Node.js
- PostgreSQL

### Installation
1. Clone the repository
2. Navigate to the `backend` directory
3. Install dependencies:
   ```
   npm install
   ```

### Environment Setup
Create a `.env` file in the `backend` directory with the following variables:
```
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=bringlare_account_centre
JWT_SECRET=your_jwt_secret_here
REFRESH_TOKEN_SECRET=your_refresh_token_secret_here
DATABASE_URL=postgresql://username:password@localhost:5432/database_name
```

### Database Setup
Run the following commands to set up the database:
```
npx prisma migrate dev
```

### Running the Application
```
npm run dev
```

## Deployment to Render

This application is configured for deployment to Render with a PostgreSQL database.

1. Fork this repository to your GitHub account
2. Create a new Web Service on Render
3. Connect your forked repository
4. Configure the following environment variables in Render:
   - `JWT_SECRET` - Your JWT secret key
   - `REFRESH_TOKEN_SECRET` - Your refresh token secret key
5. The `render.yaml` file in the root directory defines the services and will be automatically used by Render
6. Click "Create Web Service"

The deployment will automatically:
- Build the TypeScript application
- Run database migrations
- Start the server

## API Endpoints
- GET `/` - Health check endpoint
- POST `/api/auth/register` - User registration
- POST `/api/auth/login` - User login