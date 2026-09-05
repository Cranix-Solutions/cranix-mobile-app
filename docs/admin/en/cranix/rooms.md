# Cranix Core: Rooms Management / Cranix Kern: Raumverwaltung

## English

### Overview

The **Rooms** page (`/pages/cranix/rooms`) manages physical rooms in the school. Requires `room.manage` ACL.

### Page Layout

#### Rooms List (`/pages/cranix/rooms/all`)

```
┌─────────────────────────────────────────────────────────────────┐
│ Rooms                                          [+ Add Room]      │
├─────────────────────────────────────────────────────────────────┤
│ [Filter: All ▼] [Search: ___________] [Columns]                │
├────┬──────────┬──────────┬──────────┬──────────┬────────┬───────┤
│ ☐  │ Name     │ Description│ Room Type│ Room Ctrl│ HWConf │ Act. │
├────┼──────────┼──────────┼──────────┼──────────┼────────┼───────┤
│ ☐  │ Room 101 │ 1st Floor │ Computer │ allTeach.│ HW-01  │ ⋮    │
│ ☐  │ Lab Phys │ Science   │ Lab      │ teachers │ HW-02  │ ⋮    │
│ ☐  │ Art Room │ Creative  │ Standard │ all      │ HW-03  │ ⋮    │
└────┴──────────┴──────────┴──────────┴──────────┴────────┴───────┘
```

**Columns:**
| Column | Description |
|--------|-------------|
| **Name** | Room identifier |
| **Description** | Location/description |
| **Room Type** | ComputerRoom / Lab / Standard / Classroom |
| **Room Control** | Access control: allTeachers / teachers / all / none |
| **HWConf** | Hardware configuration assigned |
| **Actions** | Edit, DHCP, Printers, Devices, Delete |

#### Ad-hoc Rooms (`/pages/cranix/rooms/adhoc`)

```
┌─────────────────────────────────────────────────────────────────┐
│ Ad-hoc Rooms                                [+ Add Ad-hoc Room] │
├─────────────────────────────────────────────────────────────────┤
│ [Search: ___________] [Columns]                                │
├────┬──────────┬──────────┬──────────┬──────────┬────────┬───────┤
│ ☐  │ Name     │ Description│ Dev Count│ Dev/User │ Room Ctrl│ Act.│
├────┼──────────┼──────────┼──────────┼──────────┼──────────┼──────┤
│ ☐  │ Exam-01  │ Exam Hall │ 100      │ 1        │ all      │ ⋮   │
└────┴──────────┴──────────┴──────────┴──────────┴──────────┴──────┘
```

Ad-hoc rooms are temporary rooms for exams, events - no fixed network config.

---

### Step-by-Step Workflows

#### 1. Create New Room
1. Click **[+ Add Room]** (top-right)
2. Fill form:
   - **Name**: Unique room name (e.g., "Room 101", "Lab-Physics")
   - **Description**: Location details (building, floor, capacity)
   - **Room Type**: ComputerRoom / Lab / Standard / Classroom
   - **Room Control**: Access policy
     - `allTeachers` - All teachers can control
     - `teachers` - Only assigned teachers
     - `all` - Everyone
     - `none` - No remote control
   - **HWConf**: Select hardware configuration (defines device defaults)
   - **Network**: Select network segment (DHCP range)
   - **Device Count**: Number of device IPs to reserve (default: 32)
   - **Places**: Number of seats
   - **Rows**: Number of rows
3. Click **Save**
4. Room appears in list → Configure DHCP, printers, devices

#### 2. Edit Room
1. In list, click **⋮ Actions** → **Edit**
2. Modify fields
3. Click **Save**

#### 3. Configure DHCP for Room
1. Click **⋮ Actions** → **DHCP** on room row
2. Modal opens with DHCP settings:
   - **Start IP**: First IP in range
   - **Netmask**: Subnet mask
   - **Gateway**: Default gateway
   - **DNS**: DNS servers
   - **Lease Time**: DHCP lease duration
   - **Options**: Additional DHCP options
3. **Save** → Applies to all devices in room

#### 4. Assign Printers to Room
1. Click **⋮ Actions** → **Printers** on room row
2. Modal shows available printers
3. Select printers → **Assign**
4. Printers now available for devices in this room

#### 5. View/Manage Devices in Room
1. Click **⋮ Actions** → **Devices** on room row
2. Navigates to **Devices** page filtered to this room
3. See all devices assigned to room
4. Can add/edit devices directly

#### 6. Create Ad-hoc Room
1. Switch to **Ad-hoc Rooms** tab
2. Click **[+ Add Ad-hoc Room]**
3. Fill:
   - **Name**: Temporary name (e.g., "Exam-Math-2024")
   - **Description**: Purpose, date, location
   - **Device Count**: Total devices (default: 512)
   - **Devices Per User**: How many devices per user
   - **Room Control**: Access policy (default: allTeachers)
   - **Group IDs**: Groups with access
   - **User IDs**: Specific users with access
   - **Students Only**: Restrict to students only
