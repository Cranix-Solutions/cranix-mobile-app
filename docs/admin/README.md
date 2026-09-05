# CRANIX Mobile App - Administrator Documentation

**Version:** 1.0  
**Last Updated:** September 2026  
**Languages:** English (EN) / German (DE)

---

## Overview

This documentation provides comprehensive step-by-step guides for **CRANIX/Cephalix administrators** managing school IT infrastructure. The app supports both **Cephalix** (multi-school management for service providers) and **Cranix** (single-school administration for school IT admins).

---

## Documentation Structure

### English Documentation (`/docs/admin/en/`)

#### Getting Started
- [Getting Started](en/getting-started.md) - System requirements, first login, browser compatibility

#### Authentication & Security
- [Login & Authentication](en/auth/login.md) - Desktop/mobile login, token access, session management, password policies
- [Two-Factor Authentication (2FA)](en/auth/2fa.md) - TOTP setup, daily login flow, managing methods, troubleshooting, admin enforcement

#### Cephalix Administration (Multi-School)
- [Customers Management](en/cephalix/customers.md) - Create/edit/delete customers, sync, bulk actions
- [Institutes Management](en/cephalix/institutes.md) - Institute list/detail, status monitoring, sync management, templates
- [Support Tickets](en/cephalix/tickets.md) - Ticket lifecycle, status transitions, assignment, SLA, categories, bulk actions

#### Cranix Core Administration (Single-School)
- [Calendar](en/cranix/calendar.md) - Events, room booking, recurring events, timetable integration, export
- [Devices & Printers](en/cranix/devices.md) - Device lists, printer management, device details
- [Groups Management](en/cranix/groups.md) - Group creation, membership, permissions
- [Hardware Configurations (HWConfs)](en/cranix/hwconfs.md) - Hardware profiles, deployment
- [Informations & Announcements](en/cranix/informations.md) - Create announcements, surveys, target audiences
- [My Groups (Teacher View)](en/cranix/mygroups.md) - Teacher's group overview, attendance, notices
- [User Profile & Settings](en/cranix/profile.md) - Personal data, password, 2FA, VPN, file storage
- [Rooms Management](en/cranix/rooms.md) - Room lists, ad-hoc booking, room printers
- [Security (Firewall, Proxy, DNS, Access)](en/cranix/security.md) - Firewall rules, proxy config, Unbound DNS, room access, access logs
- [Software Deployment](en/cranix/softwares.md) - Installation sets, packages, status, licenses
- [System Administration](en/cranix/system.md) - Status, services, config, addons, ACLs, mailserver
- [Users Management](en/cranix/users.md) - User lists, import, 2FA, parents, ID cards

---

### German Documentation (`/docs/admin/de/`)

#### Erste Schritte
- [Erste Schritte](de/getting-started.md) - Systemvoraussetzungen, erste Anmeldung, Browser-Kompatibilität

#### Authentifizierung & Sicherheit
- [Anmeldung & Authentifizierung](de/auth/login.md) - Desktop/Mobile-Login, Token-Zugriff, Sitzungsverwaltung, Passwort-Richtlinien
- [Zwei-Faktor-Authentifizierung (2FA)](de/auth/2fa.md) - TOTP-Einrichtung, täglicher Login, Methoden verwalten, Problemlösung, Admin-Durchsetzung

---

## Quick Reference: Required Permissions (ACLs)

| Page | Route | Required ACL |
|------|-------|-------------|
| Customers | `/pages/cephalix/customers` | `customer.manage` |
| Institutes | `/pages/cephalix/institutes/all` | `cephalix.manage` |
| Institute Details | `/pages/cephalix/institutes/:id` | `cephalix.modify` |
| Tickets | `/pages/cephalix/tickets` | `cephalix.ticket` |
| Calendar | `/pages/cranix/calendar` | `calendar.manage` / `calendar.use` / `calendar.read` |
| Devices | `/pages/cranix/devices/all` | `device.manage` |
| Groups | `/pages/cranix/groups` | `group.manage` |
| HWConfs | `/pages/cranix/hwconfs` | `hwconf.manage` |
| Informations | `/pages/cranix/informations` | `permitall` |
| MyGroups | `/pages/cranix/mygroups` | `education.groups` |
| Profile | `/pages/cranix/profile/*` | `permitall` / `2fa.use` |
| Rooms | `/pages/cranix/rooms/all` | `room.manage` |
| Security | `/pages/cranix/security/*` | `system.firewall` / `system.proxy` |
| Softwares | `/pages/cranix/softwares` | `software.manage` |
| System | `/pages/cranix/system` | `system.status` |
| Users | `/pages/cranix/users/all` | `user.manage` |

---

## Default Landing Pages by Role

| Role / ACL | Default Redirect |
|------------|-----------------|
| Cephalix Admin (`cephalix.manage`) | `/pages/cephalix/institutes/all` |
| User Manager (`user.manage`) | `/pages/cranix/users/all` |
| Teachers (`education.groups`) | `/pages/cranix/mygroups` |
| Default | `/pages/cranix/profile/myself` |

---

## Generating PDF

```bash
# Install pandoc (recommended for better TOC/formatting)
# macOS: brew install pandoc weasyprint
# Ubuntu: apt install pandoc weasyprint
# Windows: choco install pandoc

# Generate English Admin PDF
pandoc docs/admin/en/**/*.md -o cranix-admin-guide-en.pdf --toc --pdf-engine=weasyprint

# Generate German Admin PDF
pandoc docs/admin/de/**/*.md -o cranix-admin-guide-de.pdf --toc --pdf-engine=weasyprint

# Alternative: markdown-pdf (simpler, less control)
npx markdown-pdf docs/admin/en/**/*.md -o cranix-admin-guide-en.pdf
npx markdown-pdf docs/admin/de/**/*.md -o cranix-admin-guide-de.pdf
```

---

## Navigation

The app uses a **dynamic sidebar menu** that shows only pages your account has permission to access (based on ACLs). After login, you'll see a subset of the pages listed above.

---

## Related Documentation

- [Teacher Quick Reference Cards](../teacher/README.md) - One-page guides for teachers
- [Root Documentation Index](../README.md) - Project overview

---

## Support

For technical issues, use the **Support Tickets** feature in the app (Cephalix → Tickets) or contact your system administrator.