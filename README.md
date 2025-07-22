# 🔐 JWT Authentication System with Role-based Access (User & Admin) uisng SpringBoot

This project demonstrates a simple implementation of JWT-based authentication and authorization in a Spring Boot application. The system includes two roles: USER and ADMIN.

## 🧰 Technologies Used

- Java 17
- Spring Boot
- Spring Security
- JWT (JSON Web Token)
- H2 In-Memory Database
- Maven
- Postman (for API testing)

## 📂 Features

- User & Admin role-based login
- JWT token generation on login
- Secured endpoints based on roles
- H2 in-memory database with preloaded users
- API testing with Postman

## ⚙️ Project Setup
### 🔄 Clone the Repository

git clone `https://github.com/L-Jayawardhana/jwt-login-backend-springboot.git`
cd `jwt-login-backend-springboot`/

### 🚀 Run the Application
Use your IDE or:

`./mvnw spring-boot:run`

<br>

## 💾 H2 Database
This project uses H2 in-memory database, so data resets on each restart.

### 🛠 Access H2 Console
- Navigate to: `http://localhost:8080/h2-console`
- JDBC URL: jdbc:h2:mem:testdb
- Username: sa
- Password: (leave it blank unless changed)<br>
Note: You can find these details in application.properties.
<br>

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
    "username": "admin",
    "jwtToken": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6Mzc3NTMyMDUyNjN9.nysyDBzrd....",
    "roles": [
        "ROLE_ADMIN"
    ]
}
```
</br>

### 🔓 2. Access Secured Endpoints

Use the returned token in the **Authorization** header:

Authorization: Bearer <your-token>
**Example Requests:**

- **GET** `http://localhost:8080/hello/admin`  
  🔐 Only accessible by `ADMIN`

- **GET** `http://localhost:8080/hello/user`  
  🔐 Only accessible by `USER`

- **GET** `http://localhost:8080/hello/all`  
  🔐 Accessible by both `USER` and `ADMIN`</br></br>


### 📁 Default User Credentials (from H2 preload)

| Username | Password | Role  |
| -------- | -------- | ----- |
| admin    | admin123 | ADMIN |
| user     | user123  | USER  |

(You can modify these in your data.sql file or service layer.)</br></br>

### 📎 Useful Endpoints Summary

| Method | Endpoint               | Description        | Role Required |
| ------ | ---------------------- | ------------------ | ------------- |
| POST   | `/api/auth/signin`     | Authenticate user  | Public        |
| GET    | `/api/hello/user`      | User-only section  | USER          |
| GET    | `/api/hello/admin`     | Admin-only section | ADMIN         |
| GET    | `/api/hello/all`       | Admin/User section | ADMIN/USER  |

**📝 License**<br>
This project is licensed under the MIT License.
