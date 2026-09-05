# Calendar / Kalender

## Quick Access
- **Route**: `/pages/cranix/calendar`
- **Menu**: Calendar
- **Required ACL**: `calendar.read` / `calendar.use` / `calendar.manage`

## UI Overview
```
┌─────────────────────────────────────────────────────────────┐
│ Calendar                              [+ New Event] [Today] │
├─────────────────────────────────────────────────────────────┤
│ [Month] [Week] [Day] [Agenda]    [◀ Prev] [Month] [Next ▶] │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Mon 31    Tue 1     Wed 2     Thu 3     Fri 4     Sat 5   │
│  ──────    ──────    ──────    ──────    ──────    ──────  │
│  09:00     10:00     14:00               09:00             │
│  Math      English   Physics              German            │
│  Room 1    Room 2    Lab 1                Room 3            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Key Elements:**
- **View Switcher**: Month/Week/Day/Agenda
- **Navigation**: Previous/Next, Today button
- **New Event**: Floating action button
- **Event Cards**: Title, time, room, color-coded by type

## Top Workflows

### 1. Create a Lesson/Event
1. Click **[+ New Event]** or click/drag on a time slot
2. Fill in:
   - **Title**: Lesson name (e.g., "Math 10A")
   - **Type**: Select "Lesson"
   - **Date/Time**: Start/End (adjust if needed)
   - **Room**: Choose from dropdown (shows availability)
   - **Groups**: Select your class/group
   - **Description**: Homework, materials, notes
3. Click **Save** → Students see in their calendar

### 2. Book a Room for a Meeting
1. Click **[+ New Event]**
2. **Type**: Select "Meeting"
3. **Room**: Pick room → System shows conflicts in red
4. **Groups**: Leave empty or add colleagues
5. **Save** → Room booked, appears in calendar

### 3. View Week Schedule (Print for Class)
1. Switch to **Week** view (`W` key)
2. Click **Print** / **Export** → **PDF**
3. Select: Current week, "My Events" filter
4. Print → Hand out or post in classroom

### 4. Check Room Availability
1. Switch to **Day** view (`D` key)
2. Look at room columns
3. Empty slots = available
4. Click empty slot → Quick book

### 5. Create Recurring Lesson
1. Create event → **Recurrence**: "Weekly"
2. Set: Day(s) of week, every 1 week
3. **End date**: Semester end
4. **Exceptions**: Add holidays via "Skip dates"
5. Save → Whole semester scheduled

## Key Shortcuts
| Key | Action |
|-----|--------|
| `M` / `W` / `D` / `A` | Month / Week / Day / Agenda view |
| `←` / `→` | Previous / Next period |
| `T` | Jump to Today |
| `N` | New Event |
| `?` | Show all shortcuts |
| `Esc` | Close dialog |

## Common Issues
| Problem | Fix |
|---------|-----|
| Event not visible | Check filter: "My Events" vs "All Events" |
| Room conflict not shown | Ensure room is selected before saving |
| Recurring events wrong time | Check timezone in Profile → Myself |
| Can't create event | Verify `calendar.use` ACL with admin |

---

## Deutsch

### Schneller Zugriff
- **Route**: `/pages/cranix/calendar`
- **Menü**: Kalender
- **Erforderliche ACL**: `calendar.read` / `calendar.use` / `calendar.manage`

### UI-Übersicht
```
┌─────────────────────────────────────────────────────────────┐
│ Kalender                            [+ Neuer Termin] [Heute]│
├─────────────────────────────────────────────────────────────┤
│ [Monat] [Woche] [Tag] [Agenda]   [◀ Zurück] [Monat] [Vor ▶] │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Mo 31      Di 1       Mi 2       Do 3       Fr 4      Sa 5 │
│  ──────    ──────    ──────    ──────    ──────    ──────  │
│  09:00     10:00     14:00                  09:00          │
│  Mathe     Englisch  Physik                 Deutsch         │
│  Raum 1    Raum 2    Labor 1                Raum 3          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Wichtige Elemente:**
- **Ansicht-Wechsler**: Monat/Woche/Tag/Agenda
- **Navigation**: Zurück/Vor, Heute-Button
- **Neuer Termin**: Schwebender Aktionsbutton
- **Termin-Karten**: Titel, Zeit, Raum, farbkodiert nach Typ

### Top-Workflows

#### 1. Unterricht/Termin Erstellen
1. **[+ Neuer Termin]** klicken oder in Zeitslot klicken/ziehen
2. Ausfüllen:
   - **Titel**: Unterrichtsname (z.B. "Mathe 10A")
   - **Typ**: "Unterricht" wählen
   - **Datum/Zeit**: Anfang/Ende (anpassen falls nötig)
   - **Raum**: Aus Dropdown wählen (zeigt Verfügbarkeit)
   - **Gruppen**: Eigene Klasse/Gruppe wählen
   - **Beschreibung**: Hausaufgaben, Materialien, Notizen
3. **Speichern** → Schüler sehen im Kalender

#### 2. Raum für Besprechung Buchen
1. **[+ Neuer Termin]** klicken
2. **Typ**: "Besprechung" wählen
3. **Raum**: Auswählen → System zeigt Konflikte rot
4. **Gruppen**: Leer lassen oder Kollegen hinzufügen
5. **Speichern** → Raum gebucht, erscheint im Kalender

#### 3. Wochenplan Anzeigen (Für Klasse Drucken)
1. Auf **Woche** Ansicht wechseln (`W` Taste)
2. **Drucken** / **Exportieren** → **PDF**
3. Wählen: Aktuelle Woche, Filter "Meine Termine"
4. Drucken → Austeilen oder im Klassenzimmer aufhängen

#### 4. Raumverfügbarkeit Prüfen
1. Auf **Tag** Ansicht wechseln (`D` Taste)
2. Raumspalten ansehen
3. Leere Slots = verfügbar
4. Leeren Slot klicken → Schnell buchen

#### 5. Wiederholenden Unterricht Erstellen
1. Termin erstellen → **Wiederholung**: "Wöchentlich"
2. Einstellen: Wochentag(e), jede 1 Woche
3. **Enddatum**: Semesterende
4. **Ausnahmen**: Feiertage über "Termine überspringen" hinzufügen
5. Speichern → Ganzes Semester geplant

### Tastaturkürzel
| Taste | Aktion |
|-------|--------|
| `M` / `W` / `D` / `A` | Monat / Woche / Tag / Agenda Ansicht |
| `←` / `→` | Vorheriger / Nächster Zeitraum |
| `T` | Zu Heute springen |
| `N` | Neuer Termin |
| `?` | Alle Shortcuts anzeigen |
| `Esc` | Dialog schließen |

### Häufige Probleme
| Problem | Lösung |
|---------|--------|
| Termin nicht sichtbar | Filter prüfen: "Meine Termine" vs "Alle Termine" |
| Raumkonflikt nicht angezeigt | Sicherstellen dass Raum vor Speichern gewählt |
| Wiederholung falsche Zeit | Zeitzone in Profil → Selbst prüfen |
| Kein Termin erstellen möglich | `calendar.use` ACL beim Admin prüfen |