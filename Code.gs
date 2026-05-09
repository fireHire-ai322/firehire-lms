// ============================================================
// FireHire LMS - Code.gs
// Spreadsheet ID: 1PkXlSooCrj32S3smRtVtgN0hUAu70EosZJ5tKW80OK8
// 
// FEATURES:
// ✅ Role-based authentication (Admin, Trainer, Student)
// ✅ Student course with locked sessions (unlocks at 8PM + after completion)
// ✅ Quiz system with auto-grading and instant feedback
// ✅ Trainer can add questions via web interface
// ✅ Admin dashboard with analytics and student management
// ✅ Admin can view quiz results by student and week
// ============================================================

var SPREADSHEET_ID = "1PbXilSooCrj32S3smRTvgNOhUAu70EosZJ5tKW80OK8";
var PASSWORD = "FireHire2026";

// GitHub Configuration
// 1. شغّل هذا الكود مباشرة في Console:

// 2. استبدل القيم بتاعتك
// 3. Run
// 4. Save Code.gs
// 5. Deploy جديد

// ─── Entry Point ────────────────────────────────────────────
function doGet(e) {
  return HtmlService.createHtmlOutputFromFile("index")
    .setTitle("FireHire LMS")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag("viewport", "width=device-width, initial-scale=1.0");
}

// ─── Spreadsheet Helper ──────────────────────────────────────
function getSpreadsheet() {
  return SpreadsheetApp.openById(SPREADSHEET_ID);
}

function getSheet(name) {
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName(name);
  if (!sheet) throw new Error("Sheet not found: " + name);
  return sheet;
}

// ─── Setup Sheets ────────────────────────────────────────────
function setupSheets() {
  try {
    var ss = getSpreadsheet();
    var existing = ss.getSheets().map(function(s){ return s.getName(); });

    // Helper to create or get sheet
    function ensureSheet(name, headers) {
      var sheet;
      if (existing.indexOf(name) === -1) {
        sheet = ss.insertSheet(name);
      } else {
        sheet = ss.getSheetByName(name);
      }
      if (sheet.getLastRow() === 0) {
        sheet.appendRow(headers);
        sheet.getRange(1, 1, 1, headers.length)
          .setBackground("#1e1b4b")
          .setFontColor("#a5b4fc")
          .setFontWeight("bold");
      }
      return sheet;
    }

    // 1. Students
    ensureSheet("Students", ["Email","Name","Role","Level","Batch_ID","Join_Date"]);

    // 2. Batches
    ensureSheet("Batches", ["Batch_ID","Trainer_Name","Trainer_Email","Start_Date","End_Date","Schedule"]);

    // 3. Questions_Bank
    ensureSheet("Questions_Bank", ["Q_ID","Type","Question_Text","Correct_Answer","Options","Hint","Explanation","Week_Number"]);

    // 4. Student_Answers
    ensureSheet("Student_Answers", ["Timestamp","Student_Email","Q_ID","Answer","Score","Feedback","Week"]);

    // 5. Course_Structure
    ensureSheet("Course_Structure", ["Level","Week","Session","Session_Title","Session_Goal","Video_URL","Trainer_Notes","Student_Objectives","Unlock_Time"]);

    // 6. Student_Progress
    ensureSheet("Student_Progress", ["Student_Email","Level","Week","Session","Completed","Completion_Date","Video_Watched","Quiz_Score"]);

    // 7. Weekly_Goals
    ensureSheet("Weekly_Goals", ["Level","Week","Week_Title","Overall_Goal","Skills_Gained","Trainer_Focus"]);

    // Insert sample data
    _insertSampleData(ss);

    return { success: true, message: "All 7 sheets created successfully!" };
  } catch(e) {
    return { success: false, message: e.message };
  }
}

