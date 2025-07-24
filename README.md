# 🔐 JWT Authentication System with Role-based Access (User & Admin) 
## ***Spring-boot + React + H2***

This project demonstrates a simple implementation of JWT-based authentication and authorization in a Spring Boot application. Fronnt end is built on React. The system includes two roles: USER and ADMIN.
<br><br>
## 🧰 Technologies Used
- Java 17+
- Spring Boot
- Spring Security
- H2 In-Memory Database
- JWT (JSON Web Tokens)
- Maven
- Postman (for testing)
- React frontend<br>

## 📂 Features
- User & Admin role-based login
- JWT token generation on login
- Secured endpoints based on roles
- H2 in-memory database with preloaded users
- Simple web interface or endpoint testing with Postman<br>

## ⚙️ Project Setup
### 🔄 Clone the Repository
`git clone https://github.com/L-Jayawardhana/JWT-login-Springboot-React-H2database.git`
`cd JWT-login-Springboot-React-H2database`

### 🚀 Run the Application
***Use your IDE or:***
`./mvnw spring-boot:run`

## 💾 H2 Database <br>
This project uses H2 in-memory database, so data resets on each restart.<br>

### 🛠 Access H2 Console
- Navigate to: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:testdb`
- Username: `sa`
- Password: (leave it blank unless changed)<br>
Note: You can find these details in application.properties.<br><br>

## 🧪 Testing with Postman
### 🔑 Login to Get JWT Token

**POST** `http://localhost:8080/api/auth/login`

**Request Body (JSON):**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response:**
```json
{
    "jwtToken": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6Mzc3NTMzNTI5NTB9.MiJTm9bDrc2JI8W....",
    "username": "admin",
    "roles": [
        "ROLE_ADMIN"
    ]
}
```

## 🔓 2. Access Secured Endpoints
Use the returned token in the Authorization header:
`Authorization: Bearer <your-token>`<br>

Example:<br>
Only accessible by ADMIN : `GET http://localhost:8080/hello/admin`<br>
Accessible by USER and ADMIN : `GET http://localhost:8080/hello/user` 
Accessible by ALL : `GET http://localhost:8080/hello/all`<br></br></br></br>

## 🌐 Testing via Browser (if applicable)
If you’ve enabled any simple frontend or web views:<br>
Main Page                      : `http://localhost:8080`<br>
Login Page                     : `http://localhost:8080/login`<br>
Admin Panel (secured)          : `http://localhost:8080/admin`<br>
User Profile (secured)         : `http://localhost:8080/user`</br></br>

### 📁 Default User Credentials (from H2 preload)
| Username | Password | Role  |
| -------- | -------- | ----- |
| admin    | admin123 | ADMIN |
| user     | user123  | USER  |
(You can modify these in your schema.sql file)</br></br>

### 📎 Useful Endpoints Summary
| Method | Endpoint               | Description        | Role Required |
| ------ | ---------------------- | ------------------ | ------------- |
| POST   | `/api/auth/login`      | Authenticate user  | Public        |
| GET    | `/api/user/profile`    | User info          | USER/ADMIN    |
| GET    | `/api/admin/dashboard` | Admin-only section | ADMIN         |</br></br>


### 📝 License 
This project is licensed under the MIT License.
