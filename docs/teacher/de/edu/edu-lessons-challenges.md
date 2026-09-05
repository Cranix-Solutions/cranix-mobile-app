# Challenges / Challenges

## Quick Access
- **Route**: `/pages/edu/lessons/challenges`
- **Menu**: Education → Lessons → Challenges
- **Required ACL**: `challenge.manage`

## UI Overview
```
┌─────────────────────────────────────────────────────────────┐
│ Challenges                                    [+ New Challenge]│
├─────────────────────────────────────────────────────────────┤
│ [Active] [Draft] [Archived] [Filter: Subject ▼] [Search]   │
├────┬──────────────┬──────────┬──────────┬──────────┬────────┤
│ ☐  │ Title        │ Subject  │ Group    │ Type     │ Status │
├────┼──────────────┼──────────┼──────────┼──────────┼────────┤
│ ☐  │ Escape Room  │ Physics  │ 10A Phys │ Team     │ Active │
│ ☐  │ Code Breaker │ CS       │ 11 CS    │ Individual│ Draft  │
│ ☐  │ Math Relay   │ Math     │ 9 Math   │ Team     │ Done   │
└────┴──────────────┴──────────┴──────────┴──────────┴────────┘
```

**Challenge Detail Tabs:**
| Tab | Purpose |
|-----|---------|
| **Setup** | Tasks, stations, rules, scoring |
| **Teams** | Team assignment, progress tracking |
| **Live** | Real-time scoreboard, timer |
| **Results** | Final scores, certificates, analytics |

---

## Top Workflows

### 1. Create a Team Challenge (Escape Room Style)
1. Click **[+ New Challenge]**
2. **Basic Setup**:
   - Title: "Physics Escape Room: Quantum Quest"
   - Subject: Physics
   - Groups: 10A Physics, 10B Physics
   - **Type**: Team Challenge
   - **Mode**: Station-based / Sequential / Free exploration
3. **Stations/Tasks** (add 5-8):
   - Click **[+ Add Station]**
   - Station 1: "Decrypt the wavelength" (QR code puzzle)
   - Station 2: "Circuit builder" (hands-on + photo upload)
   - Station 3: "Formula race" (timed quiz)
   - Each: Title, Description, Points, Time limit, Resources (PDF, links)
4. **Scoring**:
   - Points per station
   - Bonus: Speed, accuracy, collaboration
   - **Leaderboard**: Visible during / after
5. **Schedule**: Date, start/end time, rooms (one per station)
6. **Save & Publish**

### 2. Create Individual Challenge (Gamified Homework)
1. **[+ New Challenge]** → **Individual**
2. **Title**: "Weekly Math Challenge - Week 5"
3. **Tasks**: 10 progressive difficulty questions
4. **Gamification**:
   - XP points per correct answer
   - Streak bonus (daily login)
   - Badges: "Speed Solver", "Perfect Week"
5. **Schedule**: Monday 00:00 → Sunday 23:59
5. **Publish** → Students play at own pace

### 3. Run Live Challenge (During Lesson)
1. Challenge **Published** → Click **Start Live**
2. **Live Dashboard** shows:
   - **Timer**: Countdown (configurable)
   - **Scoreboard**: Real-time team rankings
   - **Station Status**: Which team where
   - **Alerts**: Team stuck, time warnings
3. **Teacher Actions**:
   - **Pause/Resume** timer
   - **Add Time** to specific team
   - **Hint Request**: Approve/deny (costs points)
   - **Force Submit** at deadline
4. **End Challenge** → Auto-calculate winners

### 4. Manage Teams
1. Challenge → **Teams** tab
2. **Auto-assign**: Random, balanced by skill
3. **Manual**: Drag students to teams
4. **Team Names**: Let students choose or assign
5. **Team Captains**: Designate (can submit for team)

### 5. Review Results & Award Certificates
1. After challenge → **Results** tab
2. **Final Standings**: Teams ranked
3. **Per-Station Analysis**: Where teams struggled
4. **Certificates**: Generate PDF certificates
   - 1st/2nd/3rd place
   - Participation
   - Special awards (creativity, teamwork)
5. **Export**: Results CSV for grades
6. **Analytics**: Compare classes, track improvement

### 6. Clone Challenge for Next Year
1. **Archived** filter → Find last year's challenge
2. **⋮ Actions** → **Clone**
3. Update: Groups, dates, minor content tweaks
4. **Publish** → Ready for new cohort

---

## Key Shortcuts
| Key | Action |
|-----|--------|
| `N` | New Challenge |
| `Space` | Start/Pause live timer |
| `←` `→` | Navigate stations (live view) |
| `Esc` | Exit live mode |

---

## Common Issues
| Problem | Fix |
|---------|-----|
| Students can't join | Check: Published, correct groups, not started yet |
| Live scoreboard not updating | Refresh browser, check WebSocket connection |
| Team submission failed | Verify all required stations completed |
| Timer out of sync | Server time drift - contact admin |
| Certificates not generating | Check PDF permissions, try regeneration |

---

## Deutsch

### Schneller Zugriff
- **Route**: `/pages/edu/lessons/challenges`
- **Menü**: Bildung → Unterricht → Challenges
- **Erforderliche ACL**: `challenge.manage`

### UI-Übersicht
```
┌─────────────────────────────────────────────────────────────┐
│ Challenges                              [+ Neue Challenge]   │
├─────────────────────────────────────────────────────────────┤
│ [Aktiv] [Entwurf] [Archiviert] [Filter: Fach ▼] [Suche]    │
├────┬──────────────┬──────────┬──────────┬──────────┬────────┤
│ ☐  │ Titel        │ Fach     │ Gruppe   │ Typ      │ Status │
├────┼──────────────┼──────────┼──────────┼──────────┼────────┤
│ ☐  │ Escape Room  │ Physik   │ 10A Phys │ Team     │ Aktiv  │
│ ☐  │ Code Knacker │ Info     │ 11 Info  │ Einzel   │ Entwurf│
│ ☐  │ Mathe-Staffel│ Mathe    │ 9 Mathe  │ Team     │ Fertig │
└────┴──────────────┴──────────┴──────────┴──────────┴────────┘
```

