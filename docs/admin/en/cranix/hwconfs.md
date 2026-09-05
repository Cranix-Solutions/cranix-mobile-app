# Cranix Core: Hardware Configurations (HWConfs) / Cranix Kern: Hardware-Konfigurationen (HWConfs)

## English

### Overview

The **HWConfs** page (`/pages/cranix/hwconfs`) manages hardware configuration profiles for device imaging and deployment. Requires `hwconf.manage` ACL.

### Page Layout

#### HWConfs List (`/pages/cranix/hwconfs`)

```
┌─────────────────────────────────────────────────────────────────┐
│ Hardware Configurations                    [+ Add HWConf]       │
├─────────────────────────────────────────────────────────────────┤
│ [Search: ___________] [Columns]                                │
├────┬──────────┬──────────┬──────────┬──────────┬────────┬───────┤
│ ☐  │ Name     │ Description│ Dev Type │ Partitions│ Devices│ Act. │
├────┼──────────┼──────────┼──────────┼──────────┼────────┼───────┤
│ ☐  │ HW-PC    │ Standard PC│ Computer │ 3        │ 45     │ ⋮    │
│ ☐  │ HW-Laptop│ Laptop     │ Laptop   │ 2        │ 12     │ ⋮    │
│ ☐  │ HW-ThinC │ Thin Client│ ThinClient│ 1       │ 30     │ ⋮    │
└────┴──────────┴──────────┴──────────┴──────────┴────────┴───────┘
```

**Columns:**
| Column | Description |
|--------|-------------|
| **Name** | Configuration identifier |
| **Description** | Human-readable description |
| **Device Type** | Computer / Laptop / ThinClient / Server |
| **Partitions** | Number of partition definitions |
| **Devices** | Count of devices using this HWConf |
| **Actions** | Edit, Members, Delete |

---

### Step-by-Step Workflows

#### 1. Create New Hardware Configuration
1. Click **[+ Add HWConf]**
2. Fill basic info:
   - **Name**: Unique identifier (e.g., "HW-PC-Win10", "HW-Laptop-Linux")
   - **Description**: Purpose (e.g., "Standard Windows 10 PC", "Linux Laptop")
   - **Device Type**: Computer / Laptop / ThinClient / Server
3. **Save** → Opens detail view for partition configuration

#### 2. Configure Partitions (Imaging Layout)
In **Detail View** → **Edit** tab:
1. **Partition Table** shows existing partitions
2. **Add Partition**:
   - **Name**: Partition label (e.g., "SYSTEM", "DATA", "RECOVERY")
   - **Description**: Purpose description
   - **OS**: WinBoot / Win / Win10 / Linux
   - **Tool**: partimage / partclone / dd / dd_rescue / Zpartclone
   - **Join Type**: no / Domain (for Windows domain join)
3. **Order**: Partitions are applied in sequence
4. **Save** → Partition layout defined

#### 3. Edit HWConf
1. In list, click **⋮ Actions** → **Edit**
2. Or from detail view: **Edit** tab
3. Modify: Name, Description, Device Type, Partitions
3. **Save**

#### 4. View/Manage Members (Devices Using HWConf)
1. Click **⋮ Actions** → **Members** on HWConf row
2. Opens **Members** tab showing:
   - **Device List**: All devices assigned this HWConf
   - **Room Filter**: Filter devices by room
   - **Network Card**: Select NIC for multicast (eth0, eth1, etc.)
3. **Actions on Selected Devices**:
   - **Start Multicast Clone**: Deploy image to selected devices
   - **Start Unicast Clone**: Individual deployment
   - **Start Sync**: Synchronize configuration
   - **Wake On LAN**: Power on devices

#### 5. Multicast Imaging (Clonezilla/Partclone)
**Prerequisites**: Devices on same network, PXE boot enabled
1. In **Members** tab, select target devices (checkboxes)
2. Choose **Network Card** (eth0, eth1, etc.)
3. Click **Start Multicast Clone**
4. **Progress**: Shows sending status, device count
5. **Stop**: Can stop multicast mid-process
6. **Monitor**: Check individual device status

#### 6. Delete Partition
1. In **Edit** tab → Click **Delete** on partition row
2. Confirm → Partition removed from layout

#### 7. Delete HWConf
⚠️ **Warning**: Cannot delete if devices are assigned!

1. Click **⋮ Actions** → **Delete**
2. Confirm: Type HWConf name
3. **Delete** → Configuration removed

---

### Partition Tools Reference

| Tool | Use Case | OS Support |
|------|----------|------------|
| **partclone** | Modern, fast, supports most filesystems | Linux, Windows (NTFS) |
| **partimage** | Legacy, stable | Linux (ext2/3/4, reiserfs) |
| **dd** | Raw bit-for-bit copy | Any (slow, copies empty space) |
| **dd_rescue** | Error-tolerant dd | Any (handles bad sectors) |
| **Zpartclone** | Compressed partclone | Linux, Windows |