function _insertSampleData(ss) {
  var today = new Date();
  var fmt = function(d){ return Utilities.formatDate(d, Session.getScriptTimeZone(), "yyyy-MM-dd"); };

  // Students
  var studentsSheet = ss.getSheetByName("Students");
  if (studentsSheet.getLastRow() <= 1) {
    studentsSheet.appendRow(["student@firehire.com","Alex Johnson","Student","Beginner","BATCH-001",fmt(today)]);
    studentsSheet.appendRow(["trainer@firehire.com","Sarah Mitchell","Trainer","","BATCH-001",fmt(today)]);
    studentsSheet.appendRow(["admin@firehire.com","Omar Hassan","Admin","","","",fmt(today)]);
  }

  // Batches
  var batchSheet = ss.getSheetByName("Batches");
  if (batchSheet.getLastRow() <= 1) {
    var end = new Date(today); end.setDate(end.getDate()+14);
    batchSheet.appendRow(["BATCH-001","Sarah Mitchell","trainer@firehire.com",fmt(today),fmt(end),"Mon/Wed/Fri 7PM-9PM"]);
  }

  // Course Structure — Beginner, Week 1 & 2, 3 sessions each
  var courseSheet = ss.getSheetByName("Course_Structure");
  if (courseSheet.getLastRow() <= 1) {
    // Unlock times: Day 1, 3, 5 for Week 1; Day 8,10,12 for Week 2
    function unlockDate(daysAhead) {
      var d = new Date(today);
      d.setDate(d.getDate() + daysAhead);
      return Utilities.formatDate(d, Session.getScriptTimeZone(), "yyyy-MM-dd") + " 20:00:00";
    }

    var sessions = [
      // Week 1
      ["Beginner",1,1,"Introduction to Interviewing","Understand the anatomy of a tech interview","https://www.youtube.com/watch?v=dQw4w9WgXcQ",
       "Focus on communication as much as technical skills. First impressions count!",
       "Understand interview stages|Identify your strengths|Build your mindset", unlockDate(0)],
      ["Beginner",1,2,"Resume & LinkedIn Mastery","Craft a resume that gets you noticed","https://www.youtube.com/watch?v=dQw4w9WgXcQ",
       "Use the STAR method for bullet points. Quantify everything you can.",
       "Write ATS-friendly resume|Optimize LinkedIn profile|Craft your story", unlockDate(2)],
      ["Beginner",1,3,"Behavioral Questions Deep Dive","Master the art of storytelling in interviews","https://www.youtube.com/watch?v=dQw4w9WgXcQ",
       "Practice STAR out loud — it sounds different than in your head. Record yourself!",
       "Apply STAR framework|Handle tough behavioral Qs|Build a story bank", unlockDate(4)],
      // Week 2
      ["Beginner",2,1,"Technical Interview Foundations","Break down how to approach technical problems","https://www.youtube.com/watch?v=dQw4w9WgXcQ",
       "Think out loud. Interviewers want to see your process, not just the answer.",
       "Solve problems step-by-step|Communicate approach clearly|Handle hints gracefully", unlockDate(7)],
      ["Beginner",2,2,"Data Structures Essentials","Master the most common data structures used in interviews","https://www.youtube.com/watch?v=dQw4w9WgXcQ",
       "Arrays and hashmaps solve 80% of problems. Know them cold before anything else.",
       "Understand arrays & strings|Use hashmaps effectively|Recognize patterns", unlockDate(9)],
      ["Beginner",2,3,"Mock Interview & Feedback","Put it all together with a real mock interview session","https://www.youtube.com/watch?v=dQw4w9WgXcQ",
       "Embrace the discomfort — it means you're growing. Every mock makes you better.",
       "Perform under pressure|Receive & apply feedback|Build interview stamina", unlockDate(11)],
    ];
    sessions.forEach(function(row){ courseSheet.appendRow(row); });
  }

  // Weekly Goals
  var goalsSheet = ss.getSheetByName("Weekly_Goals");
  if (goalsSheet.getLastRow() <= 1) {
    goalsSheet.appendRow(["Beginner",1,"Getting Started","Build the foundation for your job search","Resume writing|LinkedIn optimization|STAR method|Interview mindset","Help students overcome imposter syndrome and believe in their potential"]);
    goalsSheet.appendRow(["Beginner",2,"Technical Foundations","Develop core technical interview skills","Problem solving|Data structures|Communication|Mock interviews","Focus on process over answers — guide students to think out loud"]);
  }

  // Questions Bank
  var qSheet = ss.getSheetByName("Questions_Bank");
  if (qSheet.getLastRow() <= 1) {
    qSheet.appendRow(["Q001","MCQ","What does ATS stand for in recruiting?","Applicant Tracking System","Applicant Tracking System|Application Testing Suite|Advanced Talent Search|Automated Task System","Think about what HR teams use to filter resumes","ATS (Applicant Tracking System) software scans resumes for keywords before a human sees them.",1]);
    qSheet.appendRow(["Q002","MCQ","Which framework is best for behavioral interview answers?","STAR","STAR|LOOP|CARE|FACT","Situation, Task, Action, Result — structure your stories clearly.","STAR stands for Situation, Task, Action, Result — it's the gold standard for behavioral questions.",1]);
    qSheet.appendRow(["Q003","MCQ","What should you do FIRST when given a coding problem in an interview?","Clarify requirements and ask questions","Jump straight to coding|Clarify requirements and ask questions|Ask for hints|Take a long time to think","It's not rushing to code — understanding the problem is key!","Taking time to clarify requirements shows communication skills and prevents coding the wrong solution.",1]);
    qSheet.appendRow(["Q004","MCQ","What is the time complexity of searching in a hashmap?","O(1)","O(1)|O(n)|O(log n)|O(n²)","Think about direct access by key","Hashmaps provide O(1) average-case lookup by using a hash function to map keys to indices directly.",2]);
    qSheet.appendRow(["Q005","MCQ","Which data structure would you use to check if a word is in a dictionary quickly?","Hashmap or Set","Array|Linked List|Hashmap or Set|Binary Search Tree","Which has fastest lookup?","Hashmaps and Sets provide O(1) average-case lookup, making them ideal for dictionary-like operations.",2]);
    qSheet.appendRow(["Q006","Open","What is the most important thing to remember when solving interview problems?","Communication","","Always explain your approach","Communicating your thinking process is more important than getting the solution immediately. Interviewers want to understand how you think.",2]);
  }
}

