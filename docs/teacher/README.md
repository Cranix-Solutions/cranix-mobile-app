# CRANIX Mobile App - Teacher Quick Reference Cards

**Version:** 1.0  
**Last Updated:** September 2026  
**Languages:** English (EN) / German (DE)

---

## Overview

This directory contains **one-page quick reference cards** for teachers using the CRANIX Mobile App. Each card covers a single page/feature with:
- Quick access info (route, menu, required permissions)
- UI overview with key elements
- Top 5-7 workflows (numbered step-by-step)
- Keyboard shortcuts
- Common issues & fixes

All cards are **bilingual** (English + German in same file).

---

## Quick Reference Cards

### Cranix Core Pages (`/docs/teacher/en/cranix/` & `/docs/teacher/de/cranix/`)

| # | Card | Route | Menu | ACL | Purpose |
|---|------|-------|------|-----|---------|
| 1 | [Calendar](en/cranix/cranix-calendar.md) | `/pages/cranix/calendar` | Calendar | `calendar.read/use/manage` | Schedule lessons, book rooms, view timetable |
| 2 | [My Groups](en/cranix/cranix-mygroups.md) | `/pages/cranix/mygroups` | My Groups | `education.groups` | View classes, attendance, send notices |
| 3 | [Profile](en/cranix/cranix-profile.md) | `/pages/cranix/profile/*` | Profile (avatar) | `permitall` / `2fa.use` | Personal data, password, 2FA, VPN, files |
| 4 | [Informations](en/cranix/cranix-informations.md) | `/pages/cranix/informations` | Informations | `permitall` | Create announcements, homework, surveys |
| 5 | [Notices](en/cranix/cranix-notices.md) | Context action | (from any list) | `permitall` | **Quick notice** to students/parents from lists |

### Education Module (`/docs/teacher/en/edu/` & `/docs/teacher/de/edu/`)

| # | Card | Route | Menu | ACL | Purpose |
|---|------|-------|------|-----|---------|
| 6 | [Lessons / Tests](en/edu/edu-lessons-tests.md) | `/pages/edu/lessons/tests` | Education → Lessons → Tests | `permitall` | Create tests/quizzes, grade, feedback |
| 7 | [Challenges](en/edu/edu-lessons-challenges.md) | `/pages/edu/lessons/challenges` | Education → Lessons → Challenges | `challenge.manage` | Gamified team/individual challenges |
| 8 | [Room Control](en/edu/edu-lessons-roomcontrol.md) | `/pages/edu/lessons/roomcontrol` | Education → Lessons → Room Control | `education.rooms` | Projector, screen, access, environment |

---

## How to Use These Cards

### For Training Sessions
1. **Print** relevant cards (A4, double-sided)
2. **Distribute** before hands-on exercises
3. **Reference** during practice - each workflow is numbered

### For Daily Use
1. **Bookmark** PDF in browser
2. **Search** (Ctrl+F) for specific workflow
3. **Quick glance** at shortcuts & common issues

### For Onboarding New Teachers
1. Start with: **Profile** → **My Groups** → **Calendar**
2. Then: **Informations** → **Notices** (communication)
3. Advanced: **Lessons/Tests** → **Challenges** → **Room Control**

---

## Permission Requirements

| Feature | Minimum ACL | Typical Teacher Role |
|---------|-------------|---------------------|
| View Calendar | `calendar.read` | ✓ |
| Create Events | `calendar.use` | ✓ |
| Manage All Events | `calendar.manage` | Admin only |
| My Groups | `education.groups` | ✓ |
| Profile (basic) | `permitall` | ✓ |
| 2FA Setup | `2fa.use` | ✓ (if enabled) |
| Informations | `permitall` | ✓ |
| Notices (context) | `permitall` | ✓ |
| Create Tests | `permitall` | ✓ |
| Challenges | `challenge.manage` | ✓ (if enabled) |
| Room Control | `education.rooms` | ✓ (if enabled) |

> **Note**: If a menu item is missing, contact your admin to verify ACLs are assigned to your role.

---

## Quick Start: Teacher's First Day

### 1. Login & Profile Setup (5 min)
- [ ] Login with credentials
- [ ] **Profile → Myself**: Verify email, phone, language, timezone
- [ ] **Profile → CRX 2FA**: Set up authenticator app, **save backup codes!**
- [ ] **Profile → My VPN**: Download config if remote access needed

### 2. Find Your Classes (2 min)
- [ ] Open **My Groups** → Verify all your classes listed
- [ ] Click each → Check student count, room assignment

### 3. Schedule First Lesson (5 min)
- [ ] Open **Calendar** → Week view
- [ ] Click time slot → Create "Lesson" for your class
- [ ] Select room → Save

### 4. Send First Announcement (3 min)
- [ ] Open **Informations** → **+ New Info**
- [ ] Target: Your class group
- [ ] Type: "Homework" or "Announcement"
- [ ] Send test message

### 5. Quick Notice from List (1 min)
- [ ] Go to **Users → All Users** → Filter your class
- [ ] Select all → **⋮ Actions → Write Notice**
- [ ] Type quick reminder → Send

**Total: ~15 minutes to productive!**

---

## Generating PDF

```bash
# Install pandoc
# macOS: brew install pandoc weasyprint
# Ubuntu: apt install pandoc weasyprint
# Windows: choco install pandoc

# Generate English Teacher PDF (all cards)
pandoc docs/teacher/en/**/*.md -o cranix-teacher-guide-en.pdf --toc --pdf-engine=weasyprint

# Generate German Teacher PDF
pandoc docs/teacher/de/**/*.md -o cranix-teacher-guide-de.pdf --toc --pdf-engine=weasyprint

# Single card PDF (e.g., just Calendar)
pandoc docs/teacher/en/cranix/cranix-calendar.md -o teacher-calendar-en.pdf --pdf-engine=weasyprint
```

---

## Card Format Explanation

Each card follows this structure:

```
# Page Name / Seitenname

## Quick Access
- Route, Menu, ACL

## UI Overview
- ASCII layout of key screen elements
- Tabs/sections explained

## Top Workflows
### 1. Workflow Name
1. Step one
2. Step two
...

## Key Shortcuts
| Key | Action |

## Common Issues
| Problem | Fix |

---

## Deutsch
# German version with same structure
```

---

## Related Documentation

- [Administrator Documentation](../admin/README.md) - Full admin guides
- [Root Documentation Index](../README.md) - Project overview

---

## Feedback & Updates

These cards are living documents. For corrections or additions:
1. Check the app version matches documentation version
2. Report discrepancies via Support Tickets
3. Suggest new workflows for common teacher tasks