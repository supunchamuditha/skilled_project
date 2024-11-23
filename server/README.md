# Skilled Job Protal API Documentation

---

## Table of Contents

1. [Overview](#overview)
2. [Technologies Used](#technologies-used)
3. [Features](#features)
4. [Setup and Installation](#setup-and-installation)
5. [API Endpoints](#api-endpoints)
   - [User Registration](#user-registration)
   - [Company Registration](#company-registration)
   - [User Login](#user-login)
   - [Company Login](#company-login)
   - [Account Verification](#account-verification)
   - [Resend OTP](#resend-otp)
   - [Logout](#logout)
6. [Testing](#testing)
   - [Postman Scripts](#postman-scripts)
   - [Swagger UI](#swagger-ui)
   - [Mocha/Chai Tests](#mocha-chai)
7. [Notes](#notes)
8. [Conclusion](#conclusion)

---

## Overview

**Skilled Job Portal** API is designed to facilitate job seekers and employers by providing seamless functionalities for registration, authentication, job postings, and application management.

---

## Technologies Used

- Backend: **Node.js, Express.js**
- Database: **MySQL**
- Authentication: **JWT, Google reCAPTCHA**
- Testing: **Postman, Swagger UI, Macha/Chai**

---

## Setup and Installation

### Prerequisites

1. Node.js and npm installed
2. MySql database setup
3. Git installed

### Steps

1. Clone the repository:

```bash
  git clone https://github.com/pasiths/skilled_project.git
  cd skilled_project
```

2. Install dependencies:

```bash
  npm install
```

3. Configure environment variables in a `.env` file:

```bash
  IP = <ip> // IP address of the server
  PORT = <port> // Port number of the server

  DB_HOST = <host> // Database host
  DB_USER = <user> // Database user
  DB_PASSWORD = <password> // Database password
  DB_NAME = <database> // Database name

  EMAIL_USER = <email> // Email address
  EMAIL_PASS = <password> // Email password

  TWILIO_SID = <sid> // Twilio account SID
  TWILIO_AUTH_TOKEN = <auth_token> // Twilio account auth token
  TWILIO_PHONE_NUMBER = <phone_number> // Twilio phone number

  VERIFICATION_URL = <url> // Verification URL

  SECRET_KEY = <secret_key> // Secret key
  JWT_SECRET = <jwt_secret> // JWT secret
```

5. Run database migrations:

```bash
  npx sequelize-cli db:migrate
```

7. Start the server:

```bash
  npm start
```

9. Access the API at `http://localhost:<PORT>`.

---

## API Endpoints

1. Registration:

   - User
     - **Endpoint:**
       `POST /api/auth/user`
     - **Headers:**
       `Content-Type: multipart/form-data`
     - **Request Body:**
       ```bash
       {
        "full_name": "John Doe",
        "email": "john.doe@example.com",
        "password": "SecureP@ssw0rd",
        "phone_num": "1234567890",
        "location": "New York, USA",
        "gender": "Male",
        "profile_pic": "profile_pic.jpg",
        "cv": "john_doe_cv.pdf"
       }
       ```
     - **Response:**
       - **Success**(`200 OK`):
         ```bash
         {
             "message": "Company created successfully",
             "company": {
                 "date": "2024-11-23T16:31:12.125Z",
                 "id": 1,
                 "full_name": "John Doe",
                 "email": "john.doe@example.com",
                 "phone_num": "1234567890",
                 "location": "New York",
                 "gender": "Male",
                 "cv": "john_doe_cv.pdf",
                 "cv_type": "application/pdf",
                 "profile_pic": "profile_pic.jpg",
                 "profile_pic_type": "image/webp",
                 "isVerified": "false",
                 "status": 1
             }
         }
         ```
       - **Error** (`400 Bad Request`)
         ```bash
         {
           "success": false,
           "message": "Internal server error"
         }
         ```
   - Company

     - **Endpoint:**
       `POST /api/auth/company`
     - **Headers:**
       `Content-Type: multipart/form-data`
     - **Request Body:**

       ```bash
       {
        "name": "John Doe",
        "email": "john.doe@example.com",
        "phone_num": "1234567890",
        "location": "New York, USA",
        "industry": "Technology",
        "password": "SecureP@ssw0rd",
        "logo": "logo.jpg"
       }


       ```

     - **Response:**

       - **Success**(`200 OK`):

         ```bash
         {
          "message": "Company created successfully",
          "company":{
            "date": "2024-11-23T16:31:12.125Z",
            "id": 1,
            "name": "John Doe",
            "email": "john.doe@example.com",
            "phone_num": "1234567890",
            "location": "New York, USA",
            "industry": "Technology",
            "password": "SecureP@ssw0rd",
            "logo": "logo.jpg",
            "logo_type": "image/webp",
            "isVerified": "false",
            "status": 1
          }
         }
         ```

       - **Error** (`400 Bad Request`)
         ```bash
         {
           "success": false,
           "message": "Internal server error"
         }
         ```

2. Login:
   - User
   - Company
3. Account Verification:
   - User
   - Company
4. Resend OTP:
   - User
   - Company
5. Logout:
   - User
   - Company

---

## Testing

1. Postman Scripts
2. Swagger UI
3. Mocha/Chai Tests

---

## Notes

- Make sure to configure the `.env` file properly.
- Use Postman and Swagger for manual testing, while Mocha/Chai ensures automated test coverage.

---

## Conclusion

The _Skilled Job Portal API_ provides a comprehensive set of features for job seekers and employers. With a secure, reliable, and scalable design, this API is built to handle real-world requirements. Continuous updates and improvements will ensure a state-of-the-art experience for all users.

---
