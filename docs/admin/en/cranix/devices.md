# Cranix Core: Devices & Printers / Cranix Kern: Geräte & Drucker

## English

### Overview

The **Devices** page (`/pages/cranix/devices`) manages all network devices (computers, thin clients, printers, etc.). Requires `device.manage` ACL.

### Page Layout

#### Devices List (`/pages/cranix/devices/all`)

```
┌─────────────────────────────────────────────────────────────────┐
│ Devices                                    [+ Add Device]        │
├─────────────────────────────────────────────────────────────────┤
│ [Filter: All ▼] [Room: All ▼] [Search: ___________] [Columns]  │
├────┬──────────┬──────────┬──────────┬──────────┬────────┬───────┤
│ ☐  │ Name     │ MAC      │ IP       │ HWConf   │ Room   │ Act. │
├────┼──────────┼──────────┼──────────┼──────────┼────────┼───────┤
│ ☐  │ PC-101-01│ 00:11:22 │ 10.1.1.10│ HW-PC    │ Room101│ ⋮    │
│ ☐  │ PC-101-02│ 00:11:22 │ 10.1.1.11│ HW-PC    │ Room101│ ⋮    │
│ ☐  │ ThinCl-01│ 00:11:22 │ 10.1.1.20│ HW-TC    │ Lab-Phy│ ⋮    │
└────┴──────────┴──────────┴──────────┴──────────┴────────┴───────┘
```

**Columns:**
| Column | Description |
|--------|-------------|
| **Name** | Device hostname |
| **MAC** | Ethernet MAC address |
| **IP** | Assigned IP address |
| **HWConf** | Hardware configuration |
| **Room** | Assigned room |
| **Actions** | Edit, DHCP, Printers, Delete |

#### Printers List (`/pages/cranix/devices/printers`)

```
┌─────────────────────────────────────────────────────────────────┐
│ Printers                                  [+ Add Printer]        │
├─────────────────────────────────────────────────────────────────┤
│ [Search: ___________] [Columns]                                │
├────┬──────────┬──────────┬──────────┬──────────┬────────┬───────┤
│ ☐  │ Name     │ Model    │ Device   │ Accepting│ Active │ Act. │
├────┼──────────┼──────────┼──────────┼──────────┼────────┼───────┤
│ ☐  │ Printer-1│ HP Laser │ PC-Print │ Yes      │ 0 jobs │ ⋮    │
│ ☐  │ Color-Lab│ Canon    │ PC-Lab   │ Yes      │ 2 jobs │ ⋮    │
└────┴──────────┴──────────┴──────────┴──────────┴────────┴───────┘
```

**Columns:**
| Column | Description |
|--------|-------------|
| **Name** | Printer queue name |
| **Model** | Printer model/driver |
| **Device** | Host device (print server) |
| **Accepting Jobs** | Yes/No - queue accepting print jobs |
| **Active Jobs** | Number of jobs in queue |
| **Actions** | Edit, Reset, Toggle, Delete |

---

### Step-by-Step Workflows

#### 1. Add New Device (Computer/Thin Client)
1. Click **[+ Add Device]**
2. Fill form:
   - **Room**: Select room (auto-fills network, HWConf defaults)
   - **Name**: Hostname (e.g., "PC-101-01")
   - **MAC**: Ethernet MAC (format: `00:11:22:33:44:55`)
   - **IP**: Static IP or leave blank for DHCP
   - **WLAN MAC/IP**: Wireless MAC/IP if applicable
   - **HWConf**: Hardware configuration (defines defaults)
   - **Place/Row**: Physical position in room
   - **Serial/Inventory**: Asset tracking numbers
   - **Locality**: Additional location info
3. **Save** → Device created, DHCP entry added if IP provided

#### 2. Add Device from Room Context
1. Go to **Rooms** → Click **⋮ Actions** → **Devices** on room
2. Click **[+ Add Device]** → Room pre-selected
3. Fill remaining fields → **Save**

#### 3. Edit Device
1. In list, click **⋮ Actions** → **Edit**
2. Modify: Name, MAC, IP, HWConf, Room, Place, Row, Serial
3. **Save** → Updates DHCP if IP changed

