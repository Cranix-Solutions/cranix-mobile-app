# Informations / Informationen

## Quick Access
- **Route**: `/pages/cranix/informations`
- **Menu**: Informations
- **Required ACL**: `permitall`

## UI Overview
```
┌─────────────────────────────────────────────────────────────┐
│ Informations                                    [+ New Info] │
├─────────────────────────────────────────────────────────────┤
│ [Filter: All ▼] [Search: ___________] [My Infos] [Columns] │
├────┬──────────────┬──────────┬──────────┬──────────┬────────┤
│ ☐  │ Title        │ Author   │ Target   │ Status   │ Actions│
├────┼──────────────┼──────────┼──────────┼──────────┼────────┤
│ ☐  │ Exam Dates   │ Admin    │ All      │ Published│ ⋮      │
│ ☐  │ Trip Reminder│ Me       │ 10A Math │ Draft    │ ⋮      │
│ ☐  │ Parent Evening│ Me     │ 10A Parents│ Sent   │ ⋮      │
└────┴──────────────┴──────────┴──────────┴──────────┴────────┘
```

**Detail View (click title):**
- Full content (Rich Text / Markdown)
- Target audience: All / Groups / Users / Parents
- Attachments
- Responses (if survey/poll enabled)
- Publish/Schedule options

---

## Top Workflows

### 1. Create Announcement for My Class
1. Click **[+ New Info]**
2. **Title**: "Homework for Friday - Math 10A"
3. **Content**: Write in Rich Text editor (bold, lists, links)
4. **Target Audience**: Select **Groups** → Choose "10A Math"
5. **Type**: Announcement / Homework / Event / Survey
6. **Publish**: Now / Schedule for later
7. Click **Save** → Students get push notification

### 2. Send Homework with Attachment
1. **[+ New Info]** → Title: "Worksheet: Quadratic Equations"
2. **Content**: Instructions, due date
3. **Attachment**: Click **Upload** → Select PDF worksheet
4. **Target**: Group "10A Math"
5. **Type**: Homework
6. **Save** → Students see attachment in app

### 3. Create Parent Survey/Poll
1. **[+ New Info]** → Title: "Parent Evening - Date Preference"
2. **Content**: Description, proposed dates
3. **Enable Responses**: Toggle ON
4. **Response Type**: Single choice / Multiple choice / Text
5. **Options**: "Mon 18:00", "Tue 18:00", "Wed 18:00"
6. **Target**: "10A Parents" (parent group)
7. **Save** → Parents vote, you see results in real-time

### 4. Schedule Recurring Weekly Update
1. **[+ New Info]** → Title: "Weekly Plan - Week 38"
2. **Content**: Template with placeholders
3. **Target**: Your class group
4. **Schedule**: Set date/time for Monday 07:00
5. **Repeat**: Weekly (create each week manually or use template)
6. **Save as Draft** → Edit Monday morning → Publish

### 5. View Responses to Survey
1. Open Informations → Click survey title
2. **Responses** tab shows:
   - Response count / percentage
   - Individual responses (anonymous or named)
   - Export to CSV for analysis
3. **Close Survey** → No more responses accepted

### 6. Edit/Delete Own Informations
1. **My Infos** filter → See only your creations
2. Click **⋮ Actions** → **Edit** / **Delete**
3. **Edit**: Modify content, target, schedule
4. **Delete**: Confirm → Removed for all recipients

### 7. Pin Important Info
1. Open info detail → Click **Pin** icon
2. Pinned items appear at top of list
3. **Unpin** when no longer critical

---

## Key Shortcuts
| Key | Action |
|-----|--------|
| `N` | New Information (if focused) |
| `/` | Focus search |
| `Enter` | Open selected info |
| `Esc` | Close detail / Cancel edit |

---

## Common Issues
| Problem | Fix |
|---------|-----|
| Students don't see info | Check: Published (not draft), correct target group |
| Attachment not downloading | File size > 50MB? Split or use cloud link |
| Survey responses missing | Check: Responses enabled, not closed |
| Can't target parent group | Verify parent group exists (admin creates) |
| Rich text formatting lost | Use Markdown for reliable formatting |

---

## Deutsch

### Schneller Zugriff
- **Route**: `/pages/cranix/informations`
- **Menü**: Informationen
- **Erforderliche ACL**: `permitall`

### UI-Übersicht
```
┌─────────────────────────────────────────────────────────────┐
│ Informationen                            [+ Neue Info]       │
├─────────────────────────────────────────────────────────────┤
│ [Filter: Alle ▼] [Suche: ___________] [Meine Infos] [Spalt.]│
├────┬──────────────┬──────────┬──────────┬──────────┬────────┤
│ ☐  │ Titel        │ Autor    │ Zielgrp. │ Status   │ Aktionen│
├────┼──────────────┼──────────┼──────────┼──────────┼────────┤
│ ☐  │ Klausurtermine│ Admin   │ Alle     │ Veröffentlicht│ ⋮   │
│ ☐  │ Ausflug-Erinnerung│ Ich │ 10A Mathe│ Entwurf  │ ⋮      │
│ ☐  │ Elternabend  │ Ich      │ 10A Eltern│ Gesendet│ ⋮      │
└────┴──────────────┴──────────┴──────────┴──────────┴────────┘
```

