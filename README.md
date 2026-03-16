# Users App Task Backend

REST API for managing users.

---

## Requirements

- Node.js 18+ (developed with Node.js v22) https://nodejs.org/en
- npm (is included in the node.js installation)

# Installation

Clone the repository:

git clone https://github.com/lkai1/backend_task.git

Navigate to the project:

cd backend_task

Install dependencies:

npm install

---

# Running the Server

Start the backend server:

npm start

The API will run on:

http://localhost:3001

---

# Running Tests

Run backend tests with:

npm test

Tests are written using:

- Jest
- Supertest

The tests cover:

- Fetching users
- Creating a user
- Updating a user
- Deleting a user
- Validation errors

---

# API Endpoints

GET /api/users  
Returns all users.

POST /api/users  
Creates a new user.

PUT /api/users/:id  
Updates a user.

DELETE /api/users/:id  
Deletes a user.

---

# Example User Object

{
  "name": "Test User",
  "username": "testuser",
  "email": "test@test.com",
  "phone": "123",
  "website": "test.com",
  "address": {
    "street": "Street",
    "suite": "Suite",
    "city": "City",
    "zipcode": "12345",
    "geo": { "lat": "10", "lng": "20" }
  },
  "company": {
    "name": "Company",
    "catchPhrase": "Phrase",
    "bs": "BS"
  }
}