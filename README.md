# OXU KIDS

Premium kindergarten platform built with Spring Boot 3, Java 21, PostgreSQL, React, Vite, and Tailwind CSS.

## Highlights

- Parent registration and login with JWT authentication
- Child profile management and program enrollment
- Super admin and admin management flows
- Gallery and program image upload support
- Premium multilingual UI in Uzbek, English, and Russian

## Project Structure

```text
oxu kids/
├── backend/
│   ├── pom.xml
│   ├── .env.example
│   └── src/main/
│       ├── java/com/oxukids/backend/
│       │   ├── config/
│       │   ├── controller/
│       │   ├── domain/
│       │   ├── security/
│       │   └── shared/
│       └── resources/
│           ├── application.yml
│           ├── application-dev.yml
│           ├── h2-role-compat.sql
│           └── db/migration/
├── frontend/
│   ├── package.json
│   ├── .env.example
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── context/
│       ├── data/
│       ├── hooks/
│       ├── i18n/
│       ├── layouts/
│       ├── lib/
│       ├── pages/
│       ├── routes/
│       └── styles/
├── docker-compose.yml
└── README.md
```

## Key Frontend Files

- `frontend/src/layouts/MainLayout.jsx`
- `frontend/src/components/Navbar.jsx`
- `frontend/src/components/Footer.jsx`
- `frontend/src/pages/HomePage.jsx`
- `frontend/src/pages/ContactPage.jsx`
- `frontend/src/components/admin/AdminLayout.jsx`
- `frontend/src/pages/admin/GalleryManagerPage.jsx`
- `frontend/src/pages/admin/RulesPage.jsx`

## Key Backend Files

- `backend/src/main/java/com/oxukids/backend/OxuKidsApplication.java`
- `backend/src/main/java/com/oxukids/backend/security/SecurityConfig.java`
- `backend/src/main/java/com/oxukids/backend/security/AuthService.java`
- `backend/src/main/java/com/oxukids/backend/controller/AuthController.java`
- `backend/src/main/java/com/oxukids/backend/controller/ProgramController.java`
- `backend/src/main/java/com/oxukids/backend/controller/GalleryController.java`
- `backend/src/main/resources/db/migration/V1__init.sql`
- `backend/src/main/resources/db/migration/V2__gallery_items.sql`
- `backend/src/main/resources/db/migration/V3__program_images_and_user_blocking.sql`

## Roles

- `SUPER_ADMIN`: can create admins and manage all platform data
- `ADMIN`: manages programs, gallery items, enrollments, and content
- `USER`: parent account that registers and enrolls children

## Environment

Frontend example:

```env
VITE_API_BASE_URL=/api
VITE_API_PROXY_TARGET=http://127.0.0.1:8081
VITE_DEV_PORT=5174
```

Backend example:

```env
DATABASE_URL=jdbc:postgresql://localhost:5432/oxu_kids
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
JWT_SECRET=replace-with-a-strong-secret
JWT_EXPIRATION_MS=86400000
FRONTEND_URL=http://localhost:5173
SUPER_ADMIN_EMAIL=superadmin@example.com
SUPER_ADMIN_PASSWORD=replace-with-a-strong-password
SUPER_ADMIN_NAME=OXU KIDS Super Admin
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=replace-with-a-strong-password
ADMIN_NAME=OXU KIDS Admin
```

## Run Locally

### Backend

```bash
cd backend
mvn spring-boot:run
```

For PostgreSQL:

```bash
docker compose up -d
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Build Checks

- Frontend: `npm run build`
- Backend: `mvn -q -DskipTests compile`

## Deployment Notes

- Do not use local development secrets in production
- Set strong values for `JWT_SECRET`, admin passwords, and database credentials
- Configure a production PostgreSQL database before deployment