---

### Operating System Types

| OS Type | Description | Typical Partitions |
|---------|-------------|-------------------|
| **WinBoot** | Windows boot partition (100-500MB) | SYSTEM/BOOT |
| **Win** | Legacy Windows (XP/7) | C: |
| **Win10** | Windows 10/11 | SYSTEM, C:, RECOVERY |
| **Linux** | Linux distributions | /boot, /, /home, swap |

---

### Join Types (Windows Domain)

| Type | Description |
|------|-------------|
| **no** | Workgroup mode, no domain join |
| **Domain** | Auto-join configured domain after imaging |

---

### Permissions Reference

| Action | Required ACL |
|--------|-------------|
| View list | `hwconf.manage` |
| Create | `hwconf.manage` |
| Edit | `hwconf.modify` |
| Manage Partitions | `hwconf.manage` |
| View Members | `hwconf.manage` |
| Multicast Deploy | `hwconf.manage` + device access |
| Delete | `hwconf.manage` + confirmation |

---

### Common Issues

| Issue | Solution |
|-------|----------|
| Devices not showing in Members | Check: Device has correct `hwconfId` assigned |
| Multicast fails | Verify: Network card correct, switch supports multicast, PXE boot |
| Partition tool error | Match tool to filesystem (partclone for NTFS/ext4) |
| Domain join fails | Check: Domain credentials in HWConf, network connectivity |
| Image too large for target | Verify target disk size >= source partitions |
| PXE boot not working | Check: DHCP options 66/67, TFTP server, firewall |

---

## Deutsch

### Übersicht

Die **HWConfs**-Seite (`/pages/cranix/hwconfs`) verwaltet Hardware-Konfigurationsprofile für Geräte-Imaging und -Bereitstellung. Benötigt `hwconf.manage` ACL.

### Seitenaufbau

#### HWConfs-Liste (`/pages/cranix/hwconfs`)

```
┌─────────────────────────────────────────────────────────────────┐
│ Hardware-Konfigurationen                  [+ HWConf hinzufügen] │
├─────────────────────────────────────────────────────────────────┤
│ [Suche: ___________] [Spalten]                                 │
├────┬──────────┬──────────┬──────────┬──────────┬────────┬───────┤
│ ☐  │ Name     │ Beschreibung│ Gerätetyp│ Partitionen│ Geräte│ Akt. │
├────┼──────────┼──────────┼──────────┼──────────┼────────┼───────┤
│ ☐  │ HW-PC    │ Standard PC│ Computer │ 3        │ 45     │ ⋮    │
│ ☐  │ HW-Laptop│ Laptop     │ Laptop   │ 2        │ 12     │ ⋮    │
│ ☐  │ HW-ThinC │ Thin Client│ ThinClient│ 1       │ 30     │ ⋮    │
└────┴──────────┴──────────┴──────────┴──────────┴────────┴───────┘
```

**Spalten:**
| Spalte | Beschreibung |
|--------|-------------|
| **Name** | Konfigurationsbezeichnung |
| **Beschreibung** | Lesbarer Beschreibungstext |
| **Gerätetyp** | Computer / Laptop / ThinClient / Server |
| **Partitionen** | Anzahl Partition-Definitionen |
| **Geräte** | Anzahl Geräte die diese HWConf nutzen |
| **Aktionen** | Bearbeiten, Mitglieder, Löschen |

---

### Schritt-für-Schritt Workflows

#### 1. Neue Hardware-Konfiguration Erstellen
1. **[+ HWConf hinzufügen]** klicken
2. Grunddaten ausfüllen:
   - **Name**: Eindeutiger Bezeichner (z.B. "HW-PC-Win10", "HW-Laptop-Linux")
   - **Beschreibung**: Verwendungszweck (z.B. "Standard Windows 10 PC", "Linux Laptop")
   - **Gerätetyp**: Computer / Laptop / ThinClient / Server
3. **Speichern** → Öffnet Detailansicht für Partitionskonfiguration

#### 2. Partitionen Konfigurieren (Imaging-Layout)
In **Detailansicht** → **Bearbeiten**-Tab:
1. **Partitionstabelle** zeigt existierende Partitionen
2. **Partition Hinzufügen**:
   - **Name**: Partitionslabel (z.B. "SYSTEM", "DATA", "RECOVERY")
   - **Beschreibung**: Zweckbeschreibung
   - **OS**: WinBoot / Win / Win10 / Linux
   - **Tool**: partimage / partclone / dd / dd_rescue / Zpartclone
   - **Join Type**: no / Domain (für Windows-Domain-Join)
3. **Reihenfolge**: Partitionen werden in Sequenz angewendet
4. **Speichern** → Partitionslayout definiert