#### 4. Configure DHCP for Device
1. Click **⋮ Actions** → **DHCP** on device row
2. Modal with DHCP settings:
   - **Fixed Address**: Reserve specific IP for this MAC
   - **Hostname**: DHCP hostname option
   - **Options**: Custom DHCP options (PXE boot, etc.)
3. **Save** → Updates DHCP config

#### 5. Assign Printers to Device
1. Click **⋮ Actions** → **Printers** on device row
2. Modal shows printers assigned to this device (print server)
3. **Add Printer** → Creates new print queue on this device
4. **Edit/Delete** existing printer queues

#### 6. Add Printer (Print Queue)
**From Printers tab:**
1. Switch to **Printers** tab
2. Click **[+ Add Printer]**
3. Choose action:
   - **Queue**: Add print queue to existing device
   - **Add**: Add new device AND printer queue
4. Fill:
   - **Device**: Select print server device
   - **Name**: Queue name (e.g., "HP-LaserJet-101")
   - **Model**: Printer model (driver selection)
   - **Location**: Physical location
   - **Accepting Jobs**: Yes/No
   - **Windows Driver**: Upload .inf driver for Windows clients
5. **Save** → Print queue created on device

#### 7. Manage Printer Queue
1. In **Printers** list, click **⋮ Actions**:
   - **Reset**: Restart CUPS queue (clears stuck jobs)
   - **Toggle Accepting**: Enable/disable job acceptance
   - **Toggle Enabled**: Enable/disable printer
   - **Edit**: Modify queue settings
   - **Delete**: Remove print queue

#### 8. Filter Devices by Room
1. Use **Room** filter dropdown
2. Select room → Shows only devices in that room
3. **Clear filter** to see all devices

#### 9. Bulk Device Operations
Select multiple devices → **Bulk Actions**:
- **Delete** multiple devices
- **Export** to CSV/Excel/PDF
- **Set HWConf** for multiple
- **Move to Room** (batch room assignment)

---

### Search, Filter & Columns

- **Search**: Filters by name, MAC, IP, room
- **Room Filter**: Filter by assigned room
- **Columns**: Toggle visibility (Serial, Inventory, WLAN MAC, etc.)
- **Sortable**: Name, MAC, IP, HWConf, Room

---

### Permissions Reference

| Action | Required ACL |
|--------|-------------|
| View devices | `device.manage` |
| Create device | `device.manage` |
| Edit device | `device.modify` |
| DHCP config | `device.manage` |
| Printer management | `device.manage` |
| Delete device | `device.manage` + confirmation |

---

### Common Issues

| Issue | Solution |
|-------|----------|
| Device not getting IP | Check DHCP config, MAC format, network range |
| Printer not printing | Check: Queue accepting jobs, device online, driver |
| Can't add device to room | Verify room exists, has network config |
| MAC address format error | Use `XX:XX:XX:XX:XX:XX` format |
| Windows driver not uploading | Check file type (.inf), size limit |
| Device shows wrong room | Edit device, assign correct room |

---

## Deutsch

### Übersicht

Die **Geräte**-Seite (`/pages/cranix/devices`) verwaltet alle Netzwerkgeräte (Computer, Thin Clients, Drucker, etc.). Benötigt `device.manage` ACL.

### Seitenaufbau

#### Geräte-Liste (`/pages/cranix/devices/all`)

```
┌─────────────────────────────────────────────────────────────────┐
│ Geräte                                    [+ Gerät hinzufügen]   │
├─────────────────────────────────────────────────────────────────┤
│ [Filter: Alle ▼] [Raum: Alle ▼] [Suche: ___________] [Spalten] │
├────┬──────────┬──────────┬──────────┬──────────┬────────┬───────┤
│ ☐  │ Name     │ MAC      │ IP       │ HWConf   │ Raum   │ Akt. │
├────┼──────────┼──────────┼──────────┼──────────┼────────┼───────┤
│ ☐  │ PC-101-01│ 00:11:22 │ 10.1.1.10│ HW-PC    │ Raum101│ ⋮    │
│ ☐  │ PC-101-02│ 00:11:22 │ 10.1.1.11│ HW-PC    │ Raum101│ ⋮    │
│ ☐  │ ThinCl-01│ 00:11:22 │ 10.1.1.20│ HW-TC    │ Labor-Ph│ ⋮    │
└────┴──────────┴──────────┴──────────┴──────────┴────────┴───────┘
```

