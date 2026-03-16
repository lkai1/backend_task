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

## GET /api/users
Returns all users.

**Response 200**
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "username": "johndoe",
    "email": "john@example.com",
    "phone": "123-456-7890",
    "website": "johndoe.com",
    "address": {
      "street": "Main St",
      "suite": "Apt 1",
      "city": "Springfield",
      "zipcode": "12345",
      "geo": { "lat": "40.7128", "lng": "-74.0060" }
    },
    "company": {
      "name": "Acme Corp",
      "catchPhrase": "Making things work",
      "bs": "synergize scalable solutions"
    }
  }
]
```

## POST /api/users
Creates a new user.

**Request body**
```json
{
  "name": "John Doe",
  "username": "johndoe",
  "email": "john@example.com",
  "phone": "123-456-7890",
  "website": "johndoe.com",
  "address": {
    "street": "Main St",
    "suite": "Apt 1",
    "city": "Springfield",
    "zipcode": "12345",
    "geo": { "lat": "40.7128", "lng": "-74.0060" }
  },
  "company": {
    "name": "Acme Corp",
    "catchPhrase": "Making things work",
    "bs": "synergize scalable solutions"
  }
}
```

**Responses**
- `201` User created successfully
- `400` Invalid or missing fields

## PUT /api/users/:id
Updates an existing user.

**Request body**
```json
{
  "name": "John Doe",
  "username": "johndoe",
  "email": "john@example.com",
  "phone": "123-456-7890",
  "website": "johndoe.com",
  "address": {
    "street": "Main St",
    "suite": "Apt 1",
    "city": "Springfield",
    "zipcode": "12345",
    "geo": { "lat": "40.7128", "lng": "-74.0060" }
  },
  "company": {
    "name": "Acme Corp",
    "catchPhrase": "Making things work",
    "bs": "synergize scalable solutions"
  }
}
```

**Response 200**
```json
{
  "id": 1,
  "name": "John Doe",
  "username": "johndoe",
  "email": "john@example.com",
  "phone": "123-456-7890",
  "website": "johndoe.com",
  "address": {
    "street": "Main St",
    "suite": "Apt 1",
    "city": "Springfield",
    "zipcode": "12345",
    "geo": { "lat": "40.7128", "lng": "-74.0060" }
  },
  "company": {
    "name": "Acme Corp",
    "catchPhrase": "Making things work",
    "bs": "synergize scalable solutions"
  }
}
```

**Responses**
- `200` User updated successfully
- `400` Invalid or missing fields
- `404` User not found

## DELETE /api/users/:id
Deletes a user by ID.

**Responses**
- `204` User deleted successfully
- `400` Invalid user ID
- `404` User not found

All endpoints may return `500` in case of an internal server error.
