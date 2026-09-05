# Room Control / Raumsteuerung

## Quick Access
- **Route**: `/pages/edu/lessons/roomcontrol`
- **Menu**: Education → Lessons → Room Control
- **Required ACL**: `education.rooms`

## UI Overview
```
┌─────────────────────────────────────────────────────────────┐
│ Room Control                                         [Refresh]│
├─────────────────────────────────────────────────────────────┤
│ [My Rooms] [All Rooms] [Filter: Building ▼] [Search]       │
├────┬──────────────┬──────────┬──────────┬──────────┬────────┤
│ ☐  │ Room Name    │ Building │ Status   │ Current  │ Actions│
├────┼──────────────┼──────────┼──────────┼──────────┼────────┤
│ ☐  │ Room 101     │ Main     │ 🟢 Free  │ -        │ 🖥️ 🔒 📊│
│ ☐  │ Lab Physics  │ Science  │ 🔴 Busy  │ 10A Phys │ 🖥️ 🔒 📊│
│ ☐  │ Computer Lab │ IT       │ 🟡 Ltd   │ 11 CS    │ 🖥️ 🔒 📊│
└────┴──────────────┴──────────┴──────────┴──────────┴────────┘
```

**Status Indicators:**
- 🟢 **Green/Free**: Available for booking
- 🔴 **Red/Busy**: Currently in use (shows group)
- 🟡 **Yellow/Limited**: Restricted access (exam, maintenance)
- ⚫ **Grey/Offline**: Device/controller offline

**Action Buttons (per room):**
- 🖥️ **Screen/Device Control**: Projector, screen, audio, PC
- 🔒 **Access Control**: Lock/unlock door (if electronic)
- 📊 **Monitoring**: Temperature, CO2, device status

---

## Top Workflows

### 1. Prepare Room for Lesson
1. Open **Room Control** → Find your room (My Rooms filter)
2. Click **🖥️ Screen Control** for your room
3. **Pre-set** (before class):
   - **Projector**: ON / Select input (HDMI 1 / Wireless / PC)
   - **Screen**: DOWN / UP
   - **Audio**: Volume level, source
   - **PC**: Wake on LAN (if asleep)
4. **Save as Preset** → Name: "Physics Lesson Setup"
5. Next time: Click preset → One-click setup

### 2. Control During Lesson
1. Room Control → Your room → **🖥️ Screen Control**
2. **Quick Actions**:
   - **Blank Screen**: Hide content temporarily (shortcut: `B`)
   - **Freeze**: Freeze current image (shortcut: `F`)
   - **Switch Input**: HDMI 1 ↔ HDMI 2 ↔ Wireless ↔ PC
   - **Volume**: Slider / Mute
3. **Student Screen Sharing** (if enabled):
   - See connected student devices
   - **Approve** sharing request
   - **Show** student screen on projector

### 3. Manage Room Access
1. Room → **🔒 Access Control**
2. **Electronic Lock** (if installed):
   - **Unlock for Class**: 5 min before → Auto-lock after
   - **Manual Unlock**: Click → Door opens for 30 sec
   - **Lockdown**: Immediate secure (emergency)
3. **Access Log**: Who entered/when (card readers)

### 4. Monitor Room Environment
1. Room → **📊 Monitoring**
2. **Real-time Sensors**:
   - **Temperature**: Target 20-22°C
   - **CO2 Level**: < 1000 ppm (green), 1000-1500 (yellow), >1500 (red)
   - **Humidity**: 40-60%
3. **Device Status**:
   - Projector: Lamp hours, filter status
   - PC: Online/Offline, updates pending
   - Network: Connected devices count
4. **Alerts**: Configure thresholds → Email/Push notifications

### 5. Book Room Ad-Hoc
1. Room shows 🟢 Free → Click **Book Now**
2. Select: Duration (30/60/90 min / Custom)
3. **Purpose**: Lesson / Meeting / Exam / Other
4. **Confirm** → Room status → 🔴 Busy, added to calendar

### 6. Report Issue / Maintenance
1. Room → **⋮ Actions** → **Report Issue**
2. **Category**: Projector / Audio / PC / Network / Climate / Lock / Other
3. **Description**: What's wrong, urgency
3. **Submit** → Creates ticket for IT/Admin
4. **Track**: See status in Informations/Tickets