// ─── Authentication ──────────────────────────────────────────
function login(email, password) {
  try {
    if (password !== PASSWORD) {
      return { success: false, message: "Incorrect password." };
    }
    var sheet = getSheet("Students");
    var data = sheet.getDataRange().getValues();
    for (var i = 1; i < data.length; i++) {
      if (data[i][0].toString().toLowerCase().trim() === email.toLowerCase().trim()) {
        return {
          success: true,
          user: {
            email: data[i][0],
            name: data[i][1],
            role: data[i][2],
            level: data[i][3] || "Beginner",
            batchId: data[i][4],
            joinDate: data[i][5] ? data[i][5].toString() : ""
          }
        };
      }
    }
    return { success: false, message: "Email not found in the system." };
  } catch(e) {
    return { success: false, message: e.message };
  }
}

// ─── Students ────────────────────────────────────────────────
function getAllStudents() {
  try {
    var sheet = getSheet("Students");
    var data = sheet.getDataRange().getValues();
    var students = [];
    for (var i = 1; i < data.length; i++) {
      if (data[i][0]) {
        students.push({
          email: data[i][0], name: data[i][1], role: data[i][2],
          level: data[i][3], batchId: data[i][4],
          joinDate: data[i][5] ? data[i][5].toString() : ""
        });
      }
    }
    return { success: true, data: students };
  } catch(e) {
    return { success: false, message: e.message };
  }
}

