# Notices / Mitteilungen

## Quick Access
- **Route**: Accessible from **any object list** via **⋮ Actions → Write Notice**
- **Direct URL**: `/pages/cranix/informations` (same as Informations, but pre-filtered)
- **Menu**: Not directly in menu - context action from lists
- **Required ACL**: `permitall`

## UI Overview

### Launching from Object Lists
```
┌─────────────────────────────────────────────────────────────┐
│ Users List                                          [Filter] │
├─────────────────────────────────────────────────────────────┤
│ ☐  │ Max Mustermann  │ 10A Math  │ Student  │ ⋮ Actions   │
│    │ ────────────────────────────────────────────────────  │
│    │ Actions: Edit | Password | Groups | ⋮ More            │
│    │         └─ Write Notice  ←──────────────────────────  │
└─────────────────────────────────────────────────────────────┘
```

### Notice Composer (Modal/Page)
```
┌─────────────────────────────────────────────────────────────┐
│ Write Notice                                        [Send]   │
├─────────────────────────────────────────────────────────────┤
│ To: [10A Math ▼]  [+ Add Group/User]  [Parents ▼]          │
├─────────────────────────────────────────────────────────────┤
│ Subject: [________________________________________________] │
├─────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────┐ │
│ │  Rich Text Editor                                       │ │
│ │  [B] [I] [U] [Link] [Image] [List] [Table] [Code]      │ │
│ │                                                         │ │
│ │  Dear students,                                         │ │
│ │                                                         │ │
│ │  Reminder: Test on Friday...                           │ │
│ │                                                         │ │
│ └─────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│ Attachments: [Upload]  [Drag files here]                    │
│ Options:  ☐ High Priority   ☐ Request Read Receipt         │
│           ☐ Send to Parents   ☐ Schedule for Later         │
└─────────────────────────────────────────────────────────────┘
```

---

## Top Workflows

### 1. Send Notice from Student List (Contextual)
1. Go to **Users** → **All Users** (or any list: Groups, Devices, Rooms)
2. Select one/multiple students (checkboxes)
3. Click **⋮ Actions** → **Write Notice**
3. **Pre-filled**: Recipients = selected users
4. Write subject & message
5. **Send** → Recipients get push notification

### 2. Send Notice to Entire Class/Group
1. Go to **Groups** or **My Groups**
2. Click group name → **⋮ Actions** → **Write Notice**
3. **Pre-filled**: Recipients = all group members (+ parents if enabled)
4. Compose & send

### 3. Quick Homework Reminder
1. From **Calendar** → Click lesson event → **Write Notice**
2. **Pre-filled**: Subject = lesson title, Recipients = attendees
3. Type: "Homework reminder: Exercise 5, page 42. Due tomorrow."
3. **Send**

### 4. Announce to Parents
1. From any list → **Write Notice**
2. **Recipients**: Click **Parents** toggle → Adds all parents of selected students
3. **Subject**: "Parent Evening - March 15, 18:00"
4. **Content**: Details, registration link (use PTM link from My Groups)
5. **Options**: ☐ High Priority, ☐ Request Read Receipt
6. **Send** → Parents receive via app/email

### 5. Schedule Notice for Later
1. Compose notice → **☐ Schedule for Later**
2. **Date/Time**: Select (e.g., Monday 07:00)
3. **Recurring**: Daily / Weekly / Monthly (optional)
3. **Schedule** → Appears in **Informations** as scheduled

### 6. Broadcast to Multiple Groups
1. **Write Notice** → **To:** field
2. Click **[+ Add Group/User]**
3. Search & add: "10A Math", "10B Math", "Math Teachers"
4. **Remove duplicates** auto-handled
5. **Send** → All unique recipients get one notification

### 7. Attach Files (Worksheets, Permission Slips)
1. In composer → **Attachments: [Upload]**
2. Select: PDF, DOC, Images (max 50MB total)
3. Files appear as downloadable links in notice
4. **Send** → Recipients tap to download

