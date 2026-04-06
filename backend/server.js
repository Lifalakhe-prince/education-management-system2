const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const session = require('express-session');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(session({
  secret: 'edu_manage_secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }
}));

// Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'education_management'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access denied' });

  jwt.verify(token, 'your_jwt_secret', (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Routes
app.post('/api/login', async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const [users] = await db.promise().query(
      'SELECT * FROM users WHERE username = ? AND role = ?',
      [username, role]
    );

    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = users[0];
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      'your_jwt_secret',
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get dashboard stats
app.get('/api/dashboard/stats', authenticateToken, async (req, res) => {
  try {
    const [students] = await db.promise().query('SELECT COUNT(*) as count FROM students');
    const [teachers] = await db.promise().query('SELECT COUNT(*) as count FROM teachers');
    const [classes] = await db.promise().query('SELECT COUNT(*) as count FROM classes');
    const [subjects] = await db.promise().query('SELECT COUNT(*) as count FROM subjects');

    res.json({
      totalStudents: students[0].count,
      totalTeachers: teachers[0].count,
      totalClasses: classes[0].count,
      totalSubjects: subjects[0].count
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Students CRUD
app.get('/api/students', authenticateToken, async (req, res) => {
  try {
    const [students] = await db.promise().query(`
      SELECT s.*, c.name as class_name
      FROM students s
      LEFT JOIN classes c ON s.class_id = c.id
    `);
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/students', authenticateToken, async (req, res) => {
  const { first_name, last_name, email, date_of_birth, class_id } = req.body;
  try {
    const [result] = await db.promise().query(
      'INSERT INTO students (first_name, last_name, email, date_of_birth, class_id) VALUES (?, ?, ?, ?, ?)',
      [first_name, last_name, email, date_of_birth, class_id]
    );
    res.json({ id: result.insertId, message: 'Student added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Teachers CRUD
app.get('/api/teachers', authenticateToken, async (req, res) => {
  try {
    const [teachers] = await db.promise().query('SELECT * FROM teachers');
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/teachers', authenticateToken, async (req, res) => {
  const { first_name, last_name, email, hire_date } = req.body;
  try {
    const [result] = await db.promise().query(
      'INSERT INTO teachers (first_name, last_name, email, hire_date) VALUES (?, ?, ?, ?)',
      [first_name, last_name, email, hire_date]
    );
    res.json({ id: result.insertId, message: 'Teacher added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Classes CRUD
app.get('/api/classes', authenticateToken, async (req, res) => {
  try {
    const [classes] = await db.promise().query(`
      SELECT c.*, t.first_name, t.last_name, s.name as subject_name,
             (SELECT COUNT(*) FROM students WHERE class_id = c.id) as student_count
      FROM classes c
      LEFT JOIN teachers t ON c.teacher_id = t.id
      LEFT JOIN subjects s ON c.subject_id = s.id
    `);
    res.json(classes);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/classes', authenticateToken, async (req, res) => {
  const { name, teacher_id, subject_id } = req.body;
  try {
    const [result] = await db.promise().query(
      'INSERT INTO classes (name, teacher_id, subject_id) VALUES (?, ?, ?)',
      [name, teacher_id, subject_id]
    );
    res.json({ id: result.insertId, message: 'Class added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Subjects CRUD
app.get('/api/subjects', authenticateToken, async (req, res) => {
  try {
    const [subjects] = await db.promise().query('SELECT * FROM subjects');
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/subjects', authenticateToken, async (req, res) => {
  const { name, description } = req.body;
  try {
    const [result] = await db.promise().query(
      'INSERT INTO subjects (name, description) VALUES (?, ?)',
      [name, description]
    );
    res.json({ id: result.insertId, message: 'Subject added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Student-specific endpoints
app.get('/api/student/profile', authenticateToken, async (req, res) => {
  if (req.user.role !== 'student') return res.status(403).json({ error: 'Access denied' });

  try {
    const [students] = await db.promise().query(`
      SELECT s.*, c.name as class_name
      FROM students s
      LEFT JOIN classes c ON s.class_id = c.id
      WHERE s.email = ?
    `, [req.user.email]);

    if (students.length === 0) return res.status(404).json({ error: 'Student not found' });

    res.json(students[0]);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/student/grades', authenticateToken, async (req, res) => {
  if (req.user.role !== 'student') return res.status(403).json({ error: 'Access denied' });

  try {
    const [grades] = await db.promise().query(`
      SELECT r.*, e.date, s.name as subject_name, e.total_marks
      FROM results r
      JOIN exams e ON r.exam_id = e.id
      JOIN subjects s ON e.subject_id = s.id
      JOIN students st ON r.student_id = st.id
      WHERE st.email = ?
    `, [req.user.email]);

    res.json(grades);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/student/assignments', authenticateToken, async (req, res) => {
  if (req.user.role !== 'student') return res.status(403).json({ error: 'Access denied' });

  try {
    const [assignments] = await db.promise().query(`
      SELECT a.*, s.name as subject_name
      FROM assignments a
      JOIN subjects s ON a.subject_id = s.id
      JOIN students st ON a.student_id = st.id
      WHERE st.email = ?
    `, [req.user.email]);

    res.json(assignments);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/student/timetable', authenticateToken, async (req, res) => {
  if (req.user.role !== 'student') return res.status(403).json({ error: 'Access denied' });

  try {
    const [timetable] = await db.promise().query(`
      SELECT t.*, s.name as subject_name, c.name as class_name, r.room_number
      FROM timetable t
      JOIN subjects s ON t.subject_id = s.id
      JOIN classes c ON t.class_id = c.id
      JOIN students st ON st.class_id = c.id
      LEFT JOIN rooms r ON t.room_id = r.id
      WHERE st.email = ?
    `, [req.user.email]);

    res.json(timetable);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});