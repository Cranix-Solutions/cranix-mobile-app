# Cranix Core: Calendar / Cranix Kern: Kalender

## English

### Overview

The **Calendar** (`/pages/cranix/calendar`) manages events, schedules, and room bookings. Requires one of: `calendar.manage`, `calendar.use`, `calendar.read`.

### Page Layout

```
┌─────────────────────────────────────────────────────────────────┐
│ Calendar                              [+ New Event]  [Today]   │
├─────────────────────────────────────────────────────────────────┤
│ [Month] [Week] [Day] [Agenda]    [◀ Prev] [Sep 2026] [Next ▶]  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ████████  ████████  ████████  ████████  ████████  ████████  ████████ │
│  █ Mon 31 █  █ Tue 1  █  █ Wed 2  █  █ Thu 3  █  █ Fri 4  █  █ Sat 5  █ │
│  ████████  ████████  ████████  ████████  ████████  ████████  ████████ │
│  █ 09:00  █  █ 10:00  █  █ 14:00  █  █        █  █ 09:00  █  █        █ │
│  █ Math   █  █ English █  █ Physics █  █        █  █ German █  █        █ │
│  █ Room 1 █  █ Room 2 █  █ Lab 1  █  █        █  █ Room 3 █  █        █ │
│  ████████  ████████  ████████  ████████  ████████  ████████  ████████ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Views

| View | Shortcut | Best For |
|------|----------|----------|
| **Month** | `M` | Overview, long-term planning |
| **Week** | `W` | Weekly schedule, conflicts |
| **Day** | `D` | Detailed daily view |
| **Agenda** | `A` | List of upcoming events |

---

### Step-by-Step Workflows

#### 1. Create New Event

1. Click **[+ New Event]** or click/drag on calendar
2. Fill **Event Details**:
   - **Title**: Event name (required)
   - **Type**: Lesson / Meeting / Exam / Maintenance / Other
   - **Date/Time**: Start/End (all-day option)
   - **Recurrence**: None / Daily / Weekly / Monthly / Custom
   - **Room**: Select from available rooms (shows conflicts)
   - **Groups**: Assign to groups (auto-invites members)
   - **Teachers**: Assign teachers
   - **Description**: Rich text details
   - **Color**: Category color coding
3. Click **Save**
4. Event appears on calendar → Notifications sent to participants

#### 2. Edit Event

1. Click event on calendar → **Edit**
   - Or right-click → **Edit Event**
2. Modify fields
3. **Recurring events**: Choose:
   - **This instance only**
   - **This and following**
   - **All instances**
4. Click **Save**

#### 3. Delete Event

1. Click event → **Delete**
2. For recurring: Choose scope (same as edit)
3. Confirm deletion
4. Notifications sent to participants

#### 4. Room Booking

1. Create event → Select **Room**
2. **Conflict detection**: Shows if room double-booked
3. **Alternative rooms**: Suggested available rooms
4. **Room resources**: Shows equipment (projector, whiteboard, etc.)

#### 5. Filter Events

**Filter Panel** (sidebar or toolbar):
- **My Events** / **All Events** / **Group Events**
- **Event Types**: Checkbox filter
- **Rooms**: Specific room filter
- **Date Range**: Custom range
- **Teachers**: Filter by assigned teacher

#### 6. Export / Print

1. Click **Export** / **Print** (toolbar)
2. Choose format:
   - **PDF**: Week/Month view, agenda list
   - **iCal**: Subscribe in Outlook/Google Calendar
   - **CSV**: Event data for reporting
3. Configure: Date range, filters, layout
4. Download/Print

---

### Recurring Events

#### Recurrence Patterns

| Pattern | Options |
|---------|---------|
| **Daily** | Every N days, weekdays only |
| **Weekly** | Specific days, every N weeks |
| **Monthly** | Day of month / Nth weekday |
| **Yearly** | Specific date / Nth weekday of month |
| **Custom** | Complex patterns (e.g., "every 2 weeks on Mon/Wed/Fri") |

#### Exceptions

- **Skip dates**: Holidays, breaks
- **Modified instances**: Time/room changes for specific occurrence
- **Cancelled instances**: Mark as cancelled but keep in series

---

### Integration with Timetable

If **Education Module** enabled:
- **Lessons** auto-appear from timetable
- **Manual events** overlay on timetable
- **Conflict detection** across both systems
- **Substitution** handling (teacher absence)

---

### Permissions by ACL

| ACL | Capabilities |
|-----|-------------|
| `calendar.read` | View only, no modifications |
| `calendar.use` | Create/edit own events, book rooms |
| `calendar.manage` | Full access: all events, rooms, settings, recurring management |

---

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `M` / `W` / `D` / `A` | Switch view |
| `←` / `→` | Previous/Next period |
| `T` | Go to today |
| `N` | New event |
| `?` | Show shortcuts help |
| `Esc` | Close dialog/deselect |

---

### Common Issues

| Issue | Solution |
|-------|----------|
| Events not showing | Check filter settings, verify ACL |
| Room conflicts not detected | Ensure room selected, refresh calendar |
| Recurring events wrong | Check timezone settings, recurrence pattern |
| Export missing events | Verify date range, filter settings |
| Sync with external cal fails | Check iCal URL, firewall/proxy settings |

---

## Deutsch

### Übersicht

Der **Kalender** (`/pages/cranix/calendar`) verwaltet Termine, Stundenpläne und Raumbelegungen. Benötigt eine von: `calendar.manage`, `calendar.use`, `calendar.read`.

### Seitenaufbau

```
┌─────────────────────────────────────────────────────────────────┐
│ Kalender                              [+ Neuer Termin] [Heute] │
├─────────────────────────────────────────────────────────────────┤
│ [Monat] [Woche] [Tag] [Agenda]    [◀ Zurück] [Sep 2026] [Vor ▶] │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ████████  ████████  ████████  ████████  ████████  ████████  ████████ │
│  █ Mo 31 █  █ Di 1  █  █ Mi 2  █  █ Do 3  █  █ Fr 4  █  █ Sa 5  █ │
│  ████████  ████████  ████████  ████████  ████████  ████████  ████████ │
│  █ 09:00  █  █ 10:00  █  █ 14:00  █  █        █  █ 09:00  █  █        █ │
│  █ Mathe  █  █ Englisch█  █ Physik █  █        █  █ Deutsch█  █        █ │
│  █ Raum 1 █  █ Raum 2 █  █ Labor 1█  █        █  █ Raum 3 █  █        █ │
│  ████████  ████████  ████████  ████████  ████████  ████████  ████████ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Ansichten

