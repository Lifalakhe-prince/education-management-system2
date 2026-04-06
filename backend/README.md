# Education Management System - Backend API

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Set up MySQL database:
   - Create database using the `database.sql` file
   - Update `.env` file with your MySQL credentials

3. Start the server:
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/login` - User login

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

### Students
- `GET /api/students` - Get all students
- `POST /api/students` - Add new student

### Teachers
- `GET /api/teachers` - Get all teachers
- `POST /api/teachers` - Add new teacher

### Classes
- `GET /api/classes` - Get all classes
- `POST /api/classes` - Add new class

### Subjects
- `GET /api/subjects` - Get all subjects
- `POST /api/subjects` - Add new subject

### Student Endpoints
- `GET /api/student/profile` - Get student profile
- `GET /api/student/grades` - Get student grades
- `GET /api/student/assignments` - Get student assignments
- `GET /api/student/timetable` - Get student timetable