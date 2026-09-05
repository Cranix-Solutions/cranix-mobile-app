# Lessons / Tests / Unterricht / Tests

## Quick Access
- **Route**: `/pages/edu/lessons/tests`
- **Menu**: Education → Lessons → Tests
- **Required ACL**: `permitall`

## UI Overview
```
┌─────────────────────────────────────────────────────────────┐
│ Lessons / Tests                                    [+ New]   │
├─────────────────────────────────────────────────────────────┤
│ [My Lessons] [All Lessons] [Filter: Subject ▼] [Search]    │
├────┬──────────────┬──────────┬──────────┬──────────┬────────┤
│ ☐  │ Title        │ Subject  │ Group    │ Type     │ Status │
├────┼──────────────┼──────────┼──────────┼──────────┼────────┤
│ ☐  │ Photosynthesis│ Biology | 10A Bio  │ Test     │ Draft  │
│ ☐  │ WWI Causes   │ History  │ 10B Hist │ Lesson   │ Active │
│ ☐  │ Algebra Quiz │ Math     │ 10A Math │ Quiz     │ Done   │
└────┴──────────────┴──────────┴──────────┴──────────┴────────┘
```

**Lesson/Test Detail Tabs:**
| Tab | Purpose |
|-----|---------|
| **Content** | Lesson material, questions, resources |
| **Schedule** | When it runs, duration, room |
| **Results** | Student scores, statistics (tests only) |
| **Submissions** | Student answers, grading |

---

## Top Workflows

### 1. Create a New Test/Quiz
1. Click **[+ New]** → **Test** or **Quiz**
2. **Basic Info**:
   - Title: "Chapter 5 Test - Cell Biology"
   - Subject: Biology
   - Group(s): 10A Biology
   - Type: Test (graded) / Quiz (practice)
3. **Questions**:
   - Click **[+ Add Question]**
   - Types: Single Choice / Multiple Choice / True-False / Short Answer / Essay
   - Set: Question text, options, correct answer, points
   - **Randomize**: Shuffle questions/options per student
4. **Settings**:
   - Time limit: 45 minutes
   - Attempts: 1 (Test) / Unlimited (Quiz)
   - Show results: Immediately / After deadline / Manual
5. **Schedule**: Date, start time, duration, room
6. **Save as Draft** → **Publish** when ready

### 2. Create a Lesson with Materials
1. **[+ New]** → **Lesson**
2. **Title**: "Introduction to Photosynthesis"
3. **Content Tab**:
   - Rich text editor: explanations, images, videos
   - **Embed**: YouTube, Vimeo, local videos
   - **Attach**: PDFs, worksheets, presentations
4. **Schedule**: When taught, room
5. **Homework Link**: Attach follow-up assignment
6. **Publish** → Students see in calendar & lessons

### 3. Import Questions from Question Bank
1. In Test editor → **[Import Questions]**
2. Filter: Subject, Topic, Difficulty, Question Type
3. Select questions → **Add to Test**
4. Adjust points/order as needed

### 4. Monitor Live Test Progress
1. During test: Open test → **Live View**
2. See: Students started, in progress, submitted
3. **Time remaining** per student
4. **Pause/Extend** time for individual/class
5. **Lock** browser (if kiosk mode enabled)

### 5. Grade and Review Results
1. After test: Open → **Results** tab
2. **Auto-graded**: Multiple choice, True/False
3. **Manual grading**: Short answer, Essay
   - Click student → See answer → Assign points
   - **Rubric**: Use predefined criteria
4. **Statistics**: Class average, distribution, question analysis
5. **Release Results**: Choose what students see
6. **Export**: CSV/Excel for grade book

### 6. Provide Feedback
1. **Results** → Click student → **Feedback**
2. Write: Strengths, areas to improve
3. **Attach**: Annotated PDF, audio feedback
4. **Send** → Student notified

### 7. Duplicate for Another Class
1. Open existing test → **⋮ Actions** → **Duplicate**
2. Select target group: 10B Biology
3. Adjust: Title, schedule, maybe questions
4. **Save** → New independent copy

---

## Key Shortcuts
| Key | Action |
|-----|--------|
| `N` | New Lesson/Test |
| `/` | Search |
| `Ctrl+S` | Save draft |
| `Esc` | Cancel/Close |

---

## Common Issues
| Problem | Fix |
|---------|-----|
| Students can't access test | Check: Published, correct group, within time window |
| Auto-grade wrong | Review answer key, edit question → Re-grade |
| Time limit not enforced | Verify kiosk mode / browser lock settings |
| Can't import questions | Check question bank permissions, subject match |
| Results not releasing | Check "Show results" setting, manually release |

---

## Deutsch

### Schneller Zugriff
- **Route**: `/pages/edu/lessons/tests`
- **Menü**: Bildung → Unterricht → Tests
- **Erforderliche ACL**: `permitall`

### UI-Übersicht
```
┌─────────────────────────────────────────────────────────────┐
│ Unterricht / Tests                            [+ Neu]        │
├─────────────────────────────────────────────────────────────┤
│ [Meine] [Alle] [Filter: Fach ▼] [Suche]                     │
├────┬──────────────┬──────────┬──────────┬──────────┬────────┤
│ ☐  │ Titel        │ Fach     │ Gruppe   │ Typ      │ Status │
├────┼──────────────┼──────────┼──────────┼──────────┼────────┤
│ ☐  │ Photosynthese│ Biologie | 10A Bio  │ Test     │ Entwurf│
│ ☐  │ WKI Ursachen │ Geschichte│ 10B Gesch│ Unterricht│ Aktiv │
│ ☐  │ Algebra Quiz | Mathe    │ 10A Mathe│ Quiz     │ Erledigt│
└────┴──────────────┴──────────┴──────────┴──────────┴────────┘
```

