# Cranix Core: Groups Management / Cranix Kern: Gruppenverwaltung

## English

### Overview

The **Groups** page (`/pages/cranix/groups`) manages user groups (classes, courses, workgroups, etc.). Requires `group.manage` ACL.

### Page Layout

```
┌─────────────────────────────────────────────────────────────────┐
│ Groups                                    [+ Add Group]          │
├─────────────────────────────────────────────────────────────────┤
│ [Filter: All ▼] [Search: ___________] [Columns]                │
├────┬──────────┬──────────┬──────────┬──────────┬────────┬───────┤
│ ☐  │ Name     │ Description│ Group Type│ Members │ Notice │ Act. │
├────┼──────────┼──────────┼──────────┼──────────┼────────┼───────┤
│ ☐  │ 10A      │ Class 10A │ class     │ 24      │ Yes    │ ⋮    │
│ ☐  │ 10B_Math │ Math 10B  │ course    │ 18      │ Yes    │ ⋮    │
│ ☐  │ ChessClub│ Chess Club│ workgroup │ 12      │ No     │ ⋮    │
│ ☐  │ Teachers │ All Tchrs │ primary   │ 45      │ Yes    │ ⋮    │
└────┴──────────┴──────────┴──────────┴──────────┴────────┴───────┘
```

**Columns:**
| Column | Description |
|--------|-------------|
| **Name** | Group identifier (unique) |
| **Description** | Human-readable description |
| **Group Type** | class / course / workgroup / primary / system |
| **Members** | Number of users in group |
| **Notice** | Whether group can receive notices |
| **Actions** | Edit, Members, Delete |

**Group Types:**
| Type | Purpose | Typical Members |
|------|---------|-----------------|
| **class** | School classes (e.g., 10A, 11B) | Students + Class teacher |
| **course** | Subject courses (e.g., 10B_Math) | Students + Subject teacher |
| **workgroup** | Clubs, projects (e.g., ChessClub) | Voluntary participants |
| **primary** | Primary groups (e.g., Teachers, Students) | All users of role |
| **system** | System groups (e.g., admins, printing) | System-defined |

---

### Step-by-Step Workflows

#### 1. Create New Group
1. Click **[+ Add Group]**
2. Fill form:
   - **Name**: Unique identifier (e.g., "10A", "Math_Advanced")
   - **Description**: Display name (e.g., "Class 10A", "Advanced Mathematics")
   - **Group Type**: class / course / workgroup / primary / system
   - **Notice**: Enable to allow sending notices to this group
3. **Save** → Group created, appears in list

#### 2. Edit Group
1. Click **⋮ Actions** → **Edit** on group row
2. Modify: Description, Group Type, Notice setting
3. **Name** cannot be changed after creation
4. **Save**

#### 3. Manage Group Members
1. Click **⋮ Actions** → **Members** on group row
2. **Members Modal** opens with two panels:
   - **Current Members**: Users in group
   - **Available Users**: Users not in group (filterable by role)
3. **Add Members**:
   - Select users from right panel → Click **Add →**
   - Or: Search user → **Add**
4. **Remove Members**:
   - Select users in left panel → Click **← Remove**
5. **Close** → Changes saved automatically

#### 4. Send Notice to Group
**Prerequisite**: Group has `Notice` enabled, user has `notice.use` ACL
1. Click **⋮ Actions** → **Write Notice** (or from any list: select group → Actions → Write Notice)
2. Pre-filled: Recipients = all group members
3. Compose & send (see Notices documentation)

#### 5. Delete Group
⚠️ **Warning**: Removes group membership for all users!

1. Click **⋮ Actions** → **Delete**
2. Confirm: Type group name
3. **Delete** → Group removed, memberships revoked

---

### Group Membership Rules

- **Users can be in multiple groups** (classes, courses, clubs)
- **Primary groups** (class, primary): Usually one per user
- **System groups**: Managed automatically, don't edit manually
- **Group Type affects**:
  - **class**: Used for timetable, grading, parent meetings
  - **course**: Used for subject-specific teaching
  - **workgroup**: Extracurricular, optional
  - **primary**: Role-based (all teachers, all students)

---

