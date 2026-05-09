# 🔥 FireHire LMS

> **An AI-powered Learning Management System for job interview prep, built with Google Apps Script + Glassmorphism Design**

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Google Apps Script](https://img.shields.io/badge/Google%20Apps%20Script-red?logo=google)

---

## 🎯 About

FireHire LMS is a comprehensive learning management system designed specifically for **interview preparation training**. Students learn through structured courses, take auto-graded quizzes, and get real-time feedback. Trainers manage batches and create questions without touching spreadsheets.

**Perfect for:**
- 👥 Tech bootcamps
- 🏢 Corporate training programs
- 🎓 Educational institutions
- 💼 Career coaching platforms

---

## ✨ Key Features

### 🎓 Student Experience
- **Progressive Course Structure** - 2 weeks × 3 sessions each
- **Session Unlock Logic** - Unlocks at 8 PM + after completing previous session
- **Embedded Videos** - YouTube integration in every session
- **Auto-Graded Quizzes** - Instant feedback with explanations
- **Progress Tracking** - Visual progress bars and completion stats
- **Reflection Prompts** - Built-in journaling for each session
- **Mobile Responsive** - Works perfectly on phones and tablets

### 👨‍🏫 Trainer Dashboard
- **Batch Management** - View assigned students and schedules
- **Question Creation** - Add MCQ and open-ended questions via web UI (no spreadsheets!)
- **Student Performance** - Track quiz scores and completion rates
- **Course Content** - Upload trainer notes and learning objectives

### 🛠️ Admin Dashboard
- **User Management** - Add/delete students, assign to batches
- **Analytics** - Real-time stats (students, batches, questions, progress)
- **Question Bank** - Complete library of all questions
- **Performance Reports** - Student-by-student breakdown with progress bars
- **Quiz Results** - Detailed performance by week and question

### 🔗 GitHub Integration
- **Bug Reporting** - Students report issues directly from the app
- **Feature Requests** - Suggestions automatically become GitHub issues
- **Community-Driven** - Transparent development process

---

## 🚀 Quick Start

### Prerequisites
- Google Account
- Google Sheet for data storage
- Basic understanding of Google Apps Script

### Setup (5 minutes)

**Step 1: Create Google Apps Script Project**
```
1. Go to script.google.com
2. Create New Project
3. Copy Code.gs contents
4. Create HTML file named "index" and copy index.html
```

**Step 2: Add Your Spreadsheet ID**
```javascript
// In Code.gs, line 14:
var SPREADSHEET_ID = "your-sheet-id-here";
```

**Step 3: Run Setup**
```
Select setupSheets() from dropdown and click Run
(Creates all 7 sheets automatically with sample data)
```

**Step 4: Deploy**
```
Click Deploy → New Deployment
Type: Web App
Execute as: Your email
Who has access: Anyone
Copy the deployment URL
```

**Step 5: Test Accounts**
```
Email: student@firehire.com | Password: FireHire2026 | Role: Student
Email: trainer@firehire.com | Password: FireHire2026 | Role: Trainer
Email: admin@firehire.com   | Password: FireHire2026 | Role: Admin
```

---

## 📊 Data Structure

### 7 Core Sheets

| Sheet | Purpose | Key Columns |
|-------|---------|------------|
| **Students** | User management | Email, Name, Role, Level, Batch_ID |
| **Batches** | Group training | Batch_ID, Trainer, Start/End Dates, Schedule |
| **Course_Structure** | Learning content | Week, Session, Title, Goal, Video_URL, Unlock_Time |
| **Weekly_Goals** | Week overviews | Level, Week, Title, Skills_Gained |
| **Questions_Bank** | Quiz content | Q_ID, Type, Question, Answer, Options, Hints |
| **Student_Progress** | Session tracking | Student_Email, Week, Session, Completed, Date |
| **Student_Answers** | Quiz responses | Timestamp, Student_Email, Q_ID, Answer, Score |

---

## 🎨 Design System

### Dark Glassmorphism Theme
```
Background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)
Glass Effect: rgba(15,23,42,0.6) + backdrop-filter blur
Primary Color: #6366f1 (Indigo)
Secondary Color: #06b6d4 (Cyan)
Typography: Syne (Display) + DM Sans (Body)
```

### Components
- ✅ Form inputs with focus glow
- ✅ Buttons with hover animations
- ✅ Toast notifications
- ✅ Modal dialogs
- ✅ Progress bars & rings
- ✅ Data tables with hover states
- ✅ Loading spinners

---

## 🔧 Customization

### Change Branding
```javascript
// In index.html, update:
<div class="login-logo-icon">🔥</div>
<div class="login-logo-text">Fire<span>Hire</span></div>
<div class="login-tagline">Your custom tagline</div>
```

### Modify Colors
```css
:root {
  --primary: #6366f1;      /* Change to your brand color */
  --secondary: #06b6d4;    /* Secondary accent */
  --success: #10b981;      /* Success color */
}
```

### Add Your Logo
Replace emoji (🔥) with:
- `<img src="logo.png" width="48">`
- Or update the emoji to match your brand

### Change Course Content
Edit these sheets:
- `Course_Structure` - Sessions, videos, descriptions
- `Weekly_Goals` - Week titles and learning outcomes
- `Questions_Bank` - Quiz questions and answers

---

## 📱 API Endpoints (Google Apps Script Functions)

### Authentication
```javascript
login(email, password) → {success, user{email, name, role, level}}
```

### Student Functions
```javascript
getCourseStructure(level) → {data: [sessions]}
getStudentProgress(email, level) → {data: [progress]}
getQuestionsForWeek(level, week) → {data: [questions]}
submitQuizAnswers(email, week, answersJson) → {data: {percentage, results}}
markSessionComplete(email, level, week, session, reflection) → {success}
```

### Admin Functions
```javascript
getAllStudents() → {data: [students]}
addStudent(email, name, role, level, batchId) → {success}
deleteStudent(email) → {success}
getAllBatches() → {data: [batches]}
getAllQuestions() → {data: [questions]}
getAllStudentPerformance() → {data: [performance]}
getStudentQuizResults(email) → {data: [results]}
getAdminStats() → {data: {totalStudents, totalTrainers, etc}}
```

### Trainer Functions
```javascript
getBatchesForTrainer(email) → {data: [batches]}
addQuestion(type, text, answer, options, hint, explanation, week) → {success, qId}
```

### GitHub Integration
```javascript
getGithubConfig() → {owner, repo, enabled, url}
reportBugToGithub(description, email) → {success, issueUrl, issueNumber}
suggestFeatureToGithub(description, email) → {success, issueUrl}
```

---

## 🔐 Security

- ✅ Client-side password validation
- ✅ Role-based access control (Admin/Trainer/Student)
- ✅ Spreadsheet ID not exposed in code
- ✅ CORS-safe (works in iframes)
- ✅ GitHub token in Code.gs (not exposed to frontend)

**⚠️ Important:**
- Change the password `FireHire2026` in production
- Don't commit `.clasp.json` with credentials
- Use environment variables for sensitive data

---

## 📖 Documentation

- **[GitHub Integration Guide](./GITHUB_SETUP.md)** - How to connect to GitHub
- **[API Reference](./API.md)** - Detailed function documentation
- **[Design System](./DESIGN.md)** - Color, typography, components

---

## 🤝 Contributing

We love contributions! Here's how:

```bash
1. Fork the repository
2. Create your feature branch: git checkout -b feature/AmazingFeature
3. Commit your changes: git commit -m 'Add AmazingFeature'
4. Push to the branch: git push origin feature/AmazingFeature
5. Open a Pull Request
```

### Ideas for Contributions
- 🎨 UI improvements
- 📱 Better mobile experience
- 🌐 Multi-language support
- 🎯 New quiz types (drag-and-drop, matching, etc)
- 📊 Advanced analytics
- 🔔 Email notifications

---

## 🐛 Bug Reports & Feature Requests

### In-App (Easiest)
Students/Admins can report bugs directly:
1. Click "Feedback & Bugs" (students) or "GitHub Integration" (admins)
2. Describe the issue
3. Click "Submit to GitHub"

### Direct GitHub
[Open an issue](../../issues) with details:
- **Bug Reports**: What happened, expected behavior, steps to reproduce
- **Feature Requests**: Use case, desired behavior, mockups if possible

---

## 📈 Roadmap

- [ ] Email notifications for session unlocks
- [ ] Mobile app (React Native)
- [ ] Video recording/playback of sessions
- [ ] Peer code reviews
- [ ] Gamification (badges, leaderboards)
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Dark/Light mode toggle
- [ ] Export reports to PDF
- [ ] Integration with Calendly for 1-on-1s

---

## 📦 Tech Stack

- **Backend**: Google Apps Script (JavaScript)
- **Frontend**: HTML5 + CSS3 + Vanilla JS
- **Data**: Google Sheets
- **Design**: Glassmorphism + Custom CSS
- **Fonts**: Syne (Display) + DM Sans (Body)
- **Icons**: Emojis (no dependencies!)

---

## 📊 Project Stats

```
📄 Files: 2 (Code.gs, index.html)
📝 Lines of Code: ~1700
🎨 CSS: ~800 lines
⚡ No external dependencies
📱 Responsive design
🚀 Zero build process
```

---

## 💡 Tips for Success

### For Students
- ✅ Complete sessions in order
- ✅ Watch the videos fully
- ✅ Take notes while learning
- ✅ Attempt quizzes after watching
- ✅ Review explanations for wrong answers

### For Trainers
- ✅ Add context-specific questions
- ✅ Include hints in questions
- ✅ Write clear explanations
- ✅ Update content based on student feedback
- ✅ Celebrate student progress

### For Admins
- ✅ Monitor weekly performance metrics
- ✅ Identify struggling students early
- ✅ Adjust curriculum based on quiz data
- ✅ Keep GitHub issues organized
- ✅ Encourage user feedback

---

## 📞 Support

- 📧 Email: support@firehire.com
- 💬 Discussions: [GitHub Discussions](../../discussions)
- 🐛 Issues: [GitHub Issues](../../issues)
- 📚 Docs: [See Documentation](#-documentation)

---

## 📄 License

This project is licensed under the MIT License - see [LICENSE](./LICENSE) file for details.

---

## 🙏 Acknowledgments

- Google Apps Script team for the amazing platform
- Inspiration from modern LMS platforms
- Our amazing community of users and contributors

---

## 🌟 Show Your Support

If you find FireHire LMS helpful, please:
- ⭐ Star this repository
- 🔗 Share with friends and colleagues
- 💬 Leave feedback and suggestions
- 🤝 Contribute to the project

---

<div align="center">

**Built with ❤️ by the FireHire Team**

[Website](https://firehire.com) • [Twitter](https://twitter.com/firehirelms) • [Discord](https://discord.gg/firehire)

*Making interview prep accessible to everyone* 🚀

</div>