### 8. Track Read Receipts
1. After sending with **☐ Request Read Receipt**
2. Go to **Informations** → Find your notice
3. Click → **Read Receipts** tab
4. See: **Read** / **Unread** / **Failed** per recipient
5. **Resend** to unread (re-sends notification)

---

## Key Shortcuts
| Key | Action |
|-----|--------|
| `Ctrl+Enter` | Send notice |
| `Tab` | Next field |
| `Esc` | Close composer (asks to save draft) |

---

## Common Issues
| Problem | Fix |
|---------|-----|
| "Write Notice" not in Actions | Check: List type supports it (Users, Groups, Devices, Rooms) |
| Parents not receiving | Verify: Parent accounts exist, linked to students, app notifications on |
| Attachment too large | Compress PDF, use cloud link for >50MB |
| Scheduled notice not sent | Check: Server cron running, timezone correct |
| Duplicate notifications | System deduplicates by user - check recipient list |
| Read receipts not updating | Recipient must open app/notice - push alone doesn't count |

---

## Deutsch

### Schneller Zugriff
- **Route**: Erreichbar von **jeder Objektliste** über **⋮ Aktionen → Mitteilung schreiben**
- **Direkt-URL**: `/pages/cranix/informations` (wie Informationen, aber vorgefiltert)
- **Menü**: Nicht direkt im Menü - Kontextaktion aus Listen
- **Erforderliche ACL**: `permitall`

### UI-Übersicht

#### Starten aus Objektlisten
```
┌─────────────────────────────────────────────────────────────┐
│ Benutzerliste                                 [Filter]       │
├─────────────────────────────────────────────────────────────┤
│ ☐  │ Max Mustermann  │ 10A Mathe │ Schüler  │ ⋮ Aktionen   │
│    │ ────────────────────────────────────────────────────  │
│    │ Aktionen: Bearbeiten | Passwort | Gruppen | ⋮ Mehr    │
│    │         └─ Mitteilung schreiben ←───────────────────  │
└─────────────────────────────────────────────────────────────┘
```

#### Mitteilungs-Editor (Modal/Seite)
```
┌─────────────────────────────────────────────────────────────┐
│ Mitteilung schreiben                              [Senden]  │
├─────────────────────────────────────────────────────────────┤
│ An: [10A Mathe ▼]  [+ Gruppe/User]  [Eltern ▼]             │
├─────────────────────────────────────────────────────────────┤
│ Betreff: [________________________________________________] │
├─────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────┐ │
│ │  Rich Text Editor                                       │ │
│ │  [F] [K] [U] [Link] [Bild] [Liste] [Tabelle] [Code]    │ │
│ │                                                         │ │
│ │  Liebe Schüler,                                         │ │
│ │                                                         │ │
│ │  Erinnerung: Test am Freitag...                        │ │
│ │                                                         │ │
│ └─────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│ Anhänge: [Hochladen]  [Dateien hierher ziehen]              │
│ Optionen: ☐ Hohe Priorität   ☐ Lesebestätigung anfordern   │
│           ☐ An Eltern senden   ☐ Für später planen         │
└─────────────────────────────────────────────────────────────┘
```

---

### Top-Workflows

#### 1. Mitteilung Aus Schülerliste Senden (Kontextbezogen)
1. Zu **Benutzer** → **Alle Benutzer** (oder jede Liste: Gruppen, Geräte, Räume)
2. Einen/mehrere Schüler auswählen (Checkboxen)
3. **⋮ Aktionen** → **Mitteilung schreiben**
4. **Vorgefüllt**: Empfänger = ausgewählte Benutzer
5. Betreff & Nachricht schreiben
6. **Senden** → Empfänger erhalten Push-Benachrichtigung

