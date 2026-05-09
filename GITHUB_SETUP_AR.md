# 🔗 دليل ربط المشروع بـ GitHub

## 📌 الملخص السريع

هذا الدليل يشرح **كيفية رفع مشروع FireHire LMS على GitHub** وتفعيل التكامل بين التطبيق و GitHub.

---

## 🎯 الخطوات الخمسة الأساسية

### 1️⃣ إنشاء Repository على GitHub

**الرابط:** https://github.com/new

```
اسم المستودع (Repository name): firehire-lms
الوصف (Description): Interview preparation LMS with Google Apps Script
اختر: Public (عشان يقدر الناس يشوفوا المشروع)
اختر: Add a README file ✅
اختر: Choose a license → MIT License
اضغط: Create repository
```

**النتيجة:**
```
https://github.com/YOUR-USERNAME/firehire-lms
```

---

### 2️⃣ رفع الملفات إلى GitHub

يوجد طريقتان:

#### الطريقة الأولى: عبر Git (الأفضل)

**تثبيت Git:**
- Windows: https://git-scm.com/download/win
- Mac: `brew install git`
- Linux: `sudo apt install git`

**الخطوات:**

```bash
# 1. انسخ repository الفارغ
cd ~/firehire-lms  # أو أي مجلد تحت

# 2. إنشاء مستودع Git محلي
git init

# 3. أضف الملفات
git add Code.gs
git add index.html
git add README.md
git add GITHUB_SETUP.md
git add CONTRIBUTING.md
git add LICENSE
git add .gitignore
git add project.json

# 4. حفظ التغييرات
git commit -m "Initial commit: FireHire LMS setup"

# 5. إضف اتصال GitHub
# استبدل YOUR-USERNAME بـ GitHub username
git remote add origin https://github.com/YOUR-USERNAME/firehire-lms.git

# 6. رفع الملفات
git branch -M main
git push -u origin main
```

#### الطريقة الثانية: عبر الموقع (الأبسط)

```
1. اذهب إلى https://github.com/YOUR-USERNAME/firehire-lms
2. اضغط Upload files
3. اسحب الملفات أو اخترها
4. اكتب "Initial commit" في الأسفل
5. اضغط Commit changes
```

---

### 3️⃣ توليد GitHub Personal Access Token

هذا التوكن يعطي تصريح لـ Google Apps Script ينشئ Issues على GitHub.

**الخطوات:**

```
1. اذهب: https://github.com/settings/tokens
2. اضغط: Generate new token (classic)
3. في Name: اكتب "FireHire LMS"
4. اختر الصلاحيات:
   ☑️ repo → full control of private repositories
   ☑️ write:discussion → write to discussions
5. اضغط: Generate token
6. 🔴 انسخ التوكن فوراً! (لن تقدر تشوفه مرة ثانية!)
```

**مثال (لا تستخدم هذا):**
```
ghp_16C7e42F292c6912E7710c838347Ae178B4a
```

---

### 4️⃣ تحديث Code.gs

**في Google Apps Script:**

1. افتح المشروع
2. ابحث عن هذا الجزء (البداية):

```javascript
var GITHUB_CONFIG = {
  OWNER: "your-github-username",
  REPO: "firehire-lms",
  TOKEN: "your-github-personal-token",
  ENABLED: false
};
```

3. غيّر إلى:

```javascript
var GITHUB_CONFIG = {
  OWNER: "ahmed-hassan",                    // غير اسمك
  REPO: "firehire-lms",                     // اسم المستودع
  TOKEN: "ghp_abc123xyz...",                // التوكن اللي نسخته
  ENABLED: true                             // فعّل التكامل
};
```

4. اضغط **Ctrl+S** (Save)

---

### 5️⃣ Deploy و Test

**في Google Apps Script:**

```
1. اضغط: Deploy → Manage deployments
2. اضغط على الـ deployment الحالي
3. اضغط: 🗑️ (Delete)
4. اضغط: Create new deployment
5. Type: Web App
6. Execute as: [Your Email]
7. Who has access: Anyone
8. اضغط: Deploy
9. نسخ الرابط الجديد
```

**Test التكامل:**

```
1. فتح الرابط الجديد
2. دخول كـ Admin (admin@firehire.com)
3. شوف في الأسفل "GitHub Integration"
4. إذا أخضر ✅ = نجح!
5. اضغط "Report Issue" واكتب شيء اختباري
6. اذهب لـ GitHub واتفقد الـ Issues
```

---

## 🔄 عمليات يومية

### رفع تحديثات على GitHub

```bash
# بعد أي تغيير على الملفات:
git add .
git commit -m "وصف التغيير"
git push
```

### استخدام clasp (خيار متقدم)

```bash
# تثبيت clasp (أداة Google للربط بـ Git)
npm install -g @google/clasp

# المصادقة
clasp login

# استنساخ المشروع
clasp clone YOUR-SCRIPT-ID

# الرفع بعد التحديثات
clasp push

# الفتح في المتصفح
clasp open
```

---

## 🎓 أمثلة عملية

### مثال 1: طالب يبلّغ عن خطأ