**Spalten:**
| Spalte | Beschreibung |
|--------|-------------|
| **Name** | Geräte-Hostname |
| **MAC** | Ethernet-MAC-Adresse |
| **IP** | Zugewiesene IP-Adresse |
| **HWConf** | Hardware-Konfiguration |
| **Raum** | Zugeordneter Raum |
| **Aktionen** | Bearbeiten, DHCP, Drucker, Löschen |

#### Drucker-Liste (`/pages/cranix/devices/printers`)

```
┌─────────────────────────────────────────────────────────────────┐
│ Drucker                                 [+ Drucker hinzufügen]   │
├─────────────────────────────────────────────────────────────────┤
│ [Suche: ___________] [Spalten]                                 │
├────┬──────────┬──────────┬──────────┬──────────┬────────┬───────┤
│ ☐  │ Name     │ Modell   │ Gerät    │ Nimmt an │ Aktive │ Akt. │
├────┼──────────┼──────────┼──────────┼──────────┼────────┼───────┤
│ ☐  │ Drucker-1│ HP Laser │ PC-Druck │ Ja       │ 0 Jobs │ ⋮    │
│ ☐  │ Farb-Lab │ Canon    │ PC-Labor │ Ja       │ 2 Jobs │ ⋮    │
└────┴──────────┴──────────┴──────────┴──────────┴────────┴───────┘
```

**Spalten:**
| Spalte | Beschreibung |
|--------|-------------|
| **Name** | Druckerwarteschlangen-Name |
| **Modell** | Druckermodell/Treiber |
| **Gerät** | Host-Gerät (Printserver) |
| **Nimmt Jobs an** | Ja/Nein - Warteschlange aktiv |
| **Aktive Jobs** | Anzahl Jobs in Warteschlange |
| **Aktionen** | Bearbeiten, Zurücksetzen, Umschalten, Löschen |

---

### Schritt-für-Schritt Workflows

#### 1. Neues Gerät Hinzufügen (Computer/Thin Client)
1. **[+ Gerät hinzufügen]** klicken
2. Formular ausfüllen:
   - **Raum**: Raum wählen (füllt Netzwerk, HWConf-Standards automatisch)
   - **Name**: Hostname (z.B. "PC-101-01")
   - **MAC**: Ethernet-MAC (Format: `00:11:22:33:44:55`)
   - **IP**: Statische IP oder leer für DHCP
   - **WLAN MAC/IP**: Wireless MAC/IP falls vorhanden
   - **HWConf**: Hardware-Konfiguration (definiert Standards)
   - **Platz/Reihe**: Physische Position im Raum
   - **Seriennr./Inventar**: Asset-Tracking-Nummern
   - **Ort**: Zusätzliche Standortinfo
3. **Speichern** → Gerät erstellt, DHCP-Eintrag hinzugefügt falls IP angegeben

#### 2. Gerät Aus Raum-Kontext Hinzufügen
1. Zu **Räume** → **⋮ Aktionen** → **Geräte** beim Raum
2. **[+ Gerät hinzufügen]** → Raum bereits vorausgewählt
3. Restliche Felder ausfüllen → **Speichern**

#### 3. Gerät Bearbeiten
1. In Liste: **⋮ Aktionen** → **Bearbeiten**
2. Ändern: Name, MAC, IP, HWConf, Raum, Platz, Reihe, Serie
3. **Speichern** → Aktualisiert DHCP falls IP geändert

#### 4. DHCP Für Gerät Konfigurieren
1. **⋮ Aktionen** → **DHCP** in Gerätezeile klicken
2. Modal mit DHCP-Einstellungen:
   - **Feste Adresse**: Spezifische IP für diese MAC reservieren
   - **Hostname**: DHCP-Hostname-Option
   - **Optionen**: Benutzerdefinierte DHCP-Optionen (PXE Boot, etc.)
