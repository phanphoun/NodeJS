# Node.js Authentication API

A secure, production-ready REST API for user authentication with JWT tokens, built with Node.js, Express, and MySQL.

## Features

- **Secure Authentication**: JWT-based authentication with strong cryptographic secrets
- **Input Validation**: Comprehensive validation for emails, passwords, and user data
- **Rate Limiting**: Protection against brute force attacks
- **Password Security**: Bcrypt hashing with salt rounds
- **Role-Based Access Control**: Support for user, admin, and moderator roles
- **Database Connection Pooling**: Optimized database performance
- **Error Handling**: Proper error logging and secure error responses

## Technology Stack

- **Runtime**: Node.js with ES6 modules
- **Framework**: Express.js
- **Database**: MySQL with connection pooling
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: Bcrypt
- **Security**: Rate limiting, input validation, CORS

## API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| `POST` | `/register` | Register a new user | Public |
| `POST` | `/login` | Authenticate user and get token | Public |
| `POST` | `/logout` | Logout user | Token required |
| `GET` | `/profile` | Get user profile | Token required |

## Request/Response Formats

### Register User

**Request:**
```json
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "StrongPass123",
  "role": "user" // Optional: user, admin, moderator (default: user)
}
```

**Response (201):**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### Login User

**Request:**
```json
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "StrongPass123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### Get Profile

**Request:**
```json
GET /api/auth/profile
Authorization: Bearer <jwt_token>
```

**Response (200):**
```json
{
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

## Validation Rules

### Password Requirements
- Minimum 8 characters
- At least one lowercase letter
- At least one uppercase letter
- At least one number

### Email Requirements
- Valid email format (regex validation)
- Automatically converted to lowercase
- Must be unique in the database

### Username Requirements
- 3-30 characters
- Cannot be empty
- Automatically trimmed

## Security Features

### Rate Limiting
- **Global**: 100 requests per 15 minutes per IP
- **Authentication**: 5 auth requests per 15 minutes per IP
- Exceeding limits returns HTTP 429 status

### JWT Security
- 64-byte cryptographically secure secret
- 24-hour token expiration
- Secure token verification

### Password Security
- Bcrypt hashing with 10 salt rounds
- Passwords never stored in plain text
- Strong password requirements enforced

## Database Setup

### Prerequisites
- MySQL 5.7+ or MariaDB 10.2+
- Node.js 16+ with ES6 module support

### Database Configuration

1. Create the database:
```sql
CREATE DATABASE ecommerce;
```

2. Create the users table:
```sql
USE ecommerce;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin', 'moderator') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=ecommerce
JWT_SECRET=your_64_byte_cryptographically_secure_secret_here
```

## Installation & Setup

1. **Clone the repository:**
```bash
git clone <repository-url>
cd nodeJs/backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure environment:**
```bash
cp .env.example .env
# Edit .env with your database credentials
```

4. **Start the server:**
```bash
# Development
npm run dev

# Production
node src/server.js
```

The server will start on `http://localhost:5000`

## API Usage Examples

### Using curl

**Register a user:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "StrongPass123"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "StrongPass123"
  }'
```

**Get profile (with token):**
```bash
curl -X GET http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer <your_jwt_token>"
```

### Using JavaScript/Fetch

```javascript
// Register
const register = async () => {
  const response = await fetch('http://localhost:5000/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: 'testuser',
      email: 'test@example.com',
      password: 'StrongPass123'
    })
  });
  
  const data = await response.json();
  console.log(data);
};

// Login
const login = async () => {
  const response = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: 'test@example.com',
      password: 'StrongPass123'
    })
  });
  
  const data = await response.json();
  const token = data.token;
  
  // Use token for authenticated requests
  const profileResponse = await fetch('http://localhost:5000/api/auth/profile', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  const profileData = await profileResponse.json();
  console.log(profileData);
};
```

## Error Handling

### Common Error Responses

**400 Bad Request:**
```json
{
  "message": "Password must be at least 8 characters long"
}
```

**401 Unauthorized:**
```json
{
  "message": "Invalid credentials"
}
```

**403 Forbidden:**
```json
{
  "message": "Forbidden"
}
```

**429 Too Many Requests:**
```json
{
  "message": "Too many authentication attempts, please try again later."
}
```

**500 Internal Server Error:**
```json
{
  "message": "Internal server error"
}
```

## Development

### Project Structure

```
backend/
src/
  controllers/     # Request handlers
  middleware/      # Custom middleware
  models/         # Database models
  routes/         # API routes
  utils/          # Utility functions
  server.js       # Server entry point
db.js            # Database configuration
.env             # Environment variables
package.json     # Dependencies and scripts
```

### Available Scripts

```bash
npm run dev      # Start with nodemon for development
node src/server.js  # Start production server
```

## Security Considerations

- **Environment Variables**: Never commit `.env` file to version control
- **Database Credentials**: Use strong, unique database passwords
- **JWT Secret**: Use cryptographically secure secrets (64+ bytes)
- **HTTPS**: Use HTTPS in production environments
- **Input Validation**: All inputs are validated and sanitized
- **Rate Limiting**: Prevents brute force attacks
- **Error Messages**: Generic error messages prevent information leakage

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Support

For issues and questions, please open an issue on the GitHub repository.