function addStudent(email, name, role, level, batchId) {
  try {
    var sheet = getSheet("Students");
    var data = sheet.getDataRange().getValues();
    for (var i = 1; i < data.length; i++) {
      if (data[i][0].toString().toLowerCase() === email.toLowerCase()) {
        return { success: false, message: "Student already exists." };
      }
    }
    var today = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd");
    sheet.appendRow([email, name, role || "Student", level || "Beginner", batchId || "", today]);
    return { success: true, message: "Student added successfully." };
  } catch(e) {
    return { success: false, message: e.message };
  }
}

function deleteStudent(email) {
  try {
    var sheet = getSheet("Students");
    var data = sheet.getDataRange().getValues();
    for (var i = 1; i < data.length; i++) {
      if (data[i][0].toString().toLowerCase() === email.toLowerCase()) {
        sheet.deleteRow(i + 1);
        return { success: true, message: "Student deleted." };
      }
    }
    return { success: false, message: "Student not found." };
  } catch(e) {
    return { success: false, message: e.message };
  }
}

// ─── Batches ─────────────────────────────────────────────────
function getAllBatches() {
  try {
    var sheet = getSheet("Batches");
    var data = sheet.getDataRange().getValues();
    var batches = [];
    for (var i = 1; i < data.length; i++) {
      if (data[i][0]) {
        batches.push({
          batchId: data[i][0], trainerName: data[i][1], trainerEmail: data[i][2],
          startDate: data[i][3] ? data[i][3].toString() : "",
          endDate: data[i][4] ? data[i][4].toString() : "",
          schedule: data[i][5]
        });
      }
    }
    return { success: true, data: batches };
  } catch(e) {
    return { success: false, message: e.message };
  }
}

function getBatchesForTrainer(trainerEmail) {
  try {
    var batchSheet = getSheet("Batches");
    var batchData = batchSheet.getDataRange().getValues();
    var studentSheet = getSheet("Students");
    var studentData = studentSheet.getDataRange().getValues();

    var batches = [];
    for (var i = 1; i < batchData.length; i++) {
      if (batchData[i][2].toString().toLowerCase() === trainerEmail.toLowerCase()) {
        var batchId = batchData[i][0];
        var students = [];
        for (var j = 1; j < studentData.length; j++) {
          if (studentData[j][4] === batchId && studentData[j][2] === "Student") {
            students.push({ email: studentData[j][0], name: studentData[j][1], level: studentData[j][3] });
          }
        }
        batches.push({
          batchId: batchId, trainerName: batchData[i][1],
          startDate: batchData[i][3] ? batchData[i][3].toString() : "",
          endDate: batchData[i][4] ? batchData[i][4].toString() : "",
          schedule: batchData[i][5], students: students
        });
      }
    }
    return { success: true, data: batches };
  } catch(e) {
    return { success: false, message: e.message };
  }
}

// ─── Questions Bank ──────────────────────────────────────────
function getAllQuestions() {
  try {
    var sheet = getSheet("Questions_Bank");
    var data = sheet.getDataRange().getValues();
    var questions = [];
    for (var i = 1; i < data.length; i++) {
      if (data[i][0]) {
        questions.push({
          qId: data[i][0], type: data[i][1], question: data[i][2],
          correctAnswer: data[i][3], options: data[i][4] ? data[i][4].toString().split("|") : [],
          hint: data[i][5], explanation: data[i][6], week: data[i][7]
        });
      }
    }
    return { success: true, data: questions };
  } catch(e) {
    return { success: false, message: e.message };
  }
}

function addQuestion(type, questionText, correctAnswer, options, hint, explanation, weekNumber) {
  try {
    var sheet = getSheet("Questions_Bank");
    var lastRow = sheet.getLastRow();
    var qId = "Q" + String(lastRow).padStart(3, "0");
    sheet.appendRow([qId, type, questionText, correctAnswer, options, hint, explanation, weekNumber]);
    return { success: true, message: "Question added successfully.", qId: qId };
  } catch(e) {
    return { success: false, message: e.message };
  }
}

