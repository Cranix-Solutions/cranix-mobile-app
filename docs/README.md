# CRANIX Mobile App - Documentation

**Version:** 1.0  
**Last Updated:** September 2026  
**Languages:** English (EN) / German (DE)

---

## Project Overview

**CRANIX Mobile App** - Ionic/Angular Progressive Web App (PWA) for school IT administration.

**CRANIX** = **CR**anix **A**dministration **N**exus **I**nternet e**X**change

### Two Documentation Tracks

| Audience | Directory | Format | Purpose |
|----------|-----------|--------|---------|
| **Administrators** | [`/docs/admin/`](admin/README.md) | Full step-by-step guides | Complete workflows for Cephalix/Cranix admins |
| **Teachers** | [`/docs/teacher/`](teacher/README.md) | One-page quick reference cards | Fast lookup for daily teacher tasks |

---

## Administrator Documentation (`/docs/admin/`)

**Target:** Cephalix/Cranix administrators, IT staff, service providers

### Structure
```
/docs/admin/
├── README.md                    # This navigation
├── en/                          # English guides
│   ├── getting-started.md
│   ├── auth/
│   │   ├── login.md
│   │   └── 2fa.md
│   ├── cephalix/
│   │   ├── customers.md
│   │   ├── institutes.md
│   │   └── tickets.md
│   └── cranix/
│       ├── calendar.md
│       ├── devices.md
│       ├── groups.md
│       ├── hwconfs.md
│       ├── informations.md
│       ├── mygroups.md
│       ├── profile.md
│       ├── rooms.md
│       ├── security.md
│       ├── softwares.md
│       ├── system.md
│       └── users.md
└── de/                          # German guides
    ├── getting-started.md
    └── auth/
        └── login.md
```

### Coverage
- **Cephalix** (Multi-school): Customers, Institutes, Tickets
- **Cranix Core** (Single-school): 12 modules (Calendar, Devices, Groups, HWConfs, Informations, MyGroups, Profile, Rooms, Security, Softwares, System, Users)
- **Authentication**: Login flows, 2FA/TOTP, session management
- **Bilingual**: English + German (DE files in `/admin/de/`)

---

## Teacher Quick Reference Cards (`/docs/teacher/`)

**Target:** Teachers, educators, classroom staff

### Structure
```
/docs/teacher/
├── README.md                    # This navigation + quick start
├── en/                          # English cards (bilingual content)
│   ├── cranix/
│   │   ├── cranix-calendar.md
│   │   ├── cranix-mygroups.md
│   │   ├── cranix-profile.md
│   │   ├── cranix-informations.md
│   │   └── cranix-notices.md
│   └── edu/
│       ├── edu-lessons-tests.md
│       ├── edu-lessons-challenges.md
│       └── edu-lessons-roomcontrol.md
└── de/                          # German cards (same files, bilingual)
    ├── cranix/
    └── edu/
```

### 8 Quick Reference Cards

| # | Card | Route | Key Feature |
|---|------|-------|-------------|
| 1 | **Calendar** | `/pages/cranix/calendar` | Lessons, room booking, recurring events |
| 2 | **My Groups** | `/pages/cranix/mygroups` | Class overview, attendance, notices |
| 3 | **Profile** | `/pages/cranix/profile/*` | Personal data, 2FA, VPN, files |
| 4 | **Informations** | `/pages/cranix/informations` | Announcements, homework, surveys |
| 5 | **Notices** | Context action (any list) | **Quick message** to students/parents |
| 6 | **Lessons/Tests** | `/pages/edu/lessons/tests` | Create tests, auto-grade, feedback |
| 7 | **Challenges** | `/pages/edu/lessons/challenges` | Gamified team/individual challenges |
| 8 | **Room Control** | `/pages/edu/lessons/roomcontrol` | Projector, screen, access, CO2 monitoring |

### Card Format (each file)
- **Quick Access**: Route, menu, required ACL
- **UI Overview**: ASCII layout of key elements
- **Top 5-7 Workflows**: Numbered step-by-step
- **Keyboard Shortcuts**: Power user keys
- **Common Issues**: Problem → Fix table
- **Bilingual**: English + German in same file

---

## Quick Start by Role

### 🎓 Teachers (Start Here)
1. Read [`/docs/teacher/README.md`](teacher/README.md#quick-start-teachers-first-day)
2. Print relevant cards: **Profile** → **My Groups** → **Calendar** → **Informations/Notices**
3. Advanced: **Lessons/Tests** → **Challenges** → **Room Control**

### 🔧 Administrators (Start Here)
1. Read [`/docs/admin/README.md`](admin/README.md)
2. Start with: **Getting Started** → **Authentication** → Your module (Cephalix or Cranix)
3. Reference specific module guides as needed

---

## Generating PDFs

### Prerequisites
```bash
# macOS
brew install pandoc weasyprint

# Ubuntu/Debian
apt install pandoc weasyprint

# Windows (Chocolatey)
choco install pandoc
# weasyprint: pip install weasyprint
```

### Admin Guides (Full Documentation)
```bash
# English
pandoc docs/admin/en/**/*.md -o cranix-admin-guide-en.pdf --toc --pdf-engine=weasyprint

# German
pandoc docs/admin/de/**/*.md -o cranix-admin-guide-de.pdf --toc --pdf-engine=weasyprint
```

### Teacher Cards (Quick Reference)
```bash
# English (all 8 cards)
pandoc docs/teacher/en/**/*.md -o cranix-teacher-guide-en.pdf --toc --pdf-engine=weasyprint

# German
pandoc docs/teacher/de/**/*.md -o cranix-teacher-guide-de.pdf --toc --pdf-engine=weasyprint

# Single card (e.g., Calendar only)
pandoc docs/teacher/en/cranix/cranix-calendar.md -o teacher-calendar-en.pdf --pdf-engine=weasyprint
```

### Alternative: markdown-pdf (simpler)
```bash
npx markdown-pdf docs/admin/en/**/*.md -o cranix-admin-guide-en.pdf
npx markdown-pdf docs/teacher/en/**/*.md -o cranix-teacher-guide-en.pdf
```

---

## Documentation Maintenance

### When to Update
- **App version change**: Update version/date in all README files
- **New feature**: Add card/guide, update navigation
- **UI change**: Update screenshots/ASCII layouts in affected cards
- **ACL change**: Update permission tables

### File Naming Convention
- Admin: Feature-based (`customers.md`, `calendar.md`)
- Teacher: Route-based (`cranix-calendar.md`, `edu-lessons-tests.md`)
- All files contain **both English and German** content

### Bilingual Format
Each `.md` file contains:
```markdown
# English Title

## English Content
...

---

## Deutsch

# Deutscher Titel

## Deutscher Inhalt
...
```

---

## Support & Feedback

- **Technical Issues**: Use in-app **Support Tickets** (Cephalix → Tickets)
- **Documentation Errors**: Report via Support Tickets with "Documentation" category
- **Feature Requests**: Create ticket with "Feature Request" category
- **Training Requests**: Contact your system administrator

---

## License

Internal documentation for CRANIX Mobile App users. Not for external distribution without permission.