**Lernkontrolle/Unterricht Detail-Tabs:**
| Tab | Zweck |
|-----|-------|
| **Inhalt** | Unterrichtsmaterial, Fragen, Ressourcen |
| **Termin** | Wann, Dauer, Raum |
| **Ergebnisse** | Schülerpunktzahlen, Statistiken (nur Tests) |
| **Abgaben** | Schülerantworten, Bewertung |

---

### Top-Workflows

#### 1. Neuen Test/Quiz Erstellen
1. **[+ Neu]** → **Test** oder **Quiz**
2. **Grunddaten**:
   - Titel: "Kapitel 5 Test - Zellbiologie"
   - Fach: Biologie
   - Gruppe(n): 10A Biologie
   - Typ: Test (benotet) / Quiz (Übung)
3. **Fragen**:
   - **[+ Frage hinzufügen]** klicken
   - Typen: Single Choice / Multiple Choice / Wahr-Falsch / Kurzantwort / Essay
   - Setzen: Fragentext, Optionen, richtige Antwort, Punkte
   - **Zufällige Reihenfolge**: Fragen/Optionen pro Schüler mischen
4. **Einstellungen**:
   - Zeitlimit: 45 Minuten
   - Versuche: 1 (Test) / Unbegrenzt (Quiz)
   - Ergebnisse anzeigen: Sofort / Nach Frist / Manuell
5. **Termin**: Datum, Startzeit, Dauer, Raum
6. **Als Entwurf speichern** → **Veröffentlichen** wenn fertig

#### 2. Unterricht mit Materialien Erstellen
1. **[+ Neu]** → **Unterricht**
2. **Titel**: "Einführung in Photosynthese"
3. **Inhalt-Tab**:
   - Rich-Text-Editor: Erklärungen, Bilder, Videos
   - **Einbetten**: YouTube, Vimeo, lokale Videos
   - **Anhängen**: PDFs, Arbeitsblätter, Präsentationen
4. **Termin**: Wann unterrichtet, Raum
5. **Hausaufgaben-Link**: Folgeaufgabe anhängen
6. **Veröffentlichen** → Schüler sehen in Kalender & Unterricht

#### 3. Fragen aus Fragensammlung Importieren
1. Im Test-Editor → **[Fragen importieren]**
2. Filtern: Fach, Thema, Schwierigkeit, Fragetyp
3. Fragen auswählen → **Zum Test hinzufügen**
4. Punkte/Reihenfolge anpassen

#### 4. Live-Test Fortschritt Überwachen
1. Während Test: Test öffnen → **Live-Ansicht**
2. Sehen: Gestartet, in Bearbeitung, abgegeben
3. **Verbleibende Zeit** pro Schüler
4. **Pause/Verlängern** für einzelne/Klasse
5. **Browser sperren** (falls Kiosk-Modus aktiv)

#### 5. Bewerten und Ergebnisse Prüfen
1. Nach Test: Öffnen → **Ergebnisse**-Tab
2. **Auto-bewertet**: Multiple Choice, Wahr/Falsch
3. **Manuelle Bewertung**: Kurzantwort, Essay
   - Schüler klicken → Antwort sehen → Punkte vergeben
   - **Bewertungsraster**: Vorgefertigte Kriterien nutzen
4. **Statistik**: Klassendurchschnitt, Verteilung, Fragenanalyse
5. **Ergebnisse freigeben**: Wählen was Schüler sehen
6. **Exportieren**: CSV/Excel für Notenbuch

#### 6. Feedback Geben
1. **Ergebnisse** → Schüler klicken → **Feedback**
2. Schreiben: Stärken, Verbesserungsbereiche
3. **Anhängen**: Kommentiertes PDF, Audio-Feedback
4. **Senden** → Schüler benachrichtigt

#### 7. Für Andere Klasse Duplizieren
1. Bestehenden Test öffnen → **⋮ Aktionen** → **Duplizieren**
2. Zielgruppe wählen: 10B Biologie
3. Anpassen: Titel, Termin, evtl. Fragen
4. **Speichern** → Neue unabhängige Kopie

---

### Tastaturkürzel
| Taste | Aktion |
|-------|--------|
| `N` | Neuer Unterricht/Test |
| `/` | Suche |
| `Ctrl+S` | Entwurf speichern |
| `Esc` | Abbrechen/Schließen |

---

### Häufige Probleme
| Problem | Lösung |
|---------|--------|
| Schüler können Test nicht öffnen | Prüfen: Veröffentlicht, korrekte Gruppe, innerhalb Zeitfenster |
| Auto-Bewertung falsch | Antwortschlüssel prüfen, Frage bearbeiten → Neu bewerten |
| Zeitlimit nicht erzwungen | Kiosk-Modus / Browser-Sperre Einstellungen prüfen |
| Fragen nicht importierbar | Fragensammlung-Berechtigungen, Fach-Übereinstimmung prüfen |
| Ergebnisse nicht freigegeben | "Ergebnisse anzeigen" Einstellung prüfen, manuell freigeben |