### 7. End of Day / Week Shutdown
1. **My Rooms** → Select all → **Bulk Actions**
2. **Power Off All**: Projectors, PCs, screens up
3. **Lock All Doors** (if electronic)
4. **Schedule**: Auto-shutdown at 18:00 (configurable)

---

## Key Shortcuts (in Screen Control)
| Key | Action |
|-----|--------|
| `B` | Blank Screen (toggle) |
| `F` | Freeze Image (toggle) |
| `M` | Mute Audio (toggle) |
| `1` `2` `3` `4` | Switch Input (HDMI1, HDMI2, Wireless, PC) |
| `↑` `↓` | Volume Up/Down |
| `Esc` | Close control panel |

---

## Common Issues
| Problem | Fix |
|---------|-----|
| Projector not responding | Check: Network cable, power, try Wake on LAN |
| Screen control not loading | Refresh, check room controller online (📊 tab) |
| Audio no sound | Check: Correct input selected, volume not muted, cable |
| Door won't unlock | Verify electronic lock online, try manual override |
| CO2 alert during class | Open windows, check ventilation system |
| Student can't share screen | Verify: Screen sharing enabled in room settings, student on same network |

---

## Deutsch

### Schneller Zugriff
- **Route**: `/pages/edu/lessons/roomcontrol`
- **Menü**: Bildung → Unterricht → Raumsteuerung
- **Erforderliche ACL**: `education.rooms`

### UI-Übersicht
```
┌─────────────────────────────────────────────────────────────┐
│ Raumsteuerung                                       [Aktual.] │
├─────────────────────────────────────────────────────────────┤
│ [Meine Räume] [Alle Räume] [Filter: Gebäude ▼] [Suche]     │
├────┬──────────────┬──────────┬──────────┬──────────┬────────┤
│ ☐  │ Raumname     │ Gebäude  │ Status   │ Aktuell  │ Aktionen│
├────┼──────────────┼──────────┼──────────┼──────────┼────────┤
│ ☐  │ Raum 101     │ Haupt    │ 🟢 Frei  │ -        │ 🖥️ 🔒 📊│
│ ☐  │ Labor Physik │ NatWiss  │ 🔴 Belegt│ 10A Phys │ 🖥️ 🔒 📊│
│ ☐  │ Computerraum │ IT       │ 🟡 Begren│ 11 Info  │ 🖥️ 🔒 📊│
└────┴──────────────┴──────────┴──────────┴──────────┴────────┘
```

**Status-Anzeigen:**
- 🟢 **Grün/Frei**: Verfügbar für Buchung
- 🔴 **Rot/Belegt**: Gerade in Nutzung (zeigt Gruppe)
- 🟡 **Gelb/Begrenzt**: Eingeschränkter Zugang (Prüfung, Wartung)
- ⚫ **Grau/Offline**: Gerät/Controller offline

**Aktions-Buttons (pro Raum):**
- 🖥️ **Bildschirm/Geräte-Steuerung**: Beamer, Leinwand, Audio, PC
- 🔒 **Zugangskontrolle**: Tür auf/zu (falls elektronisch)
- 📊 **Monitoring**: Temperatur, CO2, Gerätestatus

---

### Top-Workflows

#### 1. Raum Für Unterricht Vorbereiten
1. **Raumsteuerung** öffnen → Eigenen Raum finden (Filter "Meine Räume")
2. **🖥️ Bildschirmsteuerung** für Raum klicken
3. **Vor einstellen** (vor Unterricht):
   - **Beamer**: EIN / Eingang wählen (HDMI 1 / Wireless / PC)
   - **Leinwand**: RUNTER / RAUF
   - **Audio**: Lautstärke, Quelle
   - **PC**: Wake on LAN (falls Schlafmodus)
4. **Als Preset speichern** → Name: "Physik Unterricht Setup"
5. Nächstes Mal: Preset klicken → One-Click Setup

