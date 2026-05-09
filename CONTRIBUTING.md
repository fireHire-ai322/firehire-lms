# 🤝 Contributing to FireHire LMS

Thank you for your interest in contributing to FireHire LMS! This document provides guidelines and instructions for contributing.

## 📋 Code of Conduct

We are committed to providing a welcoming and inspiring community for all. Please read and follow our code of conduct in all interactions.

- Be respectful and inclusive
- Accept constructive criticism
- Focus on what is best for the community
- Show empathy towards others

## 🚀 Getting Started

### 1. Fork the Repository
```bash
# Go to https://github.com/your-username/firehire-lms
# Click "Fork" button
```

### 2. Clone Your Fork
```bash
git clone https://github.com/your-username/firehire-lms.git
cd firehire-lms
```

### 3. Create a Branch
```bash
# For features
git checkout -b feature/amazing-feature

# For bugfixes
git checkout -b fix/issue-description

# For documentation
git checkout -b docs/improvement
```

## 📝 Commit Guidelines

Write clear, descriptive commit messages:

```bash
# Good
git commit -m "Add quiz timer feature for sessions"
git commit -m "Fix mobile sidebar not closing on click"
git commit -m "Update README with clasp setup instructions"

# Avoid
git commit -m "Updates"
git commit -m "Fix bug"
git commit -m "Asdf"
```

### Format
```
<type>: <subject>

<body (optional)>

<footer (optional)>
```

### Types
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

## 🎯 Types of Contributions

### 1. Bug Reports 🐛

**Found a bug?** Please check [Issues](../../issues) first, then:

```markdown
## Bug Description
[Clear description of the bug]

## Steps to Reproduce
1. Login as [role]
2. Navigate to [page]
3. [Action that causes bug]

## Expected Behavior
[What should happen]

## Actual Behavior
[What actually happens]

## Screenshots
[If applicable]

## Environment
- Browser: [Chrome/Safari/Firefox]
- OS: [Windows/Mac/Linux]
- Device: [Desktop/Mobile]
```

### 2. Feature Requests ✨

**Have an idea?** Open a [discussion](../../discussions) or issue:

```markdown
## Feature Description
[What would you like to see?]

## Use Case
[Why do you need this? Who benefits?]

## Proposed Solution
[How should it work?]

## Alternatives Considered
[Other approaches you thought of]

## Additional Context
[Screenshots, mockups, links, etc]
```

### 3. Code Contributions 💻

#### Frontend Changes
```javascript
// Good practices
- Use clear variable names
- Add comments for complex logic
- Follow existing code style
- Test on mobile and desktop
- Update DESIGN.md if changing UI
```

#### Backend Changes
```javascript
// Good practices
- Handle errors gracefully
- Add try-catch blocks
- Document function parameters
- Return consistent response format
- Test with different inputs
```

#### Documentation
- Use clear, simple language
- Include examples
- Add code snippets where helpful
- Update table of contents if adding sections
- Check spelling and grammar

## 🔍 Code Review Process

1. **Submit Pull Request** with description
2. **Automated Checks** run (linting, etc)
3. **Manual Review** by maintainers
4. **Feedback & Changes** - respond to comments
5. **Approval & Merge** - your code goes live!

### What Reviewers Look For
- ✅ Code follows project style
- ✅ Changes don't break existing features
- ✅ Error handling is proper
- ✅ Documentation is clear
- ✅ Commit messages are descriptive
- ✅ No secrets/credentials in code

## 📚 Project Structure

```
firehire-lms/
├── Code.gs              # Backend (Google Apps Script)
├── index.html           # Frontend (HTML + CSS + JS)
├── README.md            # Project overview
├── GITHUB_SETUP.md      # GitHub integration guide
├── CONTRIBUTING.md      # This file
├── LICENSE              # MIT License
└── .gitignore          # Git ignore rules
```

## 🎨 Coding Standards

### JavaScript
```javascript
// Use camelCase for variables and functions
var userName = "Ahmed";
function getUserProfile() { }

// Use const for constants
const PASSWORD = "FireHire2026";

// Use descriptive names
var isSessionCompleted = true;  // Good
var x = true;                    // Bad

// Add comments for complex logic
// Check if unlock time has passed and previous session is done
if (unlockTime < now && previousCompleted) {
  // unlock session
}
```

### CSS
```css
/* Follow existing naming conventions */
.glass-card { }
.btn-primary { }
.page-title { }

/* Use CSS variables */
background: var(--primary);
color: var(--text-secondary);

/* Mobile-first approach */
@media (max-width: 768px) {
  /* Adjustments for mobile */
}
```

### HTML
```html
<!-- Use semantic HTML -->
<button class="btn btn-primary">Click me</button>
<div class="form-group">
  <label class="form-label">Email</label>
  <input class="form-input" />
</div>

<!-- Add data attributes for JS -->
<div data-page="student-course">

<!-- Include comments for clarity -->
<!-- User authentication section -->
```

## 🧪 Testing

### Before Submitting
1. Test on Chrome, Firefox, Safari
2. Test on mobile (responsive)
3. Test as different roles (Admin, Trainer, Student)
4. Test error cases
5. Check console for errors

### Test Checklist
- [ ] Feature works as intended
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Works for all user roles
- [ ] Forms validate correctly
- [ ] Animations smooth

## 📦 Adding Dependencies

**Before adding external libraries:**
1. Check if it's really needed
2. Ensure it's compatible with Google Apps Script
3. Minimize size impact
4. Update documentation

**Preferred approach:** Use vanilla JavaScript when possible to keep the project lightweight.

## 🔐 Security

⚠️ **Never commit:**
- API keys or tokens
- Spreadsheet IDs
- GitHub credentials
- Passwords

Use environment variables instead:
```javascript
// .gitignore has .env
// Store in .env locally, use process.env in code
```

## 📖 Documentation

When adding features, update:
- `README.md` - Add to features list
- `GITHUB_SETUP.md` - If related to GitHub
- Code comments - Explain complex logic
- Function documentation - Add JSDoc comments

```javascript
/**
 * Gets quiz questions for a specific week
 * @param {string} level - Student level (Beginner, Intermediate, Advanced)
 * @param {number} week - Week number (1-12)
 * @returns {Object} {success: boolean, data: array}
 */
function getQuestionsForWeek(level, week) {
  // Implementation
}
```

## 🎓 Learning Resources

- [Google Apps Script Docs](https://developers.google.com/apps-script)
- [MDN Web Docs](https://developer.mozilla.org/en-US/)
- [CSS Tricks](https://css-tricks.com/)
- [JavaScript.info](https://javascript.info/)

## 💬 Getting Help

- 📧 Email: support@firehire.com
- 💬 Ask in [Discussions](../../discussions)
- 🐛 Check [Issues](../../issues) for similar topics
- 📚 Read [Documentation](./README.md)

## 🎉 Recognition

Contributors will be:
- Added to `CONTRIBUTORS.md`
- Mentioned in release notes
- Credited in documentation
- Added to GitHub contributors list

## ✅ Checklist Before Submitting PR

- [ ] Fork and branch from `main`
- [ ] Updated code follows style guidelines
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No new console errors
- [ ] Tested on multiple devices/browsers
- [ ] Commit messages are descriptive
- [ ] No sensitive data in code
- [ ] All tests passing (if applicable)

## 🚀 Pull Request Process

1. Update README with any new features
2. Reference any related issues (#123)
3. Describe your changes clearly
4. Add before/after screenshots if UI changes
5. Wait for review and feedback
6. Make requested changes
7. Celebrate when merged! 🎉

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to make FireHire LMS better!** 🙌