// ─── Course Structure ────────────────────────────────────────
function getCourseStructure(level) {
  try {
    var sheet = getSheet("Course_Structure");
    var data = sheet.getDataRange().getValues();
    var sessions = [];
    for (var i = 1; i < data.length; i++) {
      if (data[i][0].toString().toLowerCase() === level.toLowerCase()) {
        sessions.push({
          level: data[i][0], week: data[i][1], session: data[i][2],
          title: data[i][3], goal: data[i][4], videoUrl: data[i][5],
          trainerNotes: data[i][6], objectives: data[i][7] ? data[i][7].toString().split("|") : [],
          unlockTime: data[i][8] ? data[i][8].toString() : ""
        });
      }
    }
    return { success: true, data: sessions };
  } catch(e) {
    return { success: false, message: e.message };
  }
}

// ─── Student Progress ────────────────────────────────────────
function getStudentProgress(studentEmail, level) {
  try {
    var sheet = getSheet("Student_Progress");
    var data = sheet.getDataRange().getValues();
    var progress = [];
    for (var i = 1; i < data.length; i++) {
      if (data[i][0].toString().toLowerCase() === studentEmail.toLowerCase() &&
          data[i][1].toString().toLowerCase() === level.toLowerCase()) {
        progress.push({
          email: data[i][0], level: data[i][1], week: data[i][2], session: data[i][3],
          completed: data[i][4], completionDate: data[i][5] ? data[i][5].toString() : "",
          videoWatched: data[i][6], quizScore: data[i][7]
        });
      }
    }
    return { success: true, data: progress };
  } catch(e) {
    return { success: false, message: e.message };
  }
}

function markSessionComplete(studentEmail, level, week, session, reflection) {
  try {
    var sheet = getSheet("Student_Progress");
    var data = sheet.getDataRange().getValues();
    var now = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm:ss");

    // Check if row exists
    for (var i = 1; i < data.length; i++) {
      if (data[i][0].toString().toLowerCase() === studentEmail.toLowerCase() &&
          data[i][1].toString() === level.toString() &&
          data[i][2].toString() === week.toString() &&
          data[i][3].toString() === session.toString()) {
        // Update existing
        sheet.getRange(i+1, 5).setValue("YES");
        sheet.getRange(i+1, 6).setValue(now);
        sheet.getRange(i+1, 7).setValue("YES");
        // Store reflection in a note
        if (reflection) {
          sheet.getRange(i+1, 8).setNote(reflection);
        }
        return { success: true, message: "Session marked complete!" };
      }
    }

    // Insert new row
    sheet.appendRow([studentEmail, level, week, session, "YES", now, "YES", 0]);
    return { success: true, message: "Session marked complete!" };
  } catch(e) {
    return { success: false, message: e.message };
  }
}

function getAllStudentPerformance() {
  try {
    var progressSheet = getSheet("Student_Progress");
    var progressData = progressSheet.getDataRange().getValues();
    var courseSheet = getSheet("Course_Structure");
    var courseData = courseSheet.getDataRange().getValues();

    // Total sessions count
    var totalSessions = courseData.length - 1;

    // Group by student
    var studentMap = {};
    for (var i = 1; i < progressData.length; i++) {
      var email = progressData[i][0];
      if (!studentMap[email]) studentMap[email] = { completed: 0 };
      if (progressData[i][4] === "YES") studentMap[email].completed++;
    }

    var studentSheet = getSheet("Students");
    var studentData = studentSheet.getDataRange().getValues();
    var result = [];
    for (var j = 1; j < studentData.length; j++) {
      if (studentData[j][2] === "Student") {
        var email2 = studentData[j][0];
        var completed = studentMap[email2] ? studentMap[email2].completed : 0;
        var pct = totalSessions > 0 ? Math.round((completed / totalSessions) * 100) : 0;
        result.push({
          email: email2, name: studentData[j][1], level: studentData[j][3],
          batchId: studentData[j][4], completed: completed,
          total: totalSessions, progress: pct
        });
      }
    }
    return { success: true, data: result };
  } catch(e) {
    return { success: false, message: e.message };
  }
}