#### 3. HWConf Bearbeiten
1. In Liste: **⋮ Aktionen** → **Bearbeiten**
2. Oder aus Detailansicht: **Bearbeiten**-Tab
3. Ändern: Name, Beschreibung, Gerätetyp, Partitionen
4. **Speichern**

#### 4. Mitglieder Anzeigen/Verwalten (Geräte Mit Dieser HWConf)
1. **⋮ Aktionen** → **Mitglieder** in HWConf-Zeile klicken
2. Öffnet **Mitglieder**-Tab mit:
   - **Geräteliste**: Alle Geräte mit dieser HWConf
   - **Raum-Filter**: Geräte nach Raum filtern
   - **Netzwerkkarte**: NIC für Multicast wählen (eth0, eth1, etc.)
3. **Aktionen Auf Ausgewählten Geräten**:
   - **Multicast-Clone Starten**: Image auf ausgewählte Geräte deployen
   - **Unicast-Clone Starten**: Individuelle Bereitstellung
   - **Sync Starten**: Konfiguration synchronisieren
   - **Wake On LAN**: Geräte einschalten

#### 5. Multicast-Imaging (Clonezilla/Partclone)
**Voraussetzungen**: Geräte im selben Netzwerk, PXE-Boot aktiviert
1. In **Mitglieder**-Tab Zielgeräte auswählen (Checkboxen)
2. **Netzwerkkarte** wählen (eth0, eth1, etc.)
3. **Multicast-Clone Starten** klicken
4. **Fortschritt**: Sendestatus, Geräteanzahl
5. **Stoppen**: Multicast mittendrin stoppen möglich
6. **Überwachen**: Individuellen Gerätestatus prüfen

#### 6. Partition Löschen
1. In **Bearbeiten**-Tab → **Löschen** bei Partition klicken
2. Bestätigen → Partition aus Layout entfernt

#### 7. HWConf Löschen
⚠️ **Warnung**: Nicht löschbar wenn Geräte zugewiesen!

1. **⋮ Aktionen** → **Löschen** klicken
2. Bestätigen: HWConf-Namen eingeben
3. **Löschen** → Konfiguration entfernt

---

### Partition-Tools Referenz

| Tool | Anwendungsfall | OS-Unterstützung |
|------|---------------|------------------|
| **partclone** | Modern, schnell, die meisten Dateisysteme | Linux, Windows (NTFS) |
| **partimage** | Legacy, stabil | Linux (ext2/3/4, reiserfs) |
| **dd** | Rohes Bit-für-Bit-Kopieren | Beliebig (langsam, kopiert Leerraum) |
| **dd_rescue** | Fehlertolerantes dd | Beliebig (behandelt defekte Sektoren) |
| **Zpartclone** | Komprimiertes partclone | Linux, Windows |

---

### Betriebssystem-Typen

| OS-Typ | Beschreibung | Typische Partitionen |
|--------|-------------|---------------------|
| **WinBoot** | Windows-Boot-Partition (100-500MB) | SYSTEM/BOOT |
| **Win** | Legacy Windows (XP/7) | C: |
| **Win10** | Windows 10/11 | SYSTEM, C:, RECOVERY |
| **Linux** | Linux-Distributionen | /boot, /, /home, swap |

---

### Join-Typen (Windows-Domain)

| Typ | Beschreibung |
|-----|-------------|
| **no** | Workgroup-Modus, kein Domain-Join |
| **Domain** | Automatischer Domain-Beitritt nach Imaging |

---

### Berechtigungs-Referenz

| Aktion | Erforderliche ACL |
|--------|------------------|
| Liste anzeigen | `hwconf.manage` |
| Erstellen | `hwconf.manage` |
| Bearbeiten | `hwconf.modify` |
| Partitionen verwalten | `hwconf.manage` |
| Mitglieder anzeigen | `hwconf.manage` |
| Multicast-Deploy | `hwconf.manage` + Gerätezugriff |
| Löschen | `hwconf.manage` + Bestätigung |

---

### Häufige Probleme

| Problem | Lösung |
|---------|--------|
| Geräte nicht in Mitgliedern | Prüfen: Gerät hat korrekte `hwconfId` |
| Multicast schlägt fehl | Prüfen: Netzwerkkarte korrekt, Switch unterstützt Multicast, PXE-Boot |
| Partition-Tool-Fehler | Tool auf Dateisystem abstimmen (partclone für NTFS/ext4) |
| Domain-Join schlägt fehl | Prüfen: Domain-Credentials in HWConf, Netzwerkverbindung |
| Image zu groß für Ziel | Zielplattengröße >= Quellpartitionen prüfen |
| PXE-Boot funktioniert nicht | Prüfen: DHCP Optionen 66/67, TFTP-Server, Firewall |