4. **Save** → Use for temporary events/exams

#### 7. Delete Room
⚠️ **Warning**: Removes room, DHCP config, device assignments!

1. Click **⋮ Actions** → **Delete**
2. Confirm: Type room name
3. **Delete** → Room removed

---

### Search, Filter & Bulk Actions

- **Search**: Filters by name, description, room type
- **Filter**: By room type, room control, HWConf
- **Columns**: Show/hide columns
- **Bulk Actions** (select multiple):
  - **Delete** multiple rooms
  - **Export** to CSV/Excel/PDF
  - **Set Room Control** for multiple

---

### Permissions Reference

| Action | Required ACL |
|--------|-------------|
| View list | `room.manage` |
| Create | `room.manage` |
| Edit | `room.modify` |
| DHCP Config | `room.manage` |
| Printer Assignment | `room.manage` |
| Delete | `room.manage` + confirmation |

---

### Common Issues

| Issue | Solution |
|-------|----------|
| Room not showing devices | Check: Device has correct `roomId` assigned |
| DHCP not working | Verify network selected, start IP in range |
| Printer not available | Assign printer to room first |
| Ad-hoc room not accessible | Check group/user IDs, room control setting |
| Room type missing | Add via admin → HWConfs or system config |

---

## Deutsch

### Übersicht

Die **Räume**-Seite (`/pages/cranix/rooms`) verwaltet physische Räume in der Schule. Benötigt `room.manage` ACL.

### Seitenaufbau

#### Räume-Liste (`/pages/cranix/rooms/all`)

```
┌─────────────────────────────────────────────────────────────────┐
│ Räume                                        [+ Raum hinzufügen] │
├─────────────────────────────────────────────────────────────────┤
│ [Filter: Alle ▼] [Suche: ___________] [Spalten]                │
├────┬──────────┬──────────┬──────────┬──────────┬────────┬───────┤
│ ☐  │ Name     │ Beschreibung│ Raumtyp │ Raumsteuer.│ HWConf│ Akt. │
├────┼──────────┼──────────┼──────────┼──────────┼────────┼───────┤
│ ☐  │ Raum 101 │ 1. Stock  │ Computer │ allTeach.│ HW-01 │ ⋮    │
│ ☐  │ Labor Ph │ Naturwiss.│ Labor    │ teachers │ HW-02 │ ⋮    │
│ ☐  │ Kunstraum│ Kreativ   │ Standard │ all      │ HW-03 │ ⋮    │
└────┴──────────┴──────────┴──────────┴──────────┴────────┴───────┘
```

**Spalten:**
| Spalte | Beschreibung |
|--------|-------------|
| **Name** | Raumbezeichnung |
| **Beschreibung** | Standort/Beschreibung |
| **Raumtyp** | ComputerRoom / Lab / Standard / Classroom |
| **Raumsteuerung** | Zugriffskontrolle: allTeachers / teachers / all / none |
| **HWConf** | Zugewiesene Hardware-Konfiguration |
| **Aktionen** | Bearbeiten, DHCP, Drucker, Geräte, Löschen |

#### Ad-hoc Räume (`/pages/cranix/rooms/adhoc`)

```
┌─────────────────────────────────────────────────────────────────┐
│ Ad-hoc Räume                            [+ Ad-hoc Raum +]      │
├─────────────────────────────────────────────────────────────────┤
│ [Suche: ___________] [Spalten]                                 │
├────┬──────────┬──────────┬──────────┬──────────┬────────┬───────┤
│ ☐  │ Name     │ Beschreibung│ Geräte-Anz│ Geräte/User│ Rm.Ctrl│ Akt.│
├────┼──────────┼──────────┼──────────┼──────────┼──────────┼──────┤
│ ☐  │ Klausur-01│ Klausursaal│ 100      │ 1        │ all     │ ⋮   │
└────┴──────────┴──────────┴──────────┴──────────┴──────────┴──────┘
```

Ad-hoc-Räume sind temporäre Räume für Prüfungen, Events - ohne feste Netzwerkkonfiguration.

---

### Schritt-für-Schritt Workflows