3. **Speichern** → Aktualisiert DHCP-Konfiguration

#### 5. Drucker Dem Gerät Zuweisen
1. **⋮ Aktionen** → **Drucker** in Gerätezeile klicken
2. Modal zeigt diesem Gerät zugewiesene Drucker (Printserver)
3. **Drucker hinzufügen** → Erstellt neue Druckwarteschlange auf diesem Gerät
4. **Bearbeiten/Löschen** existierende Warteschlangen

#### 6. Drucker Hinzufügen (Warteschlange)
**Aus Drucker-Tab:**
1. Zu **Drucker**-Tab wechseln
2. **[+ Drucker hinzufügen]** klicken
3. Aktion wählen:
   - **Warteschlange**: Druckwarteschlange zu bestehendem Gerät hinzufügen
   - **Hinzufügen**: Neues Gerät UND Druckwarteschlange erstellen
4. Ausfüllen:
   - **Gerät**: Printserver-Gerät wählen
   - **Name**: Warteschlangen-Name (z.B. "HP-LaserJet-101")
   - **Modell**: Druckermodell (Treiberauswahl)
   - **Standort**: Physischer Standort
   - **Nimmt Jobs an**: Ja/Nein
   - **Windows-Treiber**: .inf-Treiber für Windows-Clients hochladen
5. **Speichern** → Druckwarteschlange auf Gerät erstellt

#### 7. Druckerwarteschlange Verwalten
1. In **Drucker**-Liste: **⋮ Aktionen**:
   - **Zurücksetzen**: CUPS-Warteschlange neu starten (löst hängende Jobs)
   - **Annahme umschalten**: Job-Annahme aktivieren/deaktivieren
   - **Aktiviert umschalten**: Drucker aktivieren/deaktivieren
   - **Bearbeiten**: Warteschlangen-Einstellungen ändern
   - **Löschen**: Druckwarteschlange entfernen

#### 8. Geräte Nach Raum Filtern
1. **Raum**-Filter-Dropdown nutzen
2. Raum wählen → Zeigt nur Geräte in diesem Raum
3. **Filter löschen** für alle Geräte

#### 9. Massenoperationen Für Geräte
Mehrere Geräte auswählen → **Massenaktionen**:
- **Mehrere Geräte löschen**
- **Exportieren** nach CSV/Excel/PDF
- **HWConf setzen** für mehrere
- **In Raum verschieben** (Stapel-Raumzuordnung)

---

### Suche, Filter & Spalten

- **Suche**: Filtert nach Name, MAC, IP, Raum
- **Raum-Filter**: Nach zugewiesenem Raum filtern
- **Spalten**: Sichtbarkeit umschalten (Seriennr., Inventar, WLAN MAC, etc.)
- **Sortierbar**: Name, MAC, IP, HWConf, Raum

---

### Berechtigungs-Referenz

| Aktion | Erforderliche ACL |
|--------|------------------|
| Geräte anzeigen | `device.manage` |
| Gerät erstellen | `device.manage` |
| Gerät bearbeiten | `device.modify` |
| DHCP Konfiguration | `device.manage` |
| Drucker-Verwaltung | `device.manage` |
| Gerät löschen | `device.manage` + Bestätigung |

---

### Häufige Probleme

| Problem | Lösung |
|---------|--------|
| Gerät bekommt keine IP | DHCP-Konfig, MAC-Format, Netzwerkbereich prüfen |
| Drucker druckt nicht | Prüfen: Warteschlange nimmt Jobs an, Gerät online, Treiber |
| Gerät nicht zu Raum hinzufügbar | Prüfen: Raum existiert, hat Netzwerkkonfig |
| MAC-Adressen-Formatfehler | Format `XX:XX:XX:XX:XX:XX` verwenden |
| Windows-Treiber nicht uploadbar | Dateityp (.inf), Größenlimit prüfen |
| Gerät zeigt falschen Raum | Gerät bearbeiten, korrekten Raum zuweisen |