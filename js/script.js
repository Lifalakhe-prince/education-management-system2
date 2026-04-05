/**
 * ========================================
 * EDUCATION MANAGEMENT SYSTEM
 * Main JavaScript Application
 * ========================================
 */

/**
 * Main class that manages the entire education management system
 * Handles authentication, data management, and UI interactions
 */
class EduManageSystem {
    constructor() {
        this.currentUser = null;        // Currently logged in user
        this.currentStudent = null;      // Current student data (for student role)
        
        // Data structure for all system entities
        this.data = {
            users: [],          // User accounts and authentication
            students: [],       // Student information
            teachers: [],       // Teacher information
            subjects: [],       // School subjects
            classes: [],        // Class/group information
            attendance: [],     // Attendance records
            exams: [],          // Exam schedules
            results: [],        // Student exam results
            fees: [],           // Fee payment records
            assignments: [],    // Student assignments
            notifications: [],  // System notifications
            timetable: []       // Class schedules
        };
        
        this.init(); // Initialize the system
    }

    /**
     * Initialize the application
     * Sets up event listeners, loads data, and shows login screen
     */
    init() {
        this.loadData();              // Load saved data from localStorage
        this.setupEventListeners();     // Set up UI event handlers
        this.initializeSampleData();     // Create sample data if needed
        this.showLoginScreen();        // Show login screen
    }

    /**
     * Load data from localStorage
     * Persists user data between sessions
     */
    loadData() {
        const savedData = localStorage.getItem('eduManageData');
        if (savedData) {
            this.data = JSON.parse(savedData);
        }
    }

    /**
     * Save data to localStorage
     * Ensures data persistence
     */
    saveData() {
        localStorage.setItem('eduManageData', JSON.stringify(this.data));
    }

    /**
     * Initialize sample data for demonstration
     * Creates realistic test data when system is first loaded
     */
    initializeSampleData() {
        if (this.data.users.length === 0) {
            // Sample users for different roles
            this.data.users = [
                { id: 1, username: 'admin', email: 'admin@school.edu', password: 'admin123', role: 'admin' },
                { id: 2, username: 'teacher', email: 'teacher@school.edu', password: 'teacher123', role: 'teacher' },
                { id: 3, username: 'student', email: 'alice.williams@school.edu', password: 'student123', role: 'student' }
            ];

            // Sample subjects
            this.data.subjects = [
                { id: 1, name: 'Mathematics', description: 'Advanced mathematics and calculus' },
                { id: 2, name: 'Science', description: 'Physics, Chemistry and Biology' },
                { id: 3, name: 'English', description: 'English language and literature' },
                { id: 4, name: 'History', description: 'World and national history' }
            ];

            // Sample teachers
            this.data.teachers = [
                { id: 1, first_name: 'John', last_name: 'Smith', email: 'john.smith@school.edu', hire_date: '2020-01-15' },
                { id: 2, first_name: 'Sarah', last_name: 'Johnson', email: 'sarah.johnson@school.edu', hire_date: '2019-08-20' },
                { id: 3, first_name: 'Michael', last_name: 'Brown', email: 'michael.brown@school.edu', hire_date: '2021-03-10' }
            ];

            // Sample classes
            this.data.classes = [
                { id: 1, name: 'Grade 10A', teacher: 1, subject: 1 },
                { id: 2, name: 'Grade 10B', teacher: 2, subject: 2 },
                { id: 3, name: 'Grade 11A', teacher: 3, subject: 3 }
            ];

            // Sample students
            this.data.students = [
                { id: 1, first_name: 'Alice', last_name: 'Williams', email: 'alice.williams@school.edu', date_of_birth: '2005-03-15', student_class: 1 },
                { id: 2, first_name: 'Bob', last_name: 'Davis', email: 'bob.davis@school.edu', date_of_birth: '2005-07-22', student_class: 1 },
                { id: 3, first_name: 'Carol', last_name: 'Miller', email: 'carol.miller@school.edu', date_of_birth: '2004-11-08', student_class: 2 },
                { id: 4, first_name: 'David', last_name: 'Wilson', email: 'david.wilson@school.edu', date_of_birth: '2005-01-30', student_class: 2 }
            ];

            // Sample attendance records
            this.data.attendance = [
                { id: 1, student: 1, class_obj: 1, date: '2024-01-15', status: 'Present' },
                { id: 2, student: 2, class_obj: 1, date: '2024-01-15', status: 'Present' },
                { id: 3, student: 3, class_obj: 2, date: '2024-01-15', status: 'Absent' },
                { id: 4, student: 4, class_obj: 2, date: '2024-01-15', status: 'Present' },
                { id: 5, student: 1, class_obj: 1, date: '2024-01-16', status: 'Present' },
                { id: 6, student: 2, class_obj: 1, date: '2024-01-16', status: 'Absent' },
                { id: 7, student: 3, class_obj: 2, date: '2024-01-16', status: 'Present' },
                { id: 8, student: 4, class_obj: 2, date: '2024-01-16', status: 'Present' }
            ];

            // Sample exams
            this.data.exams = [
                { id: 1, subject: 1, date: '2024-02-15', total_marks: 100 },
                { id: 2, subject: 2, date: '2024-02-20', total_marks: 100 },
                { id: 3, subject: 3, date: '2024-02-25', total_marks: 100 }
            ];

            // Sample results
            this.data.results = [
                { id: 1, student: 1, exam: 1, marks_obtained: 85 },
                { id: 2, student: 2, exam: 1, marks_obtained: 78 },
                { id: 3, student: 3, exam: 2, marks_obtained: 92 },
                { id: 4, student: 4, exam: 2, marks_obtained: 88 },
                { id: 5, student: 1, exam: 3, marks_obtained: 90 },
                { id: 6, student: 2, exam: 3, marks_obtained: 82 }
            ];

            // Sample fees
            this.data.fees = [
                { id: 1, student: 1, amount: 1000, status: 'Paid' },
                { id: 2, student: 2, amount: 1000, status: 'Pending' },
                { id: 3, student: 3, amount: 1000, status: 'Paid' },
                { id: 4, student: 4, amount: 1000, status: 'Pending' }
            ];

            // Sample assignments
            this.data.assignments = [
                { id: 1, title: 'Mathematics Homework', subject: 1, description: 'Complete exercises 1-20 from Chapter 5', due_date: '2024-01-25', status: 'pending', student: 1 },
                { id: 2, title: 'Science Lab Report', subject: 2, description: 'Write a report on chemistry experiment', due_date: '2024-01-23', status: 'submitted', student: 1 },
                { id: 3, title: 'English Essay', subject: 3, description: 'Write a 500-word essay on Shakespeare', due_date: '2024-01-20', status: 'overdue', student: 1 },
                { id: 4, title: 'Mathematics Quiz', subject: 1, description: 'Prepare for algebra quiz', due_date: '2024-01-28', status: 'pending', student: 2 },
                { id: 5, title: 'Science Project', subject: 2, description: 'Create a presentation on renewable energy', due_date: '2024-01-30', status: 'pending', student: 2 }
            ];

            // Sample notifications
            this.data.notifications = [
                { id: 1, title: 'Math Exam Tomorrow', message: 'Remember to study for your mathematics exam scheduled for tomorrow at 9 AM', type: 'urgent', date: '2024-01-14', student: 1 },
                { id: 2, title: 'Assignment Due', message: 'Your Science Lab Report is due in 2 days', type: 'info', date: '2024-01-13', student: 1 },
                { id: 3, title: 'School Holiday', message: 'School will be closed next Monday for a public holiday', type: 'info', date: '2024-01-12', student: 1 },
                { id: 4, title: 'Parent Meeting', message: 'Parent-teacher meeting scheduled for this Friday', type: 'info', date: '2024-01-11', student: 1 },
                { id: 5, title: 'New Assignment', message: 'New Mathematics homework has been posted', type: 'info', date: '2024-01-10', student: 1 }
            ];

            // Sample timetable
            this.data.timetable = [
                { id: 1, day: 'Monday', time: '9:00 AM', subject: 1, class: 1, room: 'Room 101' },
                { id: 2, day: 'Monday', time: '11:00 AM', subject: 2, class: 1, room: 'Lab 201' },
                { id: 3, day: 'Tuesday', time: '9:00 AM', subject: 3, class: 1, room: 'Room 102' },
                { id: 4, day: 'Tuesday', time: '11:00 AM', subject: 1, class: 1, room: 'Room 101' },
                { id: 5, day: 'Wednesday', time: '9:00 AM', subject: 2, class: 1, room: 'Lab 201' },
                { id: 6, day: 'Wednesday', time: '11:00 AM', subject: 3, class: 1, room: 'Room 102' },
                { id: 7, day: 'Thursday', time: '9:00 AM', subject: 1, class: 1, room: 'Room 101' },
                { id: 8, day: 'Thursday', time: '11:00 AM', subject: 2, class: 1, room: 'Lab 201' },
                { id: 9, day: 'Friday', time: '9:00 AM', subject: 3, class: 1, room: 'Room 102' },
                { id: 10, day: 'Friday', time: '11:00 AM', subject: 1, class: 1, room: 'Room 101' }
            ];

            this.saveData(); // Save the sample data
        }
    }

