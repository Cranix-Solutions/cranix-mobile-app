# My Groups / Meine Gruppen

## Quick Access
- **Route**: `/pages/cranix/mygroups`
- **Menu**: My Groups
- **Required ACL**: `education.groups`

## UI Overview
```
┌─────────────────────────────────────────────────────────────┐
│ My Groups                                                     │
├─────────────────────────────────────────────────────────────┤
│ [Filter: All ▼] [Search: ___________] [Columns]            │
├────┬──────────────┬──────────┬──────────┬──────────┬────────┤
│ ☐  │ Group Name   │ Type     │ Students │ Room     │ Actions│
├────┼──────────────┼──────────┼──────────┼──────────┼────────┤
│ ☐  │ 10A Math     │ Class    │ 24       │ Room 101 │ ⋮      │
│ ☐  │ 10B Physics  │ Course   │ 18       │ Lab 2    │ ⋮      │
│ ☐  │ Chess Club   │ Club     │ 12       │ Room 205 │ ⋮      │
└────┴──────────────┴──────────┴──────────┴──────────┴────────┘
```

**Tabs (per Group):**
- **Overview**: Students, schedule, room
- **Timetable**: Weekly schedule view
- **Grades**: Grade book (if enabled)
- **Notices**: Group announcements

## Top Workflows

### 1. View My Teaching Groups
1. Open **My Groups** → See all assigned groups
2. **Filter**: By type (Class/Course/Club) or search name
3. Click group name → Opens detail view

### 2. Take Attendance
1. Click group → **Overview** tab
2. Click **[Take Attendance]** (if today's lesson)
3. Mark: Present / Absent / Late / Excused
4. **Save** → Syncs to administration

### 3. View Group Timetable
1. Click group → **Timetable** tab
2. See weekly schedule with rooms
3. **Print** → Weekly plan for classroom door

### 4. Send Notice to Group
1. Click group → **Notices** tab
2. Click **[+ New Notice]**
3. **Title**, **Content** (Markdown supported)
4. **Priority**: Normal / High / Urgent
5. **Send** → Push notification to students/parents

### 5. Manage Guest Access (PTM)
1. Click group → **Overview** → **Guest Access**
2. Generate link for Parent-Teacher Meeting
3. Share link with parents
4. Parents register without login

### 6. Export Student List
1. Click group → **Overview**
2. Click **Export** → CSV/Excel/PDF
3. Select fields: Name, Email, Phone, Parents
4. Download → Use for excursions, exams

## Key Shortcuts
| Key | Action |
|-----|--------|
| `/` | Focus search |
| `Enter` | Open selected group |
| `Esc` | Close detail view |

## Common Issues
| Problem | Fix |
|---------|-----|
| Group not listed | Check `education.groups` ACL, verify assignment in admin |
| Attendance button missing | Only shows on lesson days (check calendar) |
| Can't send notice | Verify group has students, check notice permissions |
| Guest link not working | Check expiry date, regenerate if expired |

---

## Deutsch

### Schneller Zugriff
- **Route**: `/pages/cranix/mygroups`
- **Menü**: Meine Gruppen
- **Erforderliche ACL**: `education.groups`

### UI-Übersicht
```
┌─────────────────────────────────────────────────────────────┐
│ Meine Gruppen                                                 │
├─────────────────────────────────────────────────────────────┤
│ [Filter: Alle ▼] [Suche: ___________] [Spalten]            │
├────┬──────────────┬──────────┬──────────┬──────────┬────────┤
│ ☐  │ Gruppenname  │ Typ      │ Schüler  │ Raum     │ Aktionen│
├────┼──────────────┼──────────┼──────────┼──────────┼────────┤
│ ☐  │ 10A Mathe    │ Klasse   │ 24       │ Raum 101 │ ⋮      │
│ ☐  │ 10B Physik   │ Kurs     │ 18       │ Labor 2  │ ⋮      │
│ ☐  │ Schach-AG    │ AG       │ 12       │ Raum 205 │ ⋮      │
└────┴──────────────┴──────────┴──────────┴──────────┴────────┘
```

**Tabs (pro Gruppe):**
- **Übersicht**: Schüler, Stundenplan, Raum
- **Stundenplan**: Wöchentliche Ansicht
- **Noten**: Notenbuch (falls aktiviert)
- **Mitteilungen**: Gruppen-Ankündigungen

### Top-Workflows

#### 1. Eigene Unterrichtsgruppen Anzeigen
1. **Meine Gruppen** öffnen → Alle zugewiesenen Gruppen sehen
2. **Filtern**: Nach Typ (Klasse/Kurs/AG) oder Name suchen
3. Gruppenname klicken → Detailansicht öffnen

#### 2. Anwesenheit Erfassen
1. Gruppe klicken → **Übersicht**-Tab
2. **[Anwesenheit erfassen]** klicken (bei heutigem Unterricht)
3. Markieren: Anwesend / Fehlend / Verspätet / Entschuldigt
3. **Speichern** → Sync zur Verwaltung

#### 3. Gruppen-Stundenplan Anzeigen
1. Gruppe klicken → **Stundenplan**-Tab
2. Wöchenplan mit Räumen sehen
3. **Drucken** → Wochenplan für Klassenzimmertür

#### 4. Mitteilung an Gruppe Senden
1. Gruppe klicken → **Mitteilungen**-Tab
2. **[+ Neue Mitteilung]** klicken
3. **Titel**, **Inhalt** (Markdown unterstützt)
4. **Priorität**: Normal / Hoch / Dringend
5. **Senden** → Push-Benachrichtigung an Schüler/Eltern

#### 5. Gastzugang Verwalten (Elternsprechtag)
1. Gruppe klicken → **Übersicht** → **Gastzugang**
2. Link für Elternsprechtag generieren
3. Link an Eltern teilen
4. Eltern registrieren sich ohne Login

#### 6. Schülerliste Exportieren
1. Gruppe klicken → **Übersicht**
2. **Exportieren** → CSV/Excel/PDF
3. Felder wählen: Name, E-Mail, Telefon, Eltern
4. Herunterladen → Für Ausflüge, Prüfungen nutzen

### Tastaturkürzel
| Taste | Aktion |
|-------|--------|
| `/` | Suche fokussieren |
| `Enter` | Ausgewählte Gruppe öffnen |
| `Esc` | Detailansicht schließen |

### Häufige Probleme
| Problem | Lösung |
|---------|--------|
| Gruppe nicht gelistet | `education.groups` ACL prüfen, Zuordnung im Admin verifizieren |
| Anwesenheits-Button fehlt | Zeigt nur an Unterrichtstagen (Kalender prüfen) |
| Mitteilung nicht sendbar | Prüfen ob Gruppe Schüler hat, Berechtigungen prüfen |
| Gastlink funktioniert nicht | Ablaufdatum prüfen, neu generieren falls abgelaufen |