**Challenge Detail-Tabs:**
| Tab | Zweck |
|-----|-------|
| **Setup** | Aufgaben, Stationen, Regeln, Bewertung |
| **Teams** | Teameinteilung, Fortschritt |
| **Live** | Echtzeit-Scoreboard, Timer |
| **Ergebnisse** | Endergebnisse, Urkunden, Analysen |

---

### Top-Workflows

#### 1. Team-Challenge Erstellen (Escape Room Stil)
1. **[+ Neue Challenge]** klicken
2. **Grundsetup**:
   - Titel: "Physik Escape Room: Quantum Quest"
   - Fach: Physik
   - Gruppen: 10A Physik, 10B Physik
   - **Typ**: Team-Challenge
   - **Modus**: Stationsbasiert / Sequentiell / Freie Erkundung
3. **Stationen/Aufgaben** (5-8 hinzufügen):
   - **[+ Station hinzufügen]** klicken
   - Station 1: "Wellenlänge entschlüsseln" (QR-Code Puzzle)
   - Station 2: "Schaltkreis bauen" (Handwerk + Foto-Upload)
   - Station 3: "Formel-Rennen" (Zeit-Quiz)
   - Jeweils: Titel, Beschreibung, Punkte, Zeitlimit, Ressourcen (PDF, Links)
4. **Bewertung**:
   - Punkte pro Station
   - Bonus: Geschwindigkeit, Genauigkeit, Zusammenarbeit
   - **Bestenliste**: Währenddessen / danach sichtbar
5. **Termin**: Datum, Start/Ende, Räume (pro Station einer)
6. **Speichern & Veröffentlichen**

#### 2. Einzel-Challenge Erstellen (Gamifizierte Hausaufgabe)
1. **[+ Neue Challenge]** → **Einzel**
2. **Titel**: "Wöchentliche Mathe-Challenge - Woche 5"
3. **Aufgaben**: 10 progressive Schwierigkeitsgrade
4. **Gamifizierung**:
   - XP-Punkte pro richtiger Antwort
   - Streak-Bonus (täglicher Login)
   - Badges: "Schnell-Löser", "Perfekte Woche"
5. **Zeitraum**: Montag 00:00 → Sonntag 23:59
6. **Veröffentlichen** → Schüler spielen im eigenen Tempo

#### 3. Live-Challenge Durchführen (Im Unterricht)
1. Challenge **Veröffentlicht** → **Live starten** klicken
2. **Live-Dashboard** zeigt:
   - **Timer**: Countdown (konfigurierbar)
   - **Bestenliste**: Echtzeit-Team-Rankings
   - **Stations-Status**: Welches Team wo
   - **Alarme**: Team festgefahren, Zeitwarnungen
3. **Lehrer-Aktionen**:
   - **Pause/Fortsetzen** Timer
   - **Zeit hinzufügen** für spezifisches Team
   - **Hinweis-Anfrage**: Genehmigen/Verweigern (kostet Punkte)
   - **Erzwungene Abgabe** bei Deadline
4. **Challenge beenden** → Automatische Gewinner-Ermittlung

#### 4. Teams Verwalten
1. Challenge → **Teams**-Tab
2. **Auto-Zuteilung**: Zufällig, nach Fähigkeiten ausbalanciert
3. **Manuell**: Schüler per Drag & Drop in Teams
4. **Teamnamen**: Schüler wählen lassen oder zuweisen
5. **Teamkapitäne**: Benennen (können für Team abgeben)

#### 5. Ergebnisse Prüfen & Urkunden Vergeben
1. Nach Challenge → **Ergebnisse**-Tab
2. **Endstand**: Teams gerankt
3. **Pro-Station Analyse**: Wo Teams Probleme hatten
4. **Urkunden**: PDF-Urkunden generieren
   - 1./2./3. Platz
   - Teilnahme
   - Sonderpreise (Kreativität, Teamwork)
5. **Exportieren**: Ergebnisse CSV für Noten
6. **Analysen**: Klassen vergleichen, Verbesserung tracken

#### 6. Challenge Für Nächstes Jahr Klonen
1. **Archiviert**-Filter → Letztes Jahr Challenge finden
2. **⋮ Aktionen** → **Klonen**
3. Aktualisieren: Gruppen, Daten, kleine Inhaltsänderungen
4. **Veröffentlichen** → Fertig für neuen Jahrgang

---

### Tastaturkürzel
| Taste | Aktion |
|-------|--------|
| `N` | Neue Challenge |
| `Space` | Live Timer Start/Pause |
| `←` `→` | Stationen navigieren (Live-Ansicht) |
| `Esc` | Live-Modus verlassen |

---

### Häufige Probleme
| Problem | Lösung |
|---------|--------|
| Schüler können nicht beitreten | Prüfen: Veröffentlicht, korrekte Gruppen, noch nicht gestartet |
| Live-Bestenliste aktualisiert nicht | Browser aktualisieren, WebSocket-Verbindung prüfen |
| Team-Abgabe fehlgeschlagen | Prüfen: Alle Pflichtstationen bearbeitet |
| Timer out of sync | Server-Zeitdrift - Admin kontaktieren |
| Urkunden nicht generiert | PDF-Berechtigungen prüfen, Regenerieren versuchen |