// ─── Weekly Goals ────────────────────────────────────────────
function getWeeklyGoals(level) {
  try {
    var sheet = getSheet("Weekly_Goals");
    var data = sheet.getDataRange().getValues();
    var goals = [];
    for (var i = 1; i < data.length; i++) {
      if (data[i][0].toString().toLowerCase() === level.toLowerCase()) {
        goals.push({
          level: data[i][0], week: data[i][1], weekTitle: data[i][2],
          overallGoal: data[i][3],
          skillsGained: data[i][4] ? data[i][4].toString().split("|") : [],
          trainerFocus: data[i][5]
        });
      }
    }
    return { success: true, data: goals };
  } catch(e) {
    return { success: false, message: e.message };
  }
}

// ═══════════════════════════════════════════
//  GITHUB INTEGRATION
// ═══════════════════════════════════════════

function getGithubConfig() {
  return {
    owner: GITHUB_CONFIG.OWNER,
    repo: GITHUB_CONFIG.REPO,
    enabled: GITHUB_CONFIG.ENABLED,
    url: "https://github.com/" + GITHUB_CONFIG.OWNER + "/" + GITHUB_CONFIG.REPO
  };
}

function createGithubIssue(title, description, labels) {
  try {
    if (!GITHUB_CONFIG.ENABLED) {
      return { success: false, message: "GitHub integration not enabled. Configure it first." };
    }

    var url = "https://api.github.com/repos/" + GITHUB_CONFIG.OWNER + "/" + GITHUB_CONFIG.REPO + "/issues";
    var payload = {
      title: title,
      body: description + "\n\n---\n*Created from FireHire LMS*",
      labels: labels || []
    };

    var options = {
      method: "post",
      headers: {
        "Authorization": "token " + GITHUB_CONFIG.TOKEN,
        "Accept": "application/vnd.github.v3+json"
      },
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    };

    var response = UrlFetchApp.fetch(url, options);
    var result = JSON.parse(response.getContentText());

    if (response.getResponseCode() === 201) {
      return {
        success: true,
        message: "Issue created successfully!",
        issueUrl: result.html_url,
        issueNumber: result.number
      };
    } else {
      return {
        success: false,
        message: result.message || "Failed to create issue"
      };
    }
  } catch(e) {
    return { success: false, message: e.message };
  }
}

function reportBugToGithub(description, studentEmail) {
  try {
    if (!GITHUB_CONFIG.ENABLED) {
      return { success: false, message: "GitHub integration not enabled." };
    }

    var title = "🐛 Bug Report from " + studentEmail;
    var fullDesc = "**Student:** " + studentEmail + "\n\n**Description:**\n" + description;

    return createGithubIssue(title, fullDesc, ["bug", "from-lms"]);
  } catch(e) {
    return { success: false, message: e.message };
  }
}

function suggestFeatureToGithub(description, studentEmail) {
  try {
    if (!GITHUB_CONFIG.ENABLED) {
      return { success: false, message: "GitHub integration not enabled." };
    }

    var title = "✨ Feature Request from " + studentEmail;
    var fullDesc = "**Student:** " + studentEmail + "\n\n**Suggestion:**\n" + description;

    return createGithubIssue(title, fullDesc, ["enhancement", "from-lms"]);
  } catch(e) {
    return { success: false, message: e.message };
  }
}