```
1. يفتح التطبيق
2. اضغط Feedback & Bugs
3. اختر "Report a Bug"
4. يكتب: "الفيديو ما بيشتغل في Week 1, Session 1"
5. اضغط Submit
↓
في GitHub تلقائياً:
- عنوان: 🐛 Bug Report from student@firehire.com
- الوصف: يتضمن الخطأ كاملاً
- Label: bug, from-lms
```

### مثال 2: مدرب يقترح ميزة

```
1. يفتح التطبيق (ممكن من الموبايل)
2. اضغط Feedback & Bugs
3. اختر "Suggest a Feature"
4. يكتب: "أتمنى يكون في timer للأسئلة"
5. اضغط Submit
↓
في GitHub تلقائياً:
- عنوان: ✨ Feature Request from trainer@firehire.com
- الوصف: الاقتراح كاملاً
- Label: enhancement, from-lms
```

### مثال 3: أنت تعدّل الكود محلياً

```bash
# 1. اعمل تغيير على Code.gs
# مثل: تحسين سرعة البحث

# 2. Save في Google Apps Script

# 3. اختبر على الموقع
# 4. إذا تمام:

git add Code.gs
git commit -m "Improve question search performance"
git push

# الآن محدث على GitHub! ✅
```

---

## 🐛 استكشاف الأخطاء الشائعة

### ❌ مشكلة: "GitHub integration not enabled"

**السبب:** ENABLED: false في Code.gs

**الحل:**
```javascript
ENABLED: true  // غيّر false إلى true
```

### ❌ مشكلة: "Failed to create issue"

**الأسباب المحتملة:**
1. التوكن خاطئ أو منتهي
2. Username أو Repo اسم خاطئ
3. التوكن مُحذف من GitHub

**الحل:**
- تفقد GITHUB_CONFIG جيداً
- وّلد توكن جديد إذا لزم
- اختبر الـ API يدويّاً

### ❌ مشكلة: "git command not found"

**الحل:**
- ثبّت Git من https://git-scm.com
- أعد فتح Terminal/Command Prompt

### ❌ مشكلة: التوكن ضاع!

**لا تقلق:**
```
1. اذهب https://github.com/settings/tokens
2. اضغط على التوكن المُفقود
3. اضغط Delete
4. وّلد توكن جديد
5. حدّث Code.gs بالجديد
```

---

## 🔒 أمان البيانات

### ⚠️ لا تشارك EVER:

- ❌ GitHub Token
- ❌ Spreadsheet ID (على العام)
- ❌ API Keys

### ✅ حفظها آمناً:

- في `.env` file (في .gitignore)
- في environment variables
- في Google Secret Manager (للإنتاج)

### مثال .env آمن:

```env
GITHUB_TOKEN=ghp_xxxx
SPREADSHEET_ID=1PkXlSooCrj...
GITHUB_OWNER=your-username
```

ثم في Code.gs:
```javascript
// لا تنسخ البيانات مباشرة
// استخدم environment variables بدل
```

---

## 📊 إحصائيات على GitHub

بعد الإعداد تقدر تشوف:

```
📈 Repository Stats:
  - Code commits
  - Contributors
  - Issues opened
  - Pull requests
  - Language breakdown
  - Network graph

🎯 Insights:
  - Traffic (views, clones)
  - Community activity
  - Fork trends
```

---

## 🚀 خطوات متقدمة (اختيارية)

### 1. إضافة GitHub Pages (موقع مجاني)

```
Settings → Pages → Main branch
(سيرفع README.md كموقع ويب)
```

### 2. إضافة GitHub Actions (automation)

```yaml
# .github/workflows/lint.yml
name: Lint
on: [push, pull_request]
jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm run lint
```

### 3. إضافة Discussions (مجتمع)

```
Settings → Features → Discussions ✅
الآن الناس يقدرو يتناقشو بدل الـ Issues
```

### 4. إضافة Projects (لوحة كانبان)

```
Projects → New project
اسحب الـ Issues لـ To Do, In Progress, Done
```

---

## 📞 الدعم والمساعدة

إذا احتجت مساعدة:

1. **GitHub Docs**: https://docs.github.com
2. **Google Apps Script**: https://developers.google.com/apps-script
3. **Stack Overflow**: البحث عن السؤال
4. **GitHub Community**: https://github.community

---

## ✅ Checklist النهاية

- [ ] Repository مُنشأ على GitHub
- [ ] الملفات مرفوعة (Code.gs, index.html, README, etc)
- [ ] GitHub Token موّلد
- [ ] Code.gs محدّث بـ Token و Username
- [ ] تم Deploy جديد
- [ ] اختبار Bug Reporting يشتغل
- [ ] GitHub Issues تظهر جديدة من الموقع
- [ ] README واضح والمشروع يبدو احترافي

---

## 🎉 النتيجة النهائية

بعد هذه الخطوات عندك:

✅ مشروع open-source احترافي
✅ نظام bug tracking مدمج
✅ سهولة للمساهمين
✅ موقع توثيق (README)
✅ تكامل كامل مع GitHub
✅ طريقة منظمة لإدارة التطوير

---

<div align="center">

**الآن مشروعك جاهز على GitHub! 🚀**

استمتع بـ version control والتطوير المنظم!

</div>