### Search, Filter & Bulk Actions

- **Search**: Filters by name, description
- **Filter**: By group type (class, course, workgroup, primary, system)
- **Columns**: Toggle visibility
- **Bulk Actions** (select multiple):
  - **Delete** multiple groups
  - **Export** to CSV/Excel/PDF
  - **Enable/Disable Notices** for multiple

---

### Permissions Reference

| Action | Required ACL |
|--------|-------------|
| View list | `group.manage` |
| Create | `group.manage` |
| Edit | `group.modify` |
| Manage Members | `group.manage` |
| Send Notice | `group.manage` + `notice.use` |
| Delete | `group.manage` + confirmation |

---

### Common Issues

| Issue | Solution |
|-------|----------|
| Can't change group name | Names are immutable - create new group instead |
| Members not showing | Check: Users exist, not already in group (for add panel) |
| Notice button missing | Enable `Notice` on group, verify `notice.use` ACL |
| Primary group missing | System creates primary groups automatically |
| Deleting class group affects grades | Warning: Only delete if no grading data depends on it |

---

## Deutsch

### Übersicht

Die **Gruppen**-Seite (`/pages/cranix/groups`) verwaltet Benutzergruppen (Klassen, Kurse, Arbeitsgemeinschaften, etc.). Benötigt `group.manage` ACL.

### Seitenaufbau

```
┌─────────────────────────────────────────────────────────────────┐
│ Gruppen                               [+ Gruppe hinzufügen]      │
├─────────────────────────────────────────────────────────────────┤
│ [Filter: Alle ▼] [Suche: ___________] [Spalten]                │
├────┬──────────┬──────────┬──────────┬──────────┬────────┬───────┤
│ ☐  │ Name     │ Beschreibung│ Gruppentyp│ Mitglieder│Mitteil.│ Akt.│
├────┼──────────┼──────────┼──────────┼──────────┼────────┼───────┤
│ ☐  │ 10A      │ Klasse 10A│ class     │ 24      │ Ja     │ ⋮    │
│ ☐  │ 10B_Mathe│ Mathe 10B │ course    │ 18      │ Ja     │ ⋮    │
│ ☐  │ Schach-AG│ Schach-AG │ workgroup │ 12      │ Nein   │ ⋮    │
│ ☐  │ Lehrer   │ Alle Lehr.│ primary   │ 45      │ Ja     │ ⋮    │
└────┴──────────┴──────────┴──────────┴──────────┴────────┴───────┘
```

**Spalten:**
| Spalte | Beschreibung |
|--------|-------------|
| **Name** | Gruppennamen (eindeutig) |
| **Beschreibung** | Anzeigename |
| **Gruppentyp** | class / course / workgroup / primary / system |
| **Mitglieder** | Anzahl Benutzer in Gruppe |
| **Mitteilung** | Ob Gruppe Mitteilungen empfangen kann |
| **Aktionen** | Bearbeiten, Mitglieder, Löschen |

**Gruppentypen:**
| Typ | Zweck | Typische Mitglieder |
|-----|-------|-------------------|
| **class** | Schulklassen (z.B. 10A, 11B) | Schüler + Klassenlehrer |
| **course** | Fachkurse (z.B. 10B_Mathe) | Schüler + Fachlehrer |
| **workgroup** | AGs, Projekte (z.B. Schach-AG) | Freiwillige Teilnehmer |
| **primary** | Primärgruppen (z.B. Lehrer, Schüler) | Alle Benutzer einer Rolle |
| **system** | Systemgruppen (z.B. admins, printing) | Systemdefiniert |

---

### Schritt-für-Schritt Workflows

#### 1. Neue Gruppe Erstellen
1. **[+ Gruppe hinzufügen]** klicken
2. Formular ausfüllen:
   - **Name**: Eindeutiger Bezeichner (z.B. "10A", "Mathe_Fortgeschritten")
   - **Beschreibung**: Anzeigename (z.B. "Klasse 10A", "Fortgeschrittene Mathematik")
   - **Gruppentyp**: class / course / workgroup / primary / system
   - **Mitteilung**: Aktivieren um Mitteilungen an diese Gruppe zu erlauben