// ─── Admin Stats ─────────────────────────────────────────────
function getAdminStats() {
  try {
    var studentSheet = getSheet("Students");
    var studentData = studentSheet.getDataRange().getValues();
    var batchSheet = getSheet("Batches");
    var batchData = batchSheet.getDataRange().getValues();
    var qSheet = getSheet("Questions_Bank");
    var qData = qSheet.getDataRange().getValues();
    var progressSheet = getSheet("Student_Progress");
    var progressData = progressSheet.getDataRange().getValues();

    var totalStudents = 0, totalTrainers = 0;
    for (var i = 1; i < studentData.length; i++) {
      if (studentData[i][2] === "Student") totalStudents++;
      if (studentData[i][2] === "Trainer") totalTrainers++;
    }

    var completedSessions = 0;
    for (var j = 1; j < progressData.length; j++) {
      if (progressData[j][4] === "YES") completedSessions++;
    }

    return {
      success: true,
      data: {
        totalStudents: totalStudents,
        totalTrainers: totalTrainers,
        totalBatches: Math.max(0, batchData.length - 1),
        totalQuestions: Math.max(0, qData.length - 1),
        completedSessions: completedSessions
      }
    };
  } catch(e) {
    return { success: false, message: e.message };
  }
}

// ─── Quiz Questions for Week ────────────────────────────────
function getQuestionsForWeek(level, week) {
  try {
    var sheet = getSheet("Questions_Bank");
    var data = sheet.getDataRange().getValues();
    var questions = [];
    for (var i = 1; i < data.length; i++) {
      if (data[i][0] && data[i][7] && data[i][7].toString() === week.toString()) {
        questions.push({
          qId: data[i][0], type: data[i][1], question: data[i][2],
          correctAnswer: data[i][3], options: data[i][4] ? data[i][4].toString().split("|") : [],
          hint: data[i][5], explanation: data[i][6], week: data[i][7]
        });
      }
    }
    return { success: true, data: questions };
  } catch(e) {
    return { success: false, message: e.message };
  }
}

function getStudentQuizResults(studentEmail) {
  try {
    var sheet = getSheet("Student_Answers");
    var data = sheet.getDataRange().getValues();
    var results = [];
    for (var i = 1; i < data.length; i++) {
      if (data[i][1].toString().toLowerCase() === studentEmail.toLowerCase()) {
        results.push({
          timestamp: data[i][0] ? data[i][0].toString() : "",
          qId: data[i][2],
          answer: data[i][3],
          score: data[i][4],
          week: data[i][6]
        });
      }
    }
    return { success: true, data: results };
  } catch(e) {
    return { success: false, message: e.message };
  }
}

// ─── Submit Quiz Answers ────────────────────────────────────
function submitQuizAnswers(studentEmail, week, answersJson) {
  try {
    var answers = JSON.parse(answersJson);
    var qSheet = getSheet("Questions_Bank");
    var qData = qSheet.getDataRange().getValues();
    var ansSheet = getSheet("Student_Answers");

    var totalScore = 0;
    var totalQuestions = 0;
    var results = [];

    // Grade each answer
    for (var qId in answers) {
      var userAnswer = answers[qId];
      // Find question in bank
      for (var i = 1; i < qData.length; i++) {
        if (qData[i][0] === qId) {
          var correctAnswer = qData[i][3].toString().toLowerCase().trim();
          var userAnsLower = userAnswer.toString().toLowerCase().trim();
          var isCorrect = userAnsLower === correctAnswer;
          var score = isCorrect ? 1 : 0;
          totalScore += score;
          totalQuestions++;

          // Record answer
          var now = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm:ss");
          ansSheet.appendRow([now, studentEmail, qId, userAnswer, score, "", week]);

          results.push({
            qId: qId,
            question: qData[i][2],
            userAnswer: userAnswer,
            correctAnswer: correctAnswer,
            isCorrect: isCorrect,
            explanation: qData[i][6]
          });
          break;
        }
      }
    }

    var percentage = totalQuestions > 0 ? Math.round((totalScore / totalQuestions) * 100) : 0;

    return {
      success: true,
      data: {
        totalQuestions: totalQuestions,
        correctAnswers: totalScore,
        percentage: percentage,
        results: results
      }
    };
  } catch(e) {
    return { success: false, message: e.message };
  }
}