    /**
     * Set up all event listeners for UI interactions
     * Handles form submissions, navigation, and user actions
     */
    setupEventListeners() {
        // Login form submission
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        // Logout button click
        document.getElementById('logoutBtn').addEventListener('click', () => {
            this.handleLogout();
        });

        // Navigation menu clicks
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = e.currentTarget.dataset.page;
                this.navigateToPage(page);
            });
        });

        // Modal close button
        document.getElementById('modalClose').addEventListener('click', () => {
            this.closeModal();
        });

        // Modal background click to close
        document.getElementById('modal').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                this.closeModal();
            }
        });

        // Add new button (context-dependent)
        document.getElementById('addBtn').addEventListener('click', () => {
            this.handleAddNew();
        });

        // Filter change events
        document.getElementById('attendanceClassFilter')?.addEventListener('change', () => {
            this.loadAttendance();
        });

        document.getElementById('attendanceDateFilter')?.addEventListener('change', () => {
            this.loadAttendance();
        });

        document.getElementById('resultsClassFilter')?.addEventListener('change', () => {
            this.loadResults();
        });

        document.getElementById('resultsExamFilter')?.addEventListener('change', () => {
            this.loadResults();
        });

        document.getElementById('feesStatusFilter')?.addEventListener('change', () => {
            this.loadFees();
        });

        // Assignment filter
        document.getElementById('assignmentStatusFilter')?.addEventListener('change', () => {
            this.loadAssignmentsPage();
        });
    }

    /**
     * Handle user login authentication
     * Validates credentials and sets up user session
     */
    handleLogin() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const role = document.getElementById('role').value;

        // Find user in database
        const user = this.data.users.find(u => 
            u.username === username && 
            u.password === password && 
            u.role === role
        );

        if (user) {
            this.currentUser = user;
            
            // Set current student if role is student
            if (user.role === 'student') {
                this.currentStudent = this.data.students.find(s => s.email === user.email);
            }
            
            this.showDashboard();
            this.showToast('Login successful!', 'success');
        } else {
            this.showToast('Invalid credentials!', 'error');
        }
    }

    /**
     * Handle user logout
     * Clears session and returns to login screen
     */
    handleLogout() {
        this.currentUser = null;
        this.currentStudent = null;
        this.showLoginScreen();
        this.showToast('Logged out successfully!', 'info');
    }

    /**
     * Show login screen
     * Resets form and hides dashboard
     */
    showLoginScreen() {
        document.getElementById('loginScreen').classList.add('active');
        document.getElementById('dashboardScreen').classList.remove('active');
        document.getElementById('loginForm').reset();
        document.body.removeAttribute('data-role');
    }

    /**
     * Show main dashboard
     * Sets up role-based interface
     */
    showDashboard() {
        document.getElementById('loginScreen').classList.remove('active');
        document.getElementById('dashboardScreen').classList.add('active');
        
        // Set body attribute for role-based styling
        document.body.setAttribute('data-role', this.currentUser.role);
        
        // Update user info display
        document.getElementById('currentUser').textContent = this.currentUser.username;
        document.getElementById('currentRole').textContent = this.currentUser.role.charAt(0).toUpperCase() + this.currentUser.role.slice(1);
        
        // Show appropriate dashboard based on role
        if (this.currentUser.role === 'student') {
            this.showStudentDashboard();
        } else {
            this.showAdminDashboard();
        }
        
        // Navigate to dashboard page
        this.navigateToPage('dashboard');
    }

    /**
     * Navigate between different pages
     * Updates navigation, shows/hides content, manages header actions
     */
    navigateToPage(pageName) {
        // Update navigation active state
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector(`[data-page="${pageName}"]`).classList.add('active');

        // Update page title
        const titles = {
            dashboard: 'Dashboard',
            students: 'Students',
            teachers: 'Teachers',
            classes: 'Classes',
            subjects: 'Subjects',
            attendance: 'Attendance',
            exams: 'Exams',
            results: 'Results',
            fees: 'Fees',
            profile: 'Profile',
            grades: 'Grades',
            assignments: 'Assignments',
            timetable: 'Timetable'
        };
        document.getElementById('pageTitle').textContent = titles[pageName] || 'Dashboard';

        // Hide all pages and show target page
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        const targetPage = document.getElementById(`${pageName}Page`);
        if (targetPage) {
            targetPage.classList.add('active');
            this.loadPageData(pageName);
        }
        
        // Update header actions based on page
        const headerAddBtn = document.getElementById('addBtn');
        const adminPagesWithAdd = ['students', 'teachers', 'classes', 'subjects', 'attendance', 'exams', 'results', 'fees'];
        const studentPages = ['profile', 'grades', 'assignments', 'timetable'];
        
        if (studentPages.includes(pageName)) {
            headerAddBtn.style.display = 'none';
        } else if (adminPagesWithAdd.includes(pageName)) {
            headerAddBtn.style.display = 'flex';
        } else {
            headerAddBtn.style.display = 'none';
        }
    }

    /**
     * Load data for specific pages
     * Routes to appropriate loading function based on page name
     */
    loadPageData(pageName) {
        switch(pageName) {
            case 'dashboard':
                if (this.currentUser.role === 'student') {
                    this.showStudentDashboard();
                } else {
                    this.showAdminDashboard();
                }
                break;
            case 'profile':
                this.loadProfilePage();
                break;
            case 'grades':
                this.loadGradesPage();
                break;
            case 'assignments':
                this.loadAssignmentsPage();
                break;
            case 'timetable':
                this.loadTimetablePage();
                break;
            case 'students':
                this.loadStudents();
                break;
            case 'teachers':
                this.loadTeachers();
                break;
            case 'classes':
                this.loadClasses();
                break;
            case 'subjects':
                this.loadSubjects();
                break;
            case 'attendance':
                this.loadAttendance();
                this.loadAttendanceFilters();
                break;
            case 'exams':
                this.loadExams();
                break;
            case 'results':
                this.loadResults();
                this.loadResultsFilters();
                break;
            case 'fees':
                this.loadFees();
                break;
        }
    }

    /**
     * ========================================
     * STUDENT DASHBOARD METHODS
     * ========================================
     */

    /**
     * Show student-specific dashboard
     * Displays student profile, stats, notifications, and events
     */
    showStudentDashboard() {
        document.getElementById('studentDashboard').style.display = 'block';
        document.getElementById('adminDashboard').style.display = 'none';
        document.getElementById('addBtn').style.display = 'none';
        
        // Load student-specific data
        this.loadStudentProfile();
        this.loadStudentStats();
        this.loadStudentNotifications();
        this.loadUpcomingEvents();
    }

    /**
     * Load student profile information
     * Displays student name, class, email, and profile image
     */
    loadStudentProfile() {
        if (!this.currentStudent) return;
        
        const studentClass = this.data.classes.find(c => c.id === this.currentStudent.student_class);
        
        document.getElementById('studentName').textContent = `${this.currentStudent.first_name} ${this.currentStudent.last_name}`;
        document.getElementById('studentClass').textContent = studentClass ? studentClass.name : 'N/A';
        document.getElementById('studentEmail').textContent = this.currentStudent.email;
        
        // Load profile image
        this.loadProfileImage();
    }

    /**
     * Calculate and display student statistics
     * Shows attendance rate, average grade, pending assignments, upcoming exams
     */
    loadStudentStats() {
        if (!this.currentStudent) return;
        
        // Calculate attendance percentage
        const studentAttendance = this.data.attendance.filter(a => a.student === this.currentStudent.id);
        const presentDays = studentAttendance.filter(a => a.status === 'Present').length;
        const attendancePercentage = studentAttendance.length > 0 ? Math.round((presentDays / studentAttendance.length) * 100) : 0;
        
        // Calculate average grade
        const studentResults = this.data.results.filter(r => r.student === this.currentStudent.id);
        let averageGrade = 'N/A';
        if (studentResults.length > 0) {
            const totalPercentage = studentResults.reduce((sum, result) => {
                const exam = this.data.exams.find(e => e.id === result.exam);
                return sum + (exam ? (result.marks_obtained / exam.total_marks) * 100 : 0);
            }, 0);
            const avgPercentage = totalPercentage / studentResults.length;
            averageGrade = this.getGrade(Math.round(avgPercentage));
        }
        
        // Count pending assignments
        const pendingAssignments = this.data.assignments.filter(a => 
            a.student === this.currentStudent.id && a.status === 'pending'
        ).length;
        
        // Count upcoming exams
        const upcomingExams = this.data.exams.filter(e => 
            new Date(e.date) > new Date()
        ).length;
        
        // Update UI with calculated stats
        document.getElementById('attendancePercentage').textContent = `${attendancePercentage}%`;
        document.getElementById('averageGrade').textContent = averageGrade;
        document.getElementById('pendingAssignments').textContent = pendingAssignments;
        document.getElementById('upcomingExams').textContent = upcomingExams;
    }

    /**
     * Load student notifications
     * Displays urgent alerts and informational messages
     */
    loadStudentNotifications() {
        if (!this.currentStudent) return;
        
        const studentNotifications = this.data.notifications.filter(n => n.student === this.currentStudent.id);
        const notificationsHtml = studentNotifications.map(notification => `
            <div class="notification-item ${notification.type}">
                <div class="notification-header">
                    <span class="notification-title">${notification.title}</span>
                    <span class="notification-time">${notification.date}</span>
                </div>
                <div class="notification-message">${notification.message}</div>
            </div>
        `).join('');
        
        document.getElementById('studentNotifications').innerHTML = notificationsHtml || '<p class="empty-state">No notifications</p>';
    }

    /**
     * Load upcoming events
     * Displays exams, meetings, holidays, and other events
     */
    loadUpcomingEvents() {
        const events = [
            { title: 'Mathematics Exam', date: '2024-02-15', type: 'exam', details: 'Chapter 1-5 coverage' },
            { title: 'Science Fair', date: '2024-02-20', type: 'event', details: 'Annual science exhibition' },
            { title: 'Parent Meeting', date: '2024-02-25', type: 'meeting', details: 'Quarterly parent-teacher meeting' },
            { title: 'School Holiday', date: '2024-03-01', type: 'holiday', details: 'Public holiday - school closed' }
        ];
        
        const eventsHtml = events.map(event => `
            <div class="event-item ${event.type}">
                <div class="event-header">
                    <span class="event-title">${event.title}</span>
                    <span class="event-date">${event.date}</span>
                </div>
                <div class="event-details">${event.details}</div>
            </div>
        `).join('');
        
        document.getElementById('upcomingEvents').innerHTML = eventsHtml;
    }

    /**
     * ========================================
     * STUDENT PAGE METHODS
     * ========================================
     */

    /**
     * Load full profile page
     * Displays detailed student information and profile image
     */
    loadProfilePage() {
        if (!this.currentStudent) return;
        
        const studentClass = this.data.classes.find(c => c.id === this.currentStudent.student_class);
        
        document.getElementById('profileFullName').textContent = `${this.currentStudent.first_name} ${this.currentStudent.last_name}`;
        document.getElementById('profileStudentInfo').textContent = `Student ID: ${this.currentStudent.id}`;
        document.getElementById('profileEmail').textContent = this.currentStudent.email;
        document.getElementById('profileDOB').textContent = this.currentStudent.date_of_birth;
        document.getElementById('profileClass').textContent = studentClass ? studentClass.name : 'N/A';
        
        // Load profile image
        this.loadProfileImage();
    }

    /**
     * Load grades page
     * Displays student's academic performance with detailed results
     */
    loadGradesPage() {
        if (!this.currentStudent) return;
        
        const studentResults = this.data.results.filter(r => r.student === this.currentStudent.id);
        const gradesHtml = studentResults.map(result => {
            const exam = this.data.exams.find(e => e.id === result.exam);
            const subject = exam ? this.data.subjects.find(s => s.id === exam.subject) : null;
            const percentage = exam ? Math.round((result.marks_obtained / exam.total_marks) * 100) : 0;
            const grade = this.getGrade(percentage);
            
            return `
                <tr>
                    <td>${subject ? subject.name : 'N/A'}</td>
                    <td>${exam ? exam.date : 'N/A'}</td>
                    <td>${result.marks_obtained}</td>
                    <td>${exam ? exam.total_marks : 'N/A'}</td>
                    <td>${percentage}%</td>
                    <td><span class="badge badge-info">${grade}</span></td>
                </tr>
            `;
        }).join('');
        
        document.getElementById('gradesTableBody').innerHTML = gradesHtml || '<tr><td colspan="6" class="empty-state">No grades found</td></tr>';
        
        // Update summary statistics
        if (studentResults.length > 0) {
            const avgPercentage = studentResults.reduce((sum, result) => {
                const exam = this.data.exams.find(e => e.id === result.exam);
                return sum + (exam ? (result.marks_obtained / exam.total_marks) * 100 : 0);
            }, 0) / studentResults.length;
            
            const highestScore = Math.max(...studentResults.map(result => {
                const exam = this.data.exams.find(e => e.id === result.exam);
                return exam ? Math.round((result.marks_obtained / exam.total_marks) * 100) : 0;
            }));
            
            document.getElementById('avgGradeValue').textContent = this.getGrade(Math.round(avgPercentage));
            document.getElementById('totalSubjectsValue').textContent = studentResults.length;
            document.getElementById('highestScoreValue').textContent = `${highestScore}%`;
        }
    }

    /**
     * Load assignments page
     * Displays student assignments with status and submission options
     */
    loadAssignmentsPage() {
        if (!this.currentStudent) return;
        
        const studentAssignments = this.data.assignments.filter(a => a.student === this.currentStudent.id);
        const statusFilter = document.getElementById('assignmentStatusFilter').value;
        
        let filteredAssignments = studentAssignments;
        if (statusFilter) {
            filteredAssignments = studentAssignments.filter(a => a.status === statusFilter);
        }
        
        const assignmentsHtml = filteredAssignments.map(assignment => {
            const subject = this.data.subjects.find(s => s.id === assignment.subject);
            const isOverdue = new Date(assignment.due_date) < new Date() && assignment.status === 'pending';
            const statusClass = isOverdue ? 'overdue' : assignment.status;
            
            return `
                <div class="assignment-card ${statusClass}">
                    <div class="assignment-header">
                        <div>
                            <div class="assignment-title">${assignment.title}</div>
                            <div class="assignment-subject">${subject ? subject.name : 'N/A'}</div>
                        </div>
                        <span class="badge badge-${statusClass === 'pending' ? 'warning' : statusClass === 'submitted' ? 'success' : 'danger'}">${assignment.status}</span>
                    </div>
                    <div class="assignment-meta">
                        <div class="assignment-meta-item">
                            <i class="fas fa-calendar"></i>
                            <span>Due: ${assignment.due_date}</span>
                        </div>
                        <div class="assignment-meta-item">
                            <i class="fas fa-info-circle"></i>
                            <span>${assignment.description}</span>
                        </div>
                    </div>
                    <div class="assignment-actions">
                        ${assignment.status === 'pending' ? `
                            <button class="btn btn-primary" onclick="eduManage.submitAssignment(${assignment.id})">
                                <i class="fas fa-upload"></i> Submit
                            </button>
                        ` : ''}
                        <button class="btn btn-secondary" onclick="eduManage.viewAssignmentDetails(${assignment.id})">
                            <i class="fas fa-eye"></i> View
                        </button>
                    </div>
                </div>
            `;
        }).join('');
        
        document.getElementById('assignmentsGrid').innerHTML = assignmentsHtml || '<div class="empty-state">No assignments found</div>';
    }

    /**
     * Load timetable page
     * Displays student's class schedule in grid format
     */
    loadTimetablePage() {
        if (!this.currentStudent) return;
        
        const studentClass = this.data.classes.find(c => c.id === this.currentStudent.student_class);
        if (!studentClass) return;
        
        const classTimetable = this.data.timetable.filter(t => t.class === studentClass.id);
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        const times = ['9:00 AM', '11:00 AM'];
        
        // Build timetable HTML
        let timetableHtml = `
            <div class="timetable-cell header">Time</div>
        `;
        
        days.forEach(day => {
            timetableHtml += `<div class="timetable-cell header">${day}</div>`;
        });
        
        times.forEach(time => {
            timetableHtml += `<div class="timetable-cell time-slot">${time}</div>`;
            
            days.forEach(day => {
                const slot = classTimetable.find(t => t.day === day && t.time === time);
                const subject = slot ? this.data.subjects.find(s => s.id === slot.subject) : null;
                
                if (slot) {
                    timetableHtml += `
                        <div class="timetable-cell has-class">
                            <div class="class-name">${subject ? subject.name : 'N/A'}</div>
                            <div class="class-time">${slot.time}</div>
                            <div class="class-room">${slot.room}</div>
                        </div>
                    `;
                } else {
                    timetableHtml += '<div class="timetable-cell"></div>';
                }
            });
        });
        
        document.getElementById('timetableGrid').innerHTML = timetableHtml;
    }

    /**
     * ========================================
     * ADMIN DASHBOARD METHODS
     * ========================================
     */

    /**
     * Show admin/teacher dashboard
     * Displays system statistics and recent activities
     */
    showAdminDashboard() {
        document.getElementById('studentDashboard').style.display = 'none';
        document.getElementById('adminDashboard').style.display = 'block';
        document.getElementById('addBtn').style.display = 'flex';
        
        // Load admin data
        this.loadDashboardStats();
        this.loadRecentActivities();
    }

    /**
     * Load dashboard statistics
     * Displays total counts for students, teachers, classes, subjects
     */
    loadDashboardStats() {
        document.getElementById('totalStudents').textContent = this.data.students.length;
        document.getElementById('totalTeachers').textContent = this.data.teachers.length;
        document.getElementById('totalClasses').textContent = this.data.classes.length;
        document.getElementById('totalSubjects').textContent = this.data.subjects.length;
    }

    /**
     * Load recent activities
     * Displays latest system activities for admin dashboard
     */
    loadRecentActivities() {
        const activities = [
            'New student enrolled: Alice Williams',
            'Exam scheduled for Mathematics',
            'Attendance marked for Grade 10A',
            'Fee payment received from Bob Davis',
            'New teacher hired: Michael Brown'
        ];

        const activitiesHtml = activities.map(activity => 
            `<div class="activity-item">${activity}</div>`
        ).join('');

        document.getElementById('recentActivities').innerHTML = activitiesHtml;
    }

    /**
     * ========================================
     * DATA MANAGEMENT METHODS
     * ========================================
     */

    /**
     * Load students table
     * Displays all students with class information and actions
     */
    loadStudents() {
        const tbody = document.getElementById('studentsTableBody');
        const students = this.data.students.map(student => {
            const studentClass = this.data.classes.find(c => c.id === student.student_class);
            return `
                <tr>
                    <td>${student.id}</td>
                    <td>${student.first_name} ${student.last_name}</td>
                    <td>${student.email}</td>
                    <td>${student.date_of_birth}</td>
                    <td>${studentClass ? studentClass.name : 'N/A'}</td>
                    <td class="table-actions">
                        <button class="btn btn-warning" onclick="eduManage.editStudent(${student.id})">Edit</button>
                        <button class="btn btn-danger" onclick="eduManage.deleteStudent(${student.id})">Delete</button>
                    </td>
                </tr>
            `;
        }).join('');
        tbody.innerHTML = students || '<tr><td colspan="6" class="empty-state">No students found</td></tr>';
    }

    /**
     * Load teachers table
     * Displays all teachers with hire information and actions
     */
    loadTeachers() {
        const tbody = document.getElementById('teachersTableBody');
        const teachers = this.data.teachers.map(teacher => `
            <tr>
                <td>${teacher.id}</td>
                <td>${teacher.first_name} ${teacher.last_name}</td>
                <td>${teacher.email}</td>
                <td>${teacher.hire_date}</td>
                <td class="table-actions">
                    <button class="btn btn-warning" onclick="eduManage.editTeacher(${teacher.id})">Edit</button>
                    <button class="btn btn-danger" onclick="eduManage.deleteTeacher(${teacher.id})">Delete</button>
                </td>
            </tr>
        `).join('');
        tbody.innerHTML = teachers || '<tr><td colspan="5" class="empty-state">No teachers found</td></tr>';
    }

    /**
     * Load classes table
     * Displays all classes with teacher and subject assignments
     */
    loadClasses() {
        const tbody = document.getElementById('classesTableBody');
        const classes = this.data.classes.map(cls => {
            const teacher = this.data.teachers.find(t => t.id === cls.teacher);
            const subject = this.data.subjects.find(s => s.id === cls.subject);
            const studentCount = this.data.students.filter(s => s.student_class === cls.id).length;
            return `
                <tr>
                    <td>${cls.id}</td>
                    <td>${cls.name}</td>
                    <td>${teacher ? `${teacher.first_name} ${teacher.last_name}` : 'N/A'}</td>
                    <td>${subject ? subject.name : 'N/A'}</td>
                    <td>${studentCount}</td>
                    <td class="table-actions">
                        <button class="btn btn-warning" onclick="eduManage.editClass(${cls.id})">Edit</button>
                        <button class="btn btn-danger" onclick="eduManage.deleteClass(${cls.id})">Delete</button>
                    </td>
                </tr>
            `;
        }).join('');
        tbody.innerHTML = classes || '<tr><td colspan="6" class="empty-state">No classes found</td></tr>';
    }

    /**
     * Load subjects table
     * Displays all subjects with descriptions
     */
    loadSubjects() {
        const tbody = document.getElementById('subjectsTableBody');
        const subjects = this.data.subjects.map(subject => `
            <tr>
                <td>${subject.id}</td>
                <td>${subject.name}</td>
                <td>${subject.description}</td>
                <td class="table-actions">
                    <button class="btn btn-warning" onclick="eduManage.editSubject(${subject.id})">Edit</button>
                    <button class="btn btn-danger" onclick="eduManage.deleteSubject(${subject.id})">Delete</button>
                </td>
            </tr>
        `).join('');
        tbody.innerHTML = subjects || '<tr><td colspan="4" class="empty-state">No subjects found</td></tr>';
    }

    /**
     * Load attendance table
     * Displays attendance records with filtering options
     */
    loadAttendance() {
        const tbody = document.getElementById('attendanceTableBody');
        const classFilter = document.getElementById('attendanceClassFilter').value;
        const dateFilter = document.getElementById('attendanceDateFilter').value;

        let filteredAttendance = this.data.attendance;

        if (classFilter) {
            filteredAttendance = filteredAttendance.filter(a => a.class_obj == classFilter);
        }

        if (dateFilter) {
            filteredAttendance = filteredAttendance.filter(a => a.date === dateFilter);
        }

        const attendance = filteredAttendance.map(att => {
            const student = this.data.students.find(s => s.id === att.student);
            const cls = this.data.classes.find(c => c.id === att.class_obj);
            return `
                <tr>
                    <td>${student ? `${student.first_name} ${student.last_name}` : 'N/A'}</td>
                    <td>${cls ? cls.name : 'N/A'}</td>
                    <td>${att.date}</td>
                    <td><span class="badge ${att.status === 'Present' ? 'badge-success' : 'badge-danger'}">${att.status}</span></td>
                    <td class="table-actions">
                        <button class="btn btn-warning" onclick="eduManage.editAttendance(${att.id})">Edit</button>
                        <button class="btn btn-danger" onclick="eduManage.deleteAttendance(${att.id})">Delete</button>
                    </td>
                </tr>
            `;
        }).join('');
        tbody.innerHTML = attendance || '<tr><td colspan="5" class="empty-state">No attendance records found</td></tr>';
    }

    /**
     * Load attendance filter options
     * Populates class filter dropdown
     */
    loadAttendanceFilters() {
        const classFilter = document.getElementById('attendanceClassFilter');
        const options = '<option value="">All Classes</option>' + 
            this.data.classes.map(cls => `<option value="${cls.id}">${cls.name}</option>`).join('');
        classFilter.innerHTML = options;
    }

    /**
     * Load exams table
     * Displays all scheduled exams
     */
    loadExams() {
        const tbody = document.getElementById('examsTableBody');
        const exams = this.data.exams.map(exam => {
            const subject = this.data.subjects.find(s => s.id === exam.subject);
            return `
                <tr>
                    <td>${exam.id}</td>
                    <td>${subject ? subject.name : 'N/A'}</td>
                    <td>${exam.date}</td>
                    <td>${exam.total_marks}</td>
                    <td class="table-actions">
                        <button class="btn btn-warning" onclick="eduManage.editExam(${exam.id})">Edit</button>
                        <button class="btn btn-danger" onclick="eduManage.deleteExam(${exam.id})">Delete</button>
                    </td>
                </tr>
            `;
        }).join('');
        tbody.innerHTML = exams || '<tr><td colspan="5" class="empty-state">No exams found</td></tr>';
    }

    /**
     * Load results table
     * Displays student exam results with filtering
     */
    loadResults() {
        const tbody = document.getElementById('resultsTableBody');
        const classFilter = document.getElementById('resultsClassFilter').value;
        const examFilter = document.getElementById('resultsExamFilter').value;

        let filteredResults = this.data.results;

        if (classFilter) {
            const studentsInClass = this.data.students.filter(s => s.student_class == classFilter).map(s => s.id);
            filteredResults = filteredResults.filter(r => studentsInClass.includes(r.student));
        }

        if (examFilter) {
            filteredResults = filteredResults.filter(r => r.exam == examFilter);
        }

        const results = filteredResults.map(result => {
            const student = this.data.students.find(s => s.id === result.student);
            const exam = this.data.exams.find(e => e.id === result.exam);
            const percentage = exam ? Math.round((result.marks_obtained / exam.total_marks) * 100) : 0;
            const grade = this.getGrade(percentage);
            return `
                <tr>
                    <td>${student ? `${student.first_name} ${student.last_name}` : 'N/A'}</td>
                    <td>${exam ? `${exam.date}` : 'N/A'}</td>
                    <td>${result.marks_obtained}</td>
                    <td>${exam ? exam.total_marks : 'N/A'}</td>
                    <td>${percentage}%</td>
                    <td><span class="badge badge-info">${grade}</span></td>
                    <td class="table-actions">
                        <button class="btn btn-warning" onclick="eduManage.editResult(${result.id})">Edit</button>
                        <button class="btn btn-danger" onclick="eduManage.deleteResult(${result.id})">Delete</button>
                    </td>
                </tr>
            `;
        }).join('');
        tbody.innerHTML = results || '<tr><td colspan="7" class="empty-state">No results found</td></tr>';
    }

    /**
     * Load results filter options
     * Populates class and exam filter dropdowns
     */
    loadResultsFilters() {
        const classFilter = document.getElementById('resultsClassFilter');
        const examFilter = document.getElementById('resultsExamFilter');

        const classOptions = '<option value="">All Classes</option>' + 
            this.data.classes.map(cls => `<option value="${cls.id}">${cls.name}</option>`).join('');
        classFilter.innerHTML = classOptions;

        const examOptions = '<option value="">All Exams</option>' + 
            this.data.exams.map(exam => {
                const subject = this.data.subjects.find(s => s.id === exam.subject);
                return `<option value="${exam.id}">${subject ? subject.name : 'N/A'} - ${exam.date}</option>`;
            }).join('');
        examFilter.innerHTML = examOptions;
    }

    /**
     * Load fees table
     * Displays fee payment records with status filtering
     */
    loadFees() {
        const tbody = document.getElementById('feesTableBody');
        const statusFilter = document.getElementById('feesStatusFilter').value;

        let filteredFees = this.data.fees;

        if (statusFilter) {
            filteredFees = filteredFees.filter(f => f.status === statusFilter);
        }

        const fees = filteredFees.map(fee => {
            const student = this.data.students.find(s => s.id === fee.student);
            return `
                <tr>
                    <td>${student ? `${student.first_name} ${student.last_name}` : 'N/A'}</td>
                    <td>$${fee.amount}</td>
                    <td><span class="badge ${fee.status === 'Paid' ? 'badge-success' : 'badge-warning'}">${fee.status}</span></td>
                    <td>${new Date().toLocaleDateString()}</td>
                    <td class="table-actions">
                        <button class="btn btn-warning" onclick="eduManage.editFee(${fee.id})">Edit</button>
                        <button class="btn btn-danger" onclick="eduManage.deleteFee(${fee.id})">Delete</button>
                    </td>
                </tr>
            `;
        }).join('');
        tbody.innerHTML = fees || '<tr><td colspan="5" class="empty-state">No fee records found</td></tr>';
    }

    /**
     * ========================================
     * MODAL MANAGEMENT
     * ========================================
     */

    /**
     * Handle add new item button
     * Opens appropriate modal based on current page
     */
    handleAddNew() {
        const currentPage = document.querySelector('.page.active').id.replace('Page', '');
        this.openModal(currentPage);
    }

    /**
     * Open modal dialog
     * Displays form for adding/editing data
     */
    openModal(type, id = null) {
        const modal = document.getElementById('modal');
        const modalTitle = document.getElementById('modalTitle');
        const modalForm = document.getElementById('modalForm');

        let formHtml = '';
        let title = '';

        // Generate appropriate form based on type
        switch(type) {
            case 'students':
                title = id ? 'Edit Student' : 'Add Student';
                formHtml = this.getStudentForm(id);
                break;
            case 'teachers':
                title = id ? 'Edit Teacher' : 'Add Teacher';
                formHtml = this.getTeacherForm(id);
                break;
            case 'classes':
                title = id ? 'Edit Class' : 'Add Class';
                formHtml = this.getClassForm(id);
                break;
            case 'subjects':
                title = id ? 'Edit Subject' : 'Add Subject';
                formHtml = this.getSubjectForm(id);
                break;
            case 'attendance':
                title = id ? 'Edit Attendance' : 'Mark Attendance';
                formHtml = this.getAttendanceForm(id);
                break;
            case 'exams':
                title = id ? 'Edit Exam' : 'Add Exam';
                formHtml = this.getExamForm(id);
                break;
            case 'results':
                title = id ? 'Edit Result' : 'Add Result';
                formHtml = this.getResultForm(id);
                break;
            case 'fees':
                title = id ? 'Edit Fee' : 'Add Fee';
                formHtml = this.getFeeForm(id);
                break;
        }

        modalTitle.textContent = title;
        modalForm.innerHTML = formHtml + `
            <div class="modal-actions">
                <button type="button" class="btn btn-secondary" onclick="eduManage.closeModal()">Cancel</button>
                <button type="submit" class="btn btn-primary">Save</button>
            </div>
        `;

        modalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveFormData(type, id);
        });

        modal.classList.add('active');
    }

    /**
     * Close modal dialog
     * Hides the modal and cleans up form
     */
    closeModal() {
        document.getElementById('modal').classList.remove('active');
    }

    /**
     * ========================================
     * FORM GENERATORS
     * Generate HTML forms for different data types
     * ========================================
     */

    /**
     * Generate student form HTML
     */
    getStudentForm(id = null) {
        const student = id ? this.data.students.find(s => s.id === id) : null;
        const classes = this.data.classes.map(cls => 
            `<option value="${cls.id}" ${student && student.student_class === cls.id ? 'selected' : ''}>${cls.name}</option>`
        ).join('');

        return `
            <div class="modal-form-group">
                <label>First Name</label>
                <input type="text" name="first_name" value="${student ? student.first_name : ''}" required>
            </div>
            <div class="modal-form-group">
                <label>Last Name</label>
                <input type="text" name="last_name" value="${student ? student.last_name : ''}" required>
            </div>
            <div class="modal-form-group">
                <label>Email</label>
                <input type="email" name="email" value="${student ? student.email : ''}" required>
            </div>
            <div class="modal-form-group">
                <label>Date of Birth</label>
                <input type="date" name="date_of_birth" value="${student ? student.date_of_birth : ''}" required>
            </div>
            <div class="modal-form-group">
                <label>Class</label>
                <select name="student_class" required>
                    <option value="">Select Class</option>
                    ${classes}
                </select>
            </div>
        `;
    }

    /**
     * Generate teacher form HTML
     */
    getTeacherForm(id = null) {
        const teacher = id ? this.data.teachers.find(t => t.id === id) : null;
        return `
            <div class="modal-form-group">
                <label>First Name</label>
                <input type="text" name="first_name" value="${teacher ? teacher.first_name : ''}" required>
            </div>
            <div class="modal-form-group">
                <label>Last Name</label>
                <input type="text" name="last_name" value="${teacher ? teacher.last_name : ''}" required>
            </div>
            <div class="modal-form-group">
                <label>Email</label>
                <input type="email" name="email" value="${teacher ? teacher.email : ''}" required>
            </div>
            <div class="modal-form-group">
                <label>Hire Date</label>
                <input type="date" name="hire_date" value="${teacher ? teacher.hire_date : ''}" required>
            </div>
        `;
    }

    /**
     * Generate class form HTML
     */
    getClassForm(id = null) {
        const cls = id ? this.data.classes.find(c => c.id === id) : null;
        const teachers = this.data.teachers.map(t => 
            `<option value="${t.id}" ${cls && cls.teacher === t.id ? 'selected' : ''}>${t.first_name} ${t.last_name}</option>`
        ).join('');
        const subjects = this.data.subjects.map(s => 
            `<option value="${s.id}" ${cls && cls.subject === s.id ? 'selected' : ''}>${s.name}</option>`
        ).join('');

        return `
            <div class="modal-form-group">
                <label>Class Name</label>
                <input type="text" name="name" value="${cls ? cls.name : ''}" required>
            </div>
            <div class="modal-form-group">
                <label>Teacher</label>
                <select name="teacher" required>
                    <option value="">Select Teacher</option>
                    ${teachers}
                </select>
            </div>
            <div class="modal-form-group">
                <label>Subject</label>
                <select name="subject" required>
                    <option value="">Select Subject</option>
                    ${subjects}
                </select>
            </div>
        `;
    }

    /**
     * Generate subject form HTML
     */
    getSubjectForm(id = null) {
        const subject = id ? this.data.subjects.find(s => s.id === id) : null;
        return `
            <div class="modal-form-group">
                <label>Subject Name</label>
                <input type="text" name="name" value="${subject ? subject.name : ''}" required>
            </div>
            <div class="modal-form-group">
                <label>Description</label>
                <textarea name="description" rows="3" required>${subject ? subject.description : ''}</textarea>
            </div>
        `;
    }

    /**
     * Generate attendance form HTML
     */
    getAttendanceForm(id = null) {
        const attendance = id ? this.data.attendance.find(a => a.id === id) : null;
        const students = this.data.students.map(s => 
            `<option value="${s.id}" ${attendance && attendance.student === s.id ? 'selected' : ''}>${s.first_name} ${s.last_name}</option>`
        ).join('');
        const classes = this.data.classes.map(cls => 
            `<option value="${cls.id}" ${attendance && attendance.class_obj === cls.id ? 'selected' : ''}>${cls.name}</option>`
        ).join('');

        return `
            <div class="modal-form-group">
                <label>Student</label>
                <select name="student" required>
                    <option value="">Select Student</option>
                    ${students}
                </select>
            </div>
            <div class="modal-form-group">
                <label>Class</label>
                <select name="class_obj" required>
                    <option value="">Select Class</option>
                    ${classes}
                </select>
            </div>
            <div class="modal-form-group">
                <label>Date</label>
                <input type="date" name="date" value="${attendance ? attendance.date : new Date().toISOString().split('T')[0]}" required>
            </div>
            <div class="modal-form-group">
                <label>Status</label>
                <select name="status" required>
                    <option value="Present" ${attendance && attendance.status === 'Present' ? 'selected' : ''}>Present</option>
                    <option value="Absent" ${attendance && attendance.status === 'Absent' ? 'selected' : ''}>Absent</option>
                </select>
            </div>
        `;
    }

    /**
     * Generate exam form HTML
     */
    getExamForm(id = null) {
        const exam = id ? this.data.exams.find(e => e.id === id) : null;
        const subjects = this.data.subjects.map(s => 
            `<option value="${s.id}" ${exam && exam.subject === s.id ? 'selected' : ''}>${s.name}</option>`
        ).join('');

        return `
            <div class="modal-form-group">
                <label>Subject</label>
                <select name="subject" required>
                    <option value="">Select Subject</option>
                    ${subjects}
                </select>
            </div>
            <div class="modal-form-group">
                <label>Date</label>
                <input type="date" name="date" value="${exam ? exam.date : new Date().toISOString().split('T')[0]}" required>
            </div>
            <div class="modal-form-group">
                <label>Total Marks</label>
                <input type="number" name="total_marks" value="${exam ? exam.total_marks : 100}" required>
            </div>
        `;
    }

    /**
     * Generate result form HTML
     */
    getResultForm(id = null) {
        const result = id ? this.data.results.find(r => r.id === id) : null;
        const students = this.data.students.map(s => 
            `<option value="${s.id}" ${result && result.student === s.id ? 'selected' : ''}>${s.first_name} ${s.last_name}</option>`
        ).join('');
        const exams = this.data.exams.map(e => {
            const subject = this.data.subjects.find(s => s.id === e.subject);
            return `<option value="${e.id}" ${result && result.exam === e.id ? 'selected' : ''}>${subject ? subject.name : 'N/A'} - ${e.date}</option>`;
        }).join('');

        return `
            <div class="modal-form-group">
                <label>Student</label>
                <select name="student" required>
                    <option value="">Select Student</option>
                    ${students}
                </select>
            </div>
            <div class="modal-form-group">
                <label>Exam</label>
                <select name="exam" required>
                    <option value="">Select Exam</option>
                    ${exams}
                </select>
            </div>
            <div class="modal-form-group">
                <label>Marks Obtained</label>
                <input type="number" name="marks_obtained" value="${result ? result.marks_obtained : ''}" required>
            </div>
        `;
    }

    /**
     * Generate fee form HTML
     */
    getFeeForm(id = null) {
        const fee = id ? this.data.fees.find(f => f.id === id) : null;
        const students = this.data.students.map(s => 
            `<option value="${s.id}" ${fee && fee.student === s.id ? 'selected' : ''}>${s.first_name} ${s.last_name}</option>`
        ).join('');

        return `
            <div class="modal-form-group">
                <label>Student</label>
                <select name="student" required>
                    <option value="">Select Student</option>
                    ${students}
                </select>
            </div>
            <div class="modal-form-group">
                <label>Amount</label>
                <input type="number" name="amount" value="${fee ? fee.amount : 1000}" required>
            </div>
            <div class="modal-form-group">
                <label>Status</label>
                <select name="status" required>
                    <option value="Paid" ${fee && fee.status === 'Paid' ? 'selected' : ''}>Paid</option>
                    <option value="Pending" ${fee && fee.status === 'Pending' ? 'selected' : ''}>Pending</option>
                </select>
            </div>
        `;
    }

    /**
     * ========================================
     * DATA SAVE METHODS
     * ========================================
     */

    /**
     * Save form data to appropriate data array
     */
    saveFormData(type, id) {
        const form = document.getElementById('modalForm');
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        switch(type) {
            case 'students':
                this.saveStudent(data, id);
                break;
            case 'teachers':
                this.saveTeacher(data, id);
                break;
            case 'classes':
                this.saveClass(data, id);
                break;
            case 'subjects':
                this.saveSubject(data, id);
                break;
            case 'attendance':
                this.saveAttendance(data, id);
                break;
            case 'exams':
                this.saveExam(data, id);
                break;
            case 'results':
                this.saveResult(data, id);
                break;
            case 'fees':
                this.saveFee(data, id);
                break;
        }
    }

    /**
     * Save student data
     */
    saveStudent(data, id) {
        if (id) {
            const index = this.data.students.findIndex(s => s.id === parseInt(id));
            if (index !== -1) {
                this.data.students[index] = { ...this.data.students[index], ...data };
            }
        } else {
            const newStudent = {
                id: this.data.students.length + 1,
                ...data
            };
            this.data.students.push(newStudent);
        }
        this.saveData();
        this.loadStudents();
        this.closeModal();
        this.showToast(`Student ${id ? 'updated' : 'added'} successfully!`, 'success');
    }

    /**
     * Save teacher data
     */
    saveTeacher(data, id) {
        if (id) {
            const index = this.data.teachers.findIndex(t => t.id === parseInt(id));
            if (index !== -1) {
                this.data.teachers[index] = { ...this.data.teachers[index], ...data };
            }
        } else {
            const newTeacher = {
                id: this.data.teachers.length + 1,
                ...data
            };
            this.data.teachers.push(newTeacher);
        }
        this.saveData();
        this.loadTeachers();
        this.closeModal();
        this.showToast(`Teacher ${id ? 'updated' : 'added'} successfully!`, 'success');
    }

    /**
     * Save class data
     */
    saveClass(data, id) {
        if (id) {
            const index = this.data.classes.findIndex(c => c.id === parseInt(id));
            if (index !== -1) {
                this.data.classes[index] = { ...this.data.classes[index], ...data };
            }
        } else {
            const newClass = {
                id: this.data.classes.length + 1,
                ...data
            };
            this.data.classes.push(newClass);
        }
        this.saveData();
        this.loadClasses();
        this.closeModal();
        this.showToast(`Class ${id ? 'updated' : 'added'} successfully!`, 'success');
    }

    /**
     * Save subject data
     */
    saveSubject(data, id) {
        if (id) {
            const index = this.data.subjects.findIndex(s => s.id === parseInt(id));
            if (index !== -1) {
                this.data.subjects[index] = { ...this.data.subjects[index], ...data };
            }
        } else {
            const newSubject = {
                id: this.data.subjects.length + 1,
                ...data
            };
            this.data.subjects.push(newSubject);
        }
        this.saveData();
        this.loadSubjects();
        this.closeModal();
        this.showToast(`Subject ${id ? 'updated' : 'added'} successfully!`, 'success');
    }

    /**
     * Save attendance data
     */
    saveAttendance(data, id) {
        if (id) {
            const index = this.data.attendance.findIndex(a => a.id === parseInt(id));
            if (index !== -1) {
                this.data.attendance[index] = { ...this.data.attendance[index], ...data };
            }
        } else {
            const newAttendance = {
                id: this.data.attendance.length + 1,
                ...data
            };
            this.data.attendance.push(newAttendance);
        }
        this.saveData();
        this.loadAttendance();
        this.closeModal();
        this.showToast(`Attendance ${id ? 'updated' : 'marked'} successfully!`, 'success');
    }

    /**
     * Save exam data
     */
    saveExam(data, id) {
        if (id) {
            const index = this.data.exams.findIndex(e => e.id === parseInt(id));
            if (index !== -1) {
                this.data.exams[index] = { ...this.data.exams[index], ...data };
            }
        } else {
            const newExam = {
                id: this.data.exams.length + 1,
                ...data
            };
            this.data.exams.push(newExam);
        }
        this.saveData();
        this.loadExams();
        this.closeModal();
        this.showToast(`Exam ${id ? 'updated' : 'added'} successfully!`, 'success');
    }

    /**
     * Save result data
     */
    saveResult(data, id) {
        if (id) {
            const index = this.data.results.findIndex(r => r.id === parseInt(id));
            if (index !== -1) {
                this.data.results[index] = { ...this.data.results[index], ...data };
            }
        } else {
            const newResult = {
                id: this.data.results.length + 1,
                ...data
            };
            this.data.results.push(newResult);
        }
        this.saveData();
        this.loadResults();
        this.closeModal();
        this.showToast(`Result ${id ? 'updated' : 'added'} successfully!`, 'success');
    }

    /**
     * Save fee data
     */
    saveFee(data, id) {
        if (id) {
            const index = this.data.fees.findIndex(f => f.id === parseInt(id));
            if (index !== -1) {
                this.data.fees[index] = { ...this.data.fees[index], ...data };
            }
        } else {
            const newFee = {
                id: this.data.fees.length + 1,
                ...data
            };
            this.data.fees.push(newFee);
        }
        this.saveData();
        this.loadFees();
        this.closeModal();
        this.showToast(`Fee ${id ? 'updated' : 'added'} successfully!`, 'success');
    }

    /**
     * ========================================
     * EDIT METHODS
     * ========================================
     */

    editStudent(id) {
        this.openModal('students', id);
    }

    editTeacher(id) {
        this.openModal('teachers', id);
    }

    editClass(id) {
        this.openModal('classes', id);
    }

    editSubject(id) {
        this.openModal('subjects', id);
    }

    editAttendance(id) {
        this.openModal('attendance', id);
    }

    editExam(id) {
        this.openModal('exams', id);
    }

    editResult(id) {
        this.openModal('results', id);
    }

    editFee(id) {
        this.openModal('fees', id);
    }

    /**
     * ========================================
     * DELETE METHODS
     * ========================================
     */

    deleteStudent(id) {
        if (confirm('Are you sure you want to delete this student?')) {
            this.data.students = this.data.students.filter(s => s.id !== parseInt(id));
            this.saveData();
            this.loadStudents();
            this.showToast('Student deleted successfully!', 'success');
        }
    }

    deleteTeacher(id) {
        if (confirm('Are you sure you want to delete this teacher?')) {
            this.data.teachers = this.data.teachers.filter(t => t.id !== parseInt(id));
            this.saveData();
            this.loadTeachers();
            this.showToast('Teacher deleted successfully!', 'success');
        }
    }

    deleteClass(id) {
        if (confirm('Are you sure you want to delete this class?')) {
            this.data.classes = this.data.classes.filter(c => c.id !== parseInt(id));
            this.saveData();
            this.loadClasses();
            this.showToast('Class deleted successfully!', 'success');
        }
    }

    deleteSubject(id) {
        if (confirm('Are you sure you want to delete this subject?')) {
            this.data.subjects = this.data.subjects.filter(s => s.id !== parseInt(id));
            this.saveData();
            this.loadSubjects();
            this.showToast('Subject deleted successfully!', 'success');
        }
    }

    deleteAttendance(id) {
        if (confirm('Are you sure you want to delete this attendance record?')) {
            this.data.attendance = this.data.attendance.filter(a => a.id !== parseInt(id));
            this.saveData();
            this.loadAttendance();
            this.showToast('Attendance record deleted successfully!', 'success');
        }
    }

    deleteExam(id) {
        if (confirm('Are you sure you want to delete this exam?')) {
            this.data.exams = this.data.exams.filter(e => e.id !== parseInt(id));
            this.saveData();
            this.loadExams();
            this.showToast('Exam deleted successfully!', 'success');
        }
    }

    deleteResult(id) {
        if (confirm('Are you sure you want to delete this result?')) {
            this.data.results = this.data.results.filter(r => r.id !== parseInt(id));
            this.saveData();
            this.loadResults();
            this.showToast('Result deleted successfully!', 'success');
        }
    }

    deleteFee(id) {
        if (confirm('Are you sure you want to delete this fee record?')) {
            this.data.fees = this.data.fees.filter(f => f.id !== parseInt(id));
            this.saveData();
            this.loadFees();
            this.showToast('Fee record deleted successfully!', 'success');
        }
    }

    /**
     * ========================================
     * STUDENT-SPECIFIC METHODS
     * ========================================
     */

    /**
     * Edit student profile
     */
    editProfile() {
        this.showToast('Profile editing coming soon!', 'info');
    }

    /**
     * Submit assignment
     */
    submitAssignment(id) {
        const assignment = this.data.assignments.find(a => a.id === id);
        if (assignment) {
            assignment.status = 'submitted';
            this.saveData();
            this.loadAssignmentsPage();
            this.showToast('Assignment submitted successfully!', 'success');
        }
    }

    /**
     * View assignment details
     */
    viewAssignmentDetails(id) {
        const assignment = this.data.assignments.find(a => a.id === id);
        if (assignment) {
            this.showToast(`Assignment: ${assignment.title} - ${assignment.description}`, 'info');
        }
    }

    /**
     * Navigate to previous week in timetable
     */
    previousWeek() {
        this.showToast('Previous week navigation coming soon!', 'info');
    }

    /**
     * Navigate to next week in timetable
     */
    nextWeek() {
        this.showToast('Next week navigation coming soon!', 'info');
    }

    /**
     * Upload assignment file
     */
    uploadAssignment() {
        this.showToast('File upload coming soon!', 'info');
    }

    /**
     * ========================================
     * UTILITY METHODS
     * ========================================
     */

    /**
     * Calculate grade from percentage
     */
    getGrade(percentage) {
        if (percentage >= 90) return 'A+';
        if (percentage >= 80) return 'A';
        if (percentage >= 70) return 'B';
        if (percentage >= 60) return 'C';
        if (percentage >= 50) return 'D';
        return 'F';
    }

    /**
     * Show toast notification
     */
    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'slideInUp 0.3s ease-out reverse';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }

    // ========================================
    // PROFILE IMAGE MANAGEMENT
    // ========================================

    // Upload profile image
    uploadProfileImage() {
        // Create file input
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.className = 'profile-image-input';
        
        fileInput.onchange = (event) => {
            const file = event.target.files[0];
            if (file) {
                // Validate file size (max 5MB)
                if (file.size > 5 * 1024 * 1024) {
                    this.showToast('Image size should be less than 5MB', 'error');
                    return;
                }
                
                // Validate file type
                if (!file.type.startsWith('image/')) {
                    this.showToast('Please select a valid image file', 'error');
                    return;
                }
                
                // Read and display image
                const reader = new FileReader();
                reader.onload = (e) => {
                    const imageUrl = e.target.result;
                    
                    // Save to localStorage
                    if (this.currentUser && this.currentUser.role === 'student') {
                        const student = this.data.students.find(s => s.id === this.currentStudent.id);
                        if (student) {
                            student.profileImage = imageUrl;
                            this.saveData();
                            this.updateProfileImages(imageUrl);
                            this.showToast('Profile picture updated successfully!', 'success');
                        }
                    }
                };
                reader.readAsDataURL(file);
            }
        };
        
        // Trigger file selection
        fileInput.click();
    }

    // Update profile images on all pages
    updateProfileImages(imageUrl) {
        // Update dashboard profile image
        const dashboardImage = document.getElementById('dashboardProfileImage');
        const dashboardIcon = document.getElementById('dashboardProfileIcon');
        
        if (dashboardImage && dashboardIcon) {
            if (imageUrl) {
                dashboardImage.src = imageUrl;
                dashboardImage.style.display = 'block';
                dashboardIcon.style.display = 'none';
            } else {
                dashboardImage.style.display = 'none';
                dashboardIcon.style.display = 'block';
            }
        }
        
        // Update profile page image
        const profilePageImage = document.getElementById('profilePageImage');
        const profilePageIcon = document.getElementById('profilePageIcon');
        
        if (profilePageImage && profilePageIcon) {
            if (imageUrl) {
                profilePageImage.src = imageUrl;
                profilePageImage.style.display = 'block';
                profilePageIcon.style.display = 'none';
            } else {
                profilePageImage.style.display = 'none';
                profilePageIcon.style.display = 'block';
            }
        }
    }

    // Load existing profile image
    loadProfileImage() {
        if (this.currentUser && this.currentUser.role === 'student') {
            const student = this.data.students.find(s => s.id === this.currentStudent.id);
            if (student && student.profileImage) {
                this.updateProfileImages(student.profileImage);
            }
        }
    }

    // Remove profile image
    removeProfileImage() {
        if (this.currentUser && this.currentUser.role === 'student') {
            const student = this.data.students.find(s => s.id === this.currentStudent.id);
            if (student) {
                student.profileImage = null;
                this.saveData();
                this.updateProfileImages(null);
                this.showToast('Profile picture removed', 'info');
            }
        }
    }
}

// ========================================
// INITIALIZE THE APPLICATION
// ========================================

// Create global instance of the education management system
const eduManage = new EduManageSystem();