3. **Speichern** → Gruppe erstellt, erscheint in Liste

#### 2. Gruppe Bearbeiten
1. **⋮ Aktionen** → **Bearbeiten** in Gruppenzeile klicken
2. Ändern: Beschreibung, Gruppentyp, Mitteilung-Einstellung
3. **Name** kann nach Erstellung nicht geändert werden
4. **Speichern**

#### 3. Gruppenmitglieder Verwalten
1. **⋮ Aktionen** → **Mitglieder** in Gruppenzeile klicken
2. **Mitglieder-Modal** öffnet sich mit zwei Bereichen:
   - **Aktuelle Mitglieder**: Benutzer in der Gruppe
   - **Verfügbare Benutzer**: Benutzer nicht in der Gruppe (nach Rolle filterbar)
3. **Mitglieder Hinzufügen**:
   - Benutzer im rechten Bereich auswählen → **Hinzufügen →** klicken
   - Oder: Benutzer suchen → **Hinzufügen**
4. **Mitglieder Entfernen**:
   - Benutzer im linken Bereich auswählen → **← Entfernen** klicken
5. **Schließen** → Änderungen werden automatisch gespeichert

#### 4. Mitteilung An Gruppe Senden
**Voraussetzung**: Gruppe hat `Mitteilung` aktiviert, Benutzer hat `notice.use` ACL
1. **⋮ Aktionen** → **Mitteilung schreiben** (oder aus beliebiger Liste: Gruppe auswählen → Aktionen → Mitteilung schreiben)
2. Vorgefüllt: Empfänger = alle Gruppenmitglieder
3. Verfassen & senden (siehe Mitteilungen-Dokumentation)

#### 5. Gruppe Löschen
⚠️ **Warnung**: Entfernt Gruppenmitgliedschaft für alle Benutzer!

1. **⋮ Aktionen** → **Löschen** klicken
2. Bestätigen: Gruppennamen eingeben
3. **Löschen** → Gruppe entfernt, Mitgliedschaften widerrufen

---

### Gruppenmitgliedschafts-Regeln

- **Benutzer können in mehreren Gruppen sein** (Klassen, Kurse, AGs)
- **Primärgruppen** (class, primary): Meist eine pro Benutzer
- **Systemgruppen**: Werden automatisch verwaltet, nicht manuell bearbeiten
- **Gruppentyp beeinflusst**:
  - **class**: Wird für Stundenplan, Noten, Elternsprechtage genutzt
  - **course**: Wird für fachspezifischen Unterricht genutzt
  - **workgroup**: Außerschulisch, optional
  - **primary**: Rollenbasiert (alle Lehrer, alle Schüler)

---

### Suche, Filter & Massenaktionen

- **Suche**: Filtert nach Name, Beschreibung
- **Filter**: Nach Gruppentyp (class, course, workgroup, primary, system)
- **Spalten**: Sichtbarkeit umschalten
- **Massenaktionen** (mehrere auswählen):
  - **Mehrere Gruppen löschen**
  - **Exportieren** nach CSV/Excel/PDF
  - **Mitteilungen aktivieren/deaktivieren** für mehrere

---

### Berechtigungs-Referenz

| Aktion | Erforderliche ACL |
|--------|------------------|
| Liste anzeigen | `group.manage` |
| Erstellen | `group.manage` |
| Bearbeiten | `group.modify` |
| Mitglieder verwalten | `group.manage` |
| Mitteilung senden | `group.manage` + `notice.use` |
| Löschen | `group.manage` + Bestätigung |

---

### Häufige Probleme

| Problem | Lösung |
|---------|--------|
| Gruppennamen nicht änderbar | Namen sind unveränderlich - neue Gruppe erstellen |
| Mitglieder werden nicht angezeigt | Prüfen: Benutzer existieren, nicht bereits in Gruppe (für Hinzufügen-Panel) |
| Mitteilungs-Button fehlt | `Mitteilung` bei Gruppe aktivieren, `notice.use` ACL prüfen |
| Primärgruppe fehlt | System erstellt Primärgruppen automatisch |
| Klassen-Gruppe löschen wirkt auf Noten | Warnung: Nur löschen wenn keine Notendaten davon abhängen |