#### 2. Ganzer Klasse/Gruppe Senden
1. Zu **Gruppen** oder **Meine Gruppen**
2. Gruppenname klicken → **⋮ Aktionen** → **Mitteilung schreiben**
3. **Vorgefüllt**: Empfänger = alle Gruppenmitglieder (+ Eltern falls aktiviert)
4. Verfassen & senden

#### 3. Schnelle Hausaufgaben-Erinnerung
1. Aus **Kalender** → Unterrichtstermin klicken → **Mitteilung schreiben**
2. **Vorgefüllt**: Betreff = Lektionstitel, Empfänger = Teilnehmer
3. Text: "Hausaufgabe: Aufgabe 5, Seite 42. Abgabe morgen."
4. **Senden**

#### 4. Ankündigung An Eltern
1. Aus beliebiger Liste → **Mitteilung schreiben**
2. **Empfänger**: **Eltern**-Umschalter klicken → Fügt alle Eltern der gewählten Schüler hinzu
3. **Betreff**: "Elternabend - 15. März, 18:00"
4. **Inhalt**: Details, Anmeldelink (PTM-Link aus Meine Gruppen nutzen)
5. **Optionen**: ☐ Hohe Priorität, ☐ Lesebestätigung anfordern
6. **Senden** → Eltern erhalten via App/E-Mail

#### 5. Mitteilung Für Später Planen
1. Mitteilung verfassen → **☐ Für später planen**
2. **Datum/Zeit**: Wählen (z.B. Montag 07:00)
3. **Wiederholend**: Täglich / Wöchentlich / Monatlich (optional)
4. **Planen** → Erscheint in **Informationen** als geplant

#### 6. An Mehrere Gruppen Senden (Broadcast)
1. **Mitteilung schreiben** → **An:** Feld
2. **[+ Gruppe/User hinzufügen]** klicken
3. Suchen & hinzufügen: "10A Mathe", "10B Mathe", "Mathe Lehrer"
4. **Doppelte automatisch entfernt**
5. **Senden** → Alle eindeutigen Empfänger erhalten eine Benachrichtigung

#### 7. Dateien Anhängen (Arbeitsblätter, Einverständnisse)
1. Im Editor → **Anhänge: [Hochladen]**
2. Auswählen: PDF, DOC, Bilder (max 50MB gesamt)
3. Dateien erscheinen als Download-Links in Mitteilung
4. **Senden** → Empfänger tippen zum Herunterladen

#### 8. Lesebestätigungen Verfolgen
1. Nach Senden mit **☐ Lesebestätigung anfordern**
2. Zu **Informationen** → Eigene Mitteilung finden
3. Klicken → **Lesebestätigungen**-Tab
4. Sehen: **Gelesen** / **Ungelesen** / **Fehlgeschlagen** pro Empfänger
5. **Erneut senden** an ungelesen (sendet Benachrichtigung erneut)

---

### Tastaturkürzel
| Taste | Aktion |
|-------|--------|
| `Ctrl+Enter` | Mitteilung senden |
| `Tab` | Nächstes Feld |
| `Esc` | Editor schließen (fragt nach Entwurf speichern) |

---

### Häufige Probleme
| Problem | Lösung |
|---------|--------|
| "Mitteilung schreiben" nicht in Aktionen | Prüfen: Listentyp unterstützt es (Benutzer, Gruppen, Geräte, Räume) |
| Eltern erhalten nichts | Prüfen: Elternaccounts existieren, mit Schülern verknüpft, App-Benachrichtigungen an |
| Anhang zu groß | PDF komprimieren, Cloud-Link für >50MB nutzen |
| Geplante Mitteilung nicht gesendet | Prüfen: Server-Cron läuft, Zeitzone korrekt |
| Doppelte Benachrichtigungen | System dedupliziert nach User - Empfängerliste prüfen |
| Lesebestätigungen nicht aktualisiert | Empfänger muss App/Mitteilung öffnen - Push allein zählt nicht |