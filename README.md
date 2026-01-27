# EduPay360 Backend

Cloud-based school management SaaS platform for African schools.

## Tech Stack
- Java 21
- Spring Boot 4
- PostgreSQL 15
- Redis 7
- Auth0
- Event-Driven Architecture
- React
- shadcn/ui

## Features
- Multi-tenant school management
- Fee payment tracking
- SMS/WhatsApp notifications
- Attendance management
- Results publishing

## Setup
1. Clone repo
2. Copy `.env.example` to `.env`
3. Update Auth0 credentials
4. Run: `docker-compose up -d`
5. Run: `./mvnw spring-boot:run`

## API Docs
Base URL: `http://localhost:8080/api/v1`

Auth: Bearer token (Auth0 JWT)

Endpoints:
- `POST /schools/register` - Register new school
- `GET /schools/{id}` - Get school details
- `POST /students` - Add student
- `POST /payments` - Record payment

## Environment Variables
See `.env.example`

---
Built with ❤️ by CharlseEmpire Tech
```

---

### **5. .gitignore (ADD THIS NOW):**

**Backend `.gitignore`:**
```
target/
.idea/
*.iml
.env
application-prod.yml
application-local.yml
*.log
```

**Frontend `.gitignore`:**
```
node_modules/
.next/
dist/
.env
.env.local
*.log