**Detailansicht (Titel klicken):**
- Voller Inhalt (Rich Text / Markdown)
- Zielgruppe: Alle / Gruppen / Benutzer / Eltern
- Anhänge
- Antworten (falls Umfrage/Umfrage aktiviert)
- Veröffentlichen/Planen Optionen

---

### Top-Workflows

#### 1. Ankündigung für Eigene Klasse Erstellen
1. **[+ Neue Info]** klicken
2. **Titel**: "Hausaufgabe für Freitag - Mathe 10A"
3. **Inhalt**: Im Rich-Text-Editor schreiben (Fett, Listen, Links)
4. **Zielgruppe**: **Gruppen** wählen → "10A Mathe" auswählen
5. **Typ**: Ankündigung / Hausaufgabe / Veranstaltung / Umfrage
6. **Veröffentlichen**: Sofort / Später planen
7. **Speichern** → Schüler erhalten Push-Benachrichtigung

#### 2. Hausaufgabe mit Anhang Senden
1. **[+ Neue Info]** → Titel: "Arbeitsblatt: Quadratische Gleichungen"
2. **Inhalt**: Anweisungen, Abgabetermin
3. **Anhang**: **Hochladen** klicken → PDF-Arbeitsblatt wählen
4. **Zielgruppe**: Gruppe "10A Mathe"
5. **Typ**: Hausaufgabe
6. **Speichern** → Schüler sehen Anhang in App

#### 3. Eltern-Umfrage Erstellen
1. **[+ Neue Info]** → Titel: "Elternabend - Terminwunsch"
2. **Inhalt**: Beschreibung, vorgeschlagene Termine
3. **Antworten aktivieren**: Umschalten AN
4. **Antworttyp**: Einzelwahl / Mehrfachwahl / Text
5. **Optionen**: "Mo 18:00", "Di 18:00", "Mi 18:00"
6. **Zielgruppe**: "10A Eltern" (Elterngruppe)
7. **Speichern** → Eltern stimmen ab, Ergebnisse in Echtzeit

#### 4. Wöchentliches Update Planen
1. **[+ Neue Info]** → Titel: "Wochenplan - KW 38"
2. **Inhalt**: Vorlage mit Platzhaltern
3. **Zielgruppe**: Eigene Klasse
4. **Planen**: Datum/Zeit für Montag 07:00 setzen
5. **Wiederholen**: Wöchentlich (jede Woche neu oder Vorlage nutzen)
6. **Als Entwurf speichern** → Montagmorgen bearbeiten → Veröffentlichen

#### 4. Umfrage-Antworten Anzeigen
1. Informationen öffnen → Umfragetitel klicken
2. **Antworten**-Tab zeigt:
   - Antwortanzahl / Prozent
   - Einzelne Antworten (anonym oder namentlich)
   - Export nach CSV für Auswertung
3. **Umfrage schließen** → Keine weiteren Antworten mehr

#### 5. Eigene Informationen Bearbeiten/Löschen
1. **Meine Infos**-Filter → Nur eigene Erstellungen sehen
2. **⋮ Aktionen** → **Bearbeiten** / **Löschen**
3. **Bearbeiten**: Inhalt, Zielgruppe, Termin ändern
4. **Löschen**: Bestätigen → Für alle Empfänger entfernt

#### 6. Wichtige Info Anheften
1. Info-Detail öffnen → **Anheften**-Icon klicken
2. Angeheftete Einträge erscheinen oben in Liste
3. **Anheften aufheben** wenn nicht mehr kritisch

---

### Tastaturkürzel
| Taste | Aktion |
|-------|--------|
| `N` | Neue Information (wenn fokussiert) |
| `/` | Suche fokussieren |
| `Enter` | Ausgewählte Info öffnen |
| `Esc` | Detail schließen / Bearbeitung abbrechen |

---

### Häufige Probleme
| Problem | Lösung |
|---------|--------|
| Schüler sehen Info nicht | Prüfen: Veröffentlicht (nicht Entwurf), korrekte Zielgruppe |
| Anhang nicht downloadbar | Datei > 50MB? Aufteilen oder Cloud-Link nutzen |
| Umfrage-Antworten fehlen | Prüfen: Antworten aktiviert, nicht geschlossen |
| Elterngruppe nicht wählbar | Prüfen ob Elterngruppe existiert (Admin erstellt) |
| Rich-Text Formatierung verloren | Markdown für zuverlässige Formatierung nutzen |