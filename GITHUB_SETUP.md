# 🔗 GitHub Integration Setup Guide

## نظرة عامة
تم دمج نظام FireHire LMS مع GitHub بحيث يمكن:
- ✅ تقرير الأخطاء (Bugs) مباشرة من الموقع → تُحفظ كـ GitHub Issues
- ✅ اقتراح ميزات جديدة من الطلاب والمدربين → تُحفظ كـ GitHub Issues
- ✅ تتبع كل التحديثات والمشاكل في مكان واحد
- ✅ إدارة المشروع بشكل احترافي

---

## 🚀 خطوات الإعداد (4 خطوات فقط!)

### الخطوة 1: إنشاء Repository على GitHub

```bash
1. اذهب إلى https://github.com/new
2. اسم المستودع: firehire-lms
3. اختر: Public (عشان يقدر الناس يشوفوا المشروع)
4. اضغط "Create repository"
```

**النتيجة:** ستحصل على URL زي:
```
https://github.com/your-username/firehire-lms
```

---

### الخطوة 2: توليد Personal Access Token

هذا الـ token يعطي تصريح لـ Google Apps Script بـ post issues على GitHub.

```
1. اذهب لـ https://github.com/settings/tokens
2. اضغط "Generate new token" → "Generate new token (classic)"
3. امنح صلاحيات:
   ✅ repo (full control of private repositories)
   ✅ write:discussion (write to discussions)
4. Copy التوكن وحفظه في مكان آمن (مش هتقدر تشوفه مرة ثانية!)
```

**مثال** (لا تستخدم هذا ، هذا بس للتوضيح):
```
ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

### الخطوة 3: تحديث Code.gs

افتح Google Apps Script وابحث عن هذا الجزء في البداية:

```javascript
var GITHUB_CONFIG = {
  OWNER: "your-github-username",           // ← غير هنا
  REPO: "firehire-lms",                    // ← أو هنا إذا غيرت الاسم
  TOKEN: "your-github-personal-token",     // ← والتوكن هنا
  ENABLED: false                            // ← غير لـ true
};
```

**مثال:**
```javascript
var GITHUB_CONFIG = {
  OWNER: "ahmed-hassan",
  REPO: "firehire-lms",
  TOKEN: "ghp_abc123xyz789...",
  ENABLED: true  // ✅ فعّل التكامل
};
```

---

### الخطوة 4: Save & Deploy

```
1. في Google Apps Script اضغط Ctrl+S (Save)
2. اضغط Deploy → Manage Deployments
3. اضغط على الـ deployment الحالي وديله
4. اضغط "Create new deployment"
5. Deploy

الآن GitHub integration مفعّل! 🎉
```

---

## 📝 كيف يستخدمه الطلاب والمدربين؟

### للطلاب 👨‍🎓
```
1. اضغط على "Feedback & Bugs" في القائمة الجانبية
2. اختر:
   🐛 Report a Bug - لو لاقيت مشكلة
   ✨ Suggest a Feature - لو عندك فكرة
3. اكتب الوصف واضغط "Submit to GitHub"
4. Boom! تحت الحساب تلقائياً على GitHub
```

### للأدمن 🛠️
```
1. اضغط على "Admin Dashboard"
2. اسحب ل الأسفل لـ "GitHub Integration"
3. إذا كان متصل: اضغط "Report Issue" 
4. أو اضغط "Setup Guide" لتعديل الإعدادات
```

---

## 🔄 رابط Code with Google Apps Script (clasp)

إذا كنت تريد ربط المشروع محلياً بـ Git:

### التثبيت:
```bash
npm install -g @google/clasp
```

### المصادقة:
```bash
clasp login
```

### استنساخ المشروع:
```bash
clasp clone <SCRIPT_ID>
```

### الـ SCRIPT_ID:
- افتح Google Apps Script
- اضغط Project Settings
- انسخ Script ID

### رفع التحديثات:
```bash
clasp push
```

---

## ✅ اختبر التكامل

```
1. ادخل كـ Admin أو Student
2. اضغط على "Report a Bug" أو "Suggest a Feature"
3. اكتب شيء بسيط واضغط Submit
4. اذهب إلى https://github.com/your-username/firehire-lms/issues
5. يجب تشوف Issue جديد تحت الساعات الجاية ✅
```

---

## 📊 ماذا بتقدر تشوف على GitHub؟

### Issues
```
كل bug أو feature request:
- عنوان واضح
- وصف مفصل
- الشخص اللي قاله (email)
- Labels: bug, enhancement, from-lms
```

### Discussions (optional)
```
لو فعلت الـ discussions:
- الطلاب يقدرو يناقشو الأفكار
- المدربين يقدرو يردو
- جيت واحد سهل للـ community
```

### Projects (optional)
```
يمكنك إضافة:
- Kanban board للـ Issues
- Milestones للـ releases
- Roadmap للمستقبل
```

---

## 🔐 أمان البيانات

### ⚠️ لا تشارك:
- ❌ التوكن (Personal Access Token)
- ❌ Spreadsheet ID على العام

### ✅ آمن:
- GitHub عند شركة معروفة
- الـ token يقدرك تحذفه أي وقت
- البيانات الحساسة ما بتروح لـ GitHub (بس الـ feedback)

---

## 🛠️ استكشاف الأخطاء

### Problem: "GitHub integration not enabled"
```
الحل: تأكد أن ENABLED: true في Code.gs
وأن الـ TOKEN صحيح
```

### Problem: "Failed to create issue"
```
الحل: تفقد التوكن والـ owner و repo في Code.gs
جرب الـ API call باستخدام Postman
```

### Problem: الأسئلة والإجابات ما بتظهر على GitHub
```
الحل: ممكن تحتاج تنتظر شوية (API delay)
أو تجدد الصفحة
```

---

## 📚 الخطوات القادمة

بعد الإعداد يمكنك:

### 1. README.md
```
اكتب شرح المشروع:
- Intro
- Installation
- Features
- How to use
- Contributing
```

### 2. LICENSE
```
اختر license:
- MIT (الأشهر)
- Apache 2.0
- GPL v3
```

### 3. CONTRIBUTING.md
```
إرشادات للمساهمين:
- كيفية fork المشروع
- كيفية عمل pull requests
- code style guide
```

### 4. Deploy مع GitHub Pages
```
اجعل README صفحة ويب تلقائياً:
Settings → Pages → Main branch
```

---

## 🎓 مثال عملي

دعك تجرب الآن:

```javascript
// في Developer Console:
var res = google.script.run.reportBugToGithub(
  "القائمة الجانبية ما بتظهر على الموبايل",
  "student@firehire.com"
);
```

---

## 📞 الدعم

### للمزيد:
- GitHub Docs: https://docs.github.com
- Google Apps Script Docs: https://developers.google.com/apps-script
- UrlFetchApp Reference: https://developers.google.com/apps-script/reference/url-fetch

### GitHub API:
- API Docs: https://docs.github.com/en/rest
- Create Issues: https://docs.github.com/en/rest/issues

---

## 🎉 انتهيت!

الآن لديك:
✅ نظام متكامل لـ issue tracking
✅ اتصال مباشر بـ GitHub
✅ طريقة احترافية لإدارة التطوير
✅ مشروع open-source جاهز!

**Happy coding!** 🚀