| Ansicht | Shortcut | Am Besten Für |
|---------|----------|---------------|
| **Monat** | `M` | Übersicht, langfristige Planung |
| **Woche** | `W` | Wochenplan, Konflikte |
| **Tag** | `D` | Detaillierte Tagesansicht |
| **Agenda** | `A` | Liste kommender Termine |

---

### Schritt-für-Schritt Workflows

#### 1. Neuen Termin Erstellen

1. **[+ Neuer Termin]** klicken oder in Kalender klicken/ziehen
2. **Termindetails** ausfüllen:
   - **Titel**: Veranstaltungsname (Pflicht)
   - **Typ**: Unterricht / Besprechung / Prüfung / Wartung / Sonstiges
   - **Datum/Zeit**: Anfang/Ende (Ganztägig-Option)
   - **Wiederholung**: Keine / Täglich / Wöchentlich / Monatlich / Benutzerdefiniert
   - **Raum**: Aus verfügbaren Räumen wählen (zeigt Konflikte)
   - **Gruppen**: Gruppen zuweisen (Mitglieder automatisch eingeladen)
   - **Lehrer**: Lehrer zuweisen
   - **Beschreibung**: Rich-Text Details
   - **Farbe**: Kategorien-Farbkodierung
3. **Speichern** klicken
4. Termin erscheint im Kalender → Benachrichtigungen an Teilnehmer

#### 2. Termin Bearbeiten

1. Termin im Kalender klicken → **Bearbeiten**
   - Oder Rechtsklick → **Termin bearbeiten**