#### 1. Neuen Raum Anlegen
1. **[+ Raum hinzufügen]** klicken (rechts oben)
2. Formular ausfüllen:
   - **Name**: Eindeutiger Raumname (z.B. "Raum 101", "Labor-Physik")
   - **Beschreibung**: Standortdetails (Gebäude, Etage, Kapazität)
   - **Raumtyp**: ComputerRoom / Lab / Standard / Classroom
   - **Raumsteuerung**: Zugriffsrichtlinie
     - `allTeachers` - Alle Lehrer können steuern
     - `teachers` - Nur zugewiesene Lehrer
     - `all` - Jeder
     - `none` - Keine Fernsteuerung
   - **HWConf**: Hardware-Konfiguration wählen (definiert Geräte-Standards)
   - **Netzwerk**: Netzwerksegment wählen (DHCP-Bereich)
   - **Geräteanzahl**: Anzahl reservierter Geräte-IPs (Standard: 32)
   - **Plätze**: Anzahl Sitzplätze
   - **Reihen**: Anzahl Reihen
3. **Speichern** klicken
4. Raum erscheint in Liste → DHCP, Drucker, Geräte konfigurieren

#### 2. Raum Bearbeiten
1. In Liste: **⋮ Aktionen** → **Bearbeiten**
2. Felder ändern
3. **Speichern** klicken

#### 3. DHCP Für Raum Konfigurieren
1. **⋮ Aktionen** → **DHCP** in Raumzeile klicken
2. Modal öffnet DHCP-Einstellungen:
   - **Start-IP**: Erste IP im Bereich
   - **Netzmaske**: Subnetzmaske
   - **Gateway**: Standard-Gateway
   - **DNS**: DNS-Server
   - **Lease Time**: DHCP-Lease-Dauer
   - **Optionen**: Zusätzliche DHCP-Optionen
3. **Speichern** → Gilt für alle Geräte im Raum

#### 4. Drucker Dem Raum Zuweisen
1. **⋮ Aktionen** → **Drucker** in Raumzeile klicken
2. Modal zeigt verfügbare Drucker
3. Drucker auswählen → **Zuweisen**
4. Drucker nun für Geräte in diesem Raum verfügbar

#### 5. Geräte Im Raum Anzeigen/Verwalten
1. **⋮ Aktionen** → **Geräte** in Raumzeile klicken
2. Navigiert zu **Geräte**-Seite gefiltert auf diesen Raum
3. Alle dem Raum zugeordneten Geräte sehen
4. Geräte direkt hinzufügen/bearbeiten

#### 6. Ad-hoc Raum Erstellen
1. Zu **Ad-hoc Räume**-Tab wechseln
2. **[+ Ad-hoc Raum hinzufügen]** klicken
3. Ausfüllen:
   - **Name**: Temporärer Name (z.B. "Klausur-Mathe-2024")
   - **Beschreibung**: Zweck, Datum, Ort
   - **Geräteanzahl**: Gesamte Geräte (Standard: 512)
   - **Geräte pro User**: Wie viele Geräte pro Benutzer
   - **Raumsteuerung**: Zugriffsrichtlinie (Standard: allTeachers)
   - **Gruppen-IDs**: Gruppen mit Zugriff
   - **Benutzer-IDs**: Spezifische Benutzer mit Zugriff
   - **Nur Schüler**: Auf Schüler beschränken
4. **Speichern** → Für temporäre Events/Prüfungen nutzen

#### 7. Raum Löschen
⚠️ **Warnung**: Entfernt Raum, DHCP-Konfig, Gerätezuordnungen!

1. **⋮ Aktionen** → **Löschen** klicken
2. Bestätigen: Raumname eingeben
3. **Löschen** → Raum entfernt

---

### Suche, Filter & Massenaktionen

- **Suche**: Filtert nach Name, Beschreibung, Raumtyp
- **Filter**: Nach Raumtyp, Raumsteuerung, HWConf
- **Spalten**: Spalten ein-/ausblenden
- **Massenaktionen** (mehrere auswählen):
  - **Mehrere Räume löschen**
  - **Exportieren** nach CSV/Excel/PDF
  - **Raumsteuerung setzen** für mehrere

---

### Berechtigungs-Referenz

| Aktion | Erforderliche ACL |
|--------|------------------|
| Liste anzeigen | `room.manage` |
| Erstellen | `room.manage` |
| Bearbeiten | `room.modify` |
| DHCP Konfiguration | `room.manage` |
| Drucker-Zuordnung | `room.manage` |
| Löschen | `room.manage` + Bestätigung |

---

### Häufige Probleme

| Problem | Lösung |
|---------|--------|
| Raum zeigt keine Geräte | Prüfen: Gerät hat korrekte `roomId` |
| DHCP funktioniert nicht | Netzwerk prüfen, Start-IP im Bereich |
| Drucker nicht verfügbar | Drucker zuerst dem Raum zuweisen |
| Ad-hoc Raum nicht zugänglich | Gruppen/Benutzer-IDs, Raumsteuerung prüfen |
| Raumtyp fehlt | Über Admin → HWConfs oder Systemconfig hinzufügen |