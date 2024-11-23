# RESTful API Documentation

## Overview

This documentation provides an overview of the RESTful API for the `skilled_project`. The API allows clients to perform CRUD operations on resources.

## Base URL

```
http://yourapiurl.com/api
```

## Endpoints

### Users

#### Get All Users

```
GET /users
```

- **Response:**
  - `200 OK`: Returns a list of all users.

#### Get User by ID

```
GET /users/{id}
```

- **Path Parameters:**
  - `id` (string): The ID of the user.
- **Response:**
  - `200 OK`: Returns the user with the specified ID.
  - `404 Not Found`: User not found.

#### Create User

```
POST /users
```

- **Request Body:**
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string",
    "age": "number",
    "address": "string"
  }
  ```
- **Response:**
  - `201 Created`: Returns the created user.
  - `400 Bad Request`: Invalid input.
  - `409 Conflict`: Email already exists.
  - `500 Internal Server Error`: An error occurred on the server.
  - **Example:**
  ```json
  {
    "id": "string",
    "name": "string",
    "email": "string",
    "age": "number",
    "address": "string",
    "createdAt": "string",
    "updatedAt": "string"
  }
  ```

#### Update User

```
PUT /users/{id}
```

- **Path Parameters:**
  - `id` (string): The ID of the user.
- **Request Body:**
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string",
    "age": "number",
    "address": "string"
  }
  ```
- **Response:**
  - `200 OK`: Returns the updated user.
  - `400 Bad Request`: Invalid input.
  - `404 Not Found`: User not found.
  - `500 Internal Server Error`: An error occurred on the server.
  - **Example:**
  ```json
  {
    "id": "string",
    "name": "string",
    "email": "string",
    "age": "number",
    "address": "string",
    "createdAt": "string",
    "updatedAt": "string"
  }
  ```

#### Delete User

```
DELETE /users/{id}
```

- **Path Parameters:**
  - `id` (string): The ID of the user.
- **Response:**
  - `204 No Content`: User deleted successfully.
  - `404 Not Found`: User not found.

## Authentication

### Login

```
POST /auth/login
```

- **Request Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response:**
  - `200 OK`: Returns a JWT token.
  - `401 Unauthorized`: Invalid credentials.

### Register

```
POST /auth/register
```markdown
- **Request Body:**
    ```json
    {
        "name": "string",
        "email": "string",
        "password": "string",
        "profilePicture": "file"
    }
    ```
- **Content-Type:**
    - `multipart/form-data`: Used for uploading files.
```
  ```
- **Response:**
  - `201 Created`: Returns the created user.
  - `400 Bad Request`: Invalid input.

## Error Handling

- `400 Bad Request`: The request could not be understood or was missing required parameters.
- `401 Unauthorized`: Authentication failed or user does not have permissions for the desired action.
- `404 Not Found`: The requested resource could not be found.
- `500 Internal Server Error`: An error occurred on the server.

## Conclusion

This documentation provides the necessary information to interact with the RESTful API for the `skilled_project`. For any further questions, please contact the API support team.

### Projects

#### Get All Projects

```
GET /projects
```

- **Response:**
  - `200 OK`: Returns a list of all projects.

#### Get Project by ID

```
GET /projects/{id}
```

- **Path Parameters:**
  - `id` (string): The ID of the project.
- **Response:**
  - `200 OK`: Returns the project with the specified ID.
  - `404 Not Found`: Project not found.

#### Create Project

```
POST /projects
```

- **Request Body:**
  ```json
  {
    "title": "string",
    "description": "string",
    "status": "string"
  }
  ```
- **Response:**
  - `201 Created`: Returns the created project.
  - `400 Bad Request`: Invalid input.

#### Update Project

```
PUT /projects/{id}
```

- **Path Parameters:**
  - `id` (string): The ID of the project.
- **Request Body:**
  ```json
  {
    "title": "string",
    "description": "string",
    "status": "string"
  }
  ```
- **Response:**
  - `200 OK`: Returns the updated project.
  - `400 Bad Request`: Invalid input.
  - `404 Not Found`: Project not found.

#### Delete Project

```
DELETE /projects/{id}
```

- **Path Parameters:**
  - `id` (string): The ID of the project.
- **Response:**
  - `204 No Content`: Project deleted successfully.
  - `404 Not Found`: Project not found.

### Tasks

#### Get All Tasks

```
GET /tasks
```

- **Response:**
  - `200 OK`: Returns a list of all tasks.

#### Get Task by ID

```
GET /tasks/{id}
```

- **Path Parameters:**
  - `id` (string): The ID of the task.
- **Response:**
  - `200 OK`: Returns the task with the specified ID.
  - `404 Not Found`: Task not found.

#### Create Task

```
POST /tasks
```

- **Request Body:**
  ```json
  {
    "title": "string",
    "description": "string",
    "projectId": "string",
    "status": "string"
  }
  ```
- **Response:**
  - `201 Created`: Returns the created task.
  - `400 Bad Request`: Invalid input.

#### Update Task

```
PUT /tasks/{id}
```

- **Path Parameters:**
  - `id` (string): The ID of the task.
- **Request Body:**
  ```json
  {
    "title": "string",
    "description": "string",
    "status": "string"
  }
  ```
- **Response:**
  - `200 OK`: Returns the updated task.
  - `400 Bad Request`: Invalid input.
  - `404 Not Found`: Task not found.

#### Delete Task

```
DELETE /tasks/{id}
```

- **Path Parameters:**
  - `id` (string): The ID of the task.
- **Response:**
  - `204 No Content`: Task deleted successfully.
  - `404 Not Found`: Task not found.

## Conclusion

This documentation provides the necessary information to interact with the RESTful API for the `skilled_project`. For any further questions, please contact the API support team.