#### 2. Während Unterricht Steuern
1. Raumsteuerung → Dein Raum → **🖥️ Bildschirmsteuerung**
2. **Schnell-Aktionen**:
   - **Bildschirm leeren**: Inhalt temporär ausblenden (Shortcut: `B`)
   - **Einfrieren**: Aktuelles Bild einfrieren (Shortcut: `F`)
   - **Eingang wechseln**: HDMI 1 ↔ HDMI 2 ↔ Wireless ↔ PC
   - **Lautstärke**: Slider / Stummschalten
3. **Schüler-Bildschirm-Teilen** (falls aktiviert):
   - Verbundene Schülergeräte sehen
   - **Genehmigen** Teilen-Anfrage
   - **Anzeigen** Schülerbildschirm auf Beamer

#### 3. Raumzugang Verwalten
1. Raum → **🔒 Zugangskontrolle**
2. **Elektronisches Schloss** (falls vorhanden):
   - **Für Klasse öffnen**: 5 Min vor Beginn → Auto-verriegeln nach
   - **Manuell öffnen**: Klicken → Tür 30 Sek offen
   - **Lockdown**: Sofort sichern (Notfall)
3. **Zugangsprotokoll**: Wer wann rein/raus (Kartenleser)

#### 4. Raumumgebung Überwachen
1. Raum → **📊 Monitoring**
2. **Echtzeit-Sensoren**:
   - **Temperatur**: Ziel 20-22°C
   - **CO2-Wert**: < 1000 ppm (grün), 1000-1500 (gelb), >1500 (rot)
   - **Luftfeuchte**: 40-60%
3. **Gerätestatus**:
   - Beamer: Lampenstunden, Filterstatus
   - PC: Online/Offline, Updates ausstehend
   - Netzwerk: Verbundene Geräte Anzahl
4. **Alarme**: Schwellenwerte konfigurieren → E-Mail/Push-Benachrichtigung

#### 5. Raum Ad-Hoc Buchen
1. Raum zeigt 🟢 Frei → **Jetzt buchen** klicken
2. Wählen: Dauer (30/60/90 Min / Benutzerdefiniert)
3. **Zweck**: Unterricht / Besprechung / Prüfung / Sonstiges
4. **Bestätigen** → Raumstatus → 🔴 Belegt, im Kalender eingetragen

#### 6. Problem Melden / Wartung
1. Raum → **⋮ Aktionen** → **Problem melden**
2. **Kategorie**: Beamer / Audio / PC / Netzwerk / Klima / Schloss / Sonstiges
2. **Beschreibung**: Was kaputt, Dringlichkeit
3. **Absenden** → Erstellt Ticket für IT/Admin
4. **Verfolgen**: Status in Informationen/Tickets sehen

#### 7. Tages-/Wochenende Abschaltung
1. **Meine Räume** → Alle auswählen → **Massenaktionen**
2. **Alle ausschalten**: Beamer, PCs, Leinwände hoch
3. **Alle Türen verriegeln** (falls elektronisch)
4. **Planen**: Auto-Abschaltung um 18:00 (konfigurierbar)

---

### Tastaturkürzel (in Bildschirmsteuerung)
| Taste | Aktion |
|-------|--------|
| `B` | Bildschirm leeren (Toggle) |
| `F` | Bild einfrieren (Toggle) |
| `M` | Audio stummschalten (Toggle) |
| `1` `2` `3` `4` | Eingang wechseln (HDMI1, HDMI2, Wireless, PC) |
| `↑` `↓` | Lautstärke Hoch/Runter |
| `Esc` | Steuerungspanel schließen |

---

### Häufige Probleme
| Problem | Lösung |
|---------|--------|
| Beamer reagiert nicht | Prüfen: Netzwerkkabel, Strom, Wake on LAN versuchen |
| Bildschirmsteuerung lädt nicht | Aktualisieren, Raumcontroller online prüfen (📊 Tab) |
| Kein Ton | Prüfen: Richtiger Eingang gewählt, nicht stumm, Kabel |
| Tür öffnet nicht | Elektronisches Schloss online prüfen, manueller Override |
| CO2-Alarm im Unterricht | Fenster öffnen, Lüftungsanlage prüfen |
| Schüler kann Bildschirm nicht teilen | Prüfen: Bildschirmteilen in Raumeinstellungen aktiv, Schüler im selben Netzwerk |