2. Felder ändern
3. **Wiederholende Terminen**: Wählen:
   - **Nur diese Instanz**
   - **Diese und folgende**
   - **Alle Instanzen**
4. **Speichern** klicken

#### 3. Termin Löschen

1. Termin klicken → **Löschen**
2. Bei Wiederholungen: Umfang wählen (wie bei Bearbeiten)
3. Löschung bestätigen
4. Benachrichtigungen an Teilnehmer

#### 4. Raum-Buchung

1. Termin erstellen → **Raum** auswählen
2. **Konflikterkennung**: Zeigt Doppelbuchungen
3. **Alternative Räume**: Verfügbare Räume vorgeschlagen
4. **Raumausstattung**: Zeigt Equipment (Beamer, Whiteboard, etc.)

#### 5. Termine Filtern

**Filter-Panel** (Seitenleiste oder Toolbar):
- **Meine Termine** / **Alle Termine** / **Gruppen-Termine**
- **Termin-Typen**: Checkbox-Filter
- **Räume**: Spezifischer Raum-Filter
- **Datumsbereich**: Benutzerdefinierter Bereich
- **Lehrer**: Nach zugewiesenem Lehrer filtern

#### 6. Exportieren / Drucken

1. **Exportieren** / **Drucken** (Toolbar) klicken
2. Format wählen:
   - **PDF**: Wochen/Monatsansicht, Agenda-Liste
   - **iCal**: In Outlook/Google Calendar abonnieren
   - **CSV**: Veranstaltungsdaten für Reporting
3. Konfigurieren: Datumsbereich, Filter, Layout
4. Herunterladen/Drucken

---

### Wiederholende Termine

#### Wiederholungsmuster

| Muster | Optionen |
|--------|----------|
| **Täglich** | Alle N Tage, nur Werktage |
| **Wöchentlich** | Bestimmte Tage, alle N Wochen |
| **Monatlich** | Tag des Monats / N-ter Wochentag |
| **Jährlich** | Bestimmtes Datum / N-ter Wochentag des Monats |
| **Benutzerdefiniert** | Komplexe Muster (z.B. "alle 2 Wochen Mo/Mi/Fr") |

#### Ausnahmen

- **Termine überspringen**: Feiertage, Ferien
- **Geänderte Instanzen**: Zeit/Raum-Änderungen für bestimmten Termin
- **Abgesagte Instanzen**: Als abgesagt markieren aber in Serie behalten

---

### Integration mit Stundenplan

Wenn **Bildungsmodul** aktiv:
- **Unterricht** erscheint automatisch aus Stundenplan
- **Manuelle Termine** überlagern Stundenplan
- **Konflikterkennung** über beide Systeme
- **Vertretungsplan**-Handling (Lehrerabwesenheit)

---

### Berechtigungen nach ACL

| ACL | Fähigkeiten |
|-----|-------------|
| `calendar.read` | Nur anzeigen, keine Änderungen |
| `calendar.use` | Eigene Termine erstellen/bearbeiten, Räume buchen |
| `calendar.manage` | Vollzugriff: alle Termine, Räume, Einstellungen, Wiederholungen |

---

### Tastaturkürzel

| Taste | Aktion |
|-------|--------|
| `M` / `W` / `D` / `A` | Ansicht wechseln |
| `←` / `→` | Vorheriger/Nächster Zeitraum |
| `T` | Zu heute springen |
| `N` | Neuer Termin |
| `?` | Shortcuts-Hilfe anzeigen |
| `Esc` | Dialog schließen / Auswahl aufheben |

---

### Häufige Probleme

| Problem | Lösung |
|---------|--------|
| Termine nicht sichtbar | Filtereinstellungen prüfen, ACL verifizieren |
| Raumkonflikte nicht erkannt | Sicherstellen dass Raum gewählt, Kalender aktualisieren |
| Wiederholende Termine falsch | Zeitzone-Einstellungen, Wiederholungsmuster prüfen |
| Export unvollständig | Datumsbereich, Filtereinstellungen prüfen |
| Sync mit externem Kalender fehlschlägt | iCal-URL, Firewall/Proxy-Einstellungen prüfen |