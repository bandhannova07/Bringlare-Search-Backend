# Bringlare Backend

This is the backend service for the Bringlare platform, configured for deployment on Render.

## Deployment to Render

This application is configured for deployment to Render with a PostgreSQL database.

### Prerequisites
- A Render account
- This repository forked to your GitHub account

### Deployment Steps

1. Fork this repository to your GitHub account
2. Log in to your Render account
3. Create a new Web Service:
   - Click "New" → "Web Service"
   - Connect your GitHub account when prompted
   - Select your forked repository
   - Render will automatically detect this is a Node.js project
4. Configure the service:
   - Name: `bringlare-backend`
   - Environment: `Node`
   - Root Directory: `backend`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Plan: Select your preferred plan (free tier available)
5. Add Environment Variables:
   - `JWT_SECRET` - Generate a strong random string (at least 32 characters)
   - `REFRESH_TOKEN_SECRET` - Generate another strong random string (at least 32 characters)
6. Create a PostgreSQL Database:
   - In the same service or separately, create a PostgreSQL database
   - The database connection details will be automatically provided to your application
7. Click "Create Web Service"

### Automatic Processes

Render will automatically:
- Install dependencies using `npm install`
- Build the TypeScript application with `npm run build`
- Run database migrations through the postinstall script
- Start the server with `npm start`

### Environment Variables

The following environment variables are automatically set by Render:
- `DATABASE_URL` - PostgreSQL connection string
- `PORT` - Server port (defaults to 3000)
- Database connection details (host, port, username, password, database name)

Additional variables you need to set manually:
- `JWT_SECRET` - For JWT token signing
- `REFRESH_TOKEN_SECRET` - For refresh token signing

## Local Development

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

## API Endpoints
- GET `/` - Health check endpoint
- POST `/api/auth/register` - User registration
- POST `/api/auth/login` - User login