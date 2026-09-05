# Cephalix Administration: Institutes / Cephalix-Administration: Institute

## English

### Overview

The **Institutes** section manages individual school instances within a customer. Two main views:
- **List View** (`/pages/cephalix/institutes/all`) - Overview of all institutes
- **Detail View** (`/pages/cephalix/institutes/:id`) - Manage specific institute

Requires `cephalix.manage` ACL for list, `cephalix.modify` for details.

---

### Institute List (`/pages/cephalix/institutes/all`)

#### Page Layout

```
┌─────────────────────────────────────────────────────────────────────┐
│ Institutes                                          [+ Add Institute]│
├─────────────────────────────────────────────────────────────────────┤
│ Search: [____________] Customer: [All ▼] Status: [All ▼] [Columns] │
├────┬──────────┬─────────┬────────┬────────┬────────┬────────┬──────┤
│ ☐ │ Name     │ Customer│ Short  │ Status │ Type   │ Sync   │ Act. │
├────┼──────────┼─────────┼────────┼────────┼────────┼────────┼──────┤
│ ☐ │ Gymn. A  │ Cust A  │ GYM-A  │ Active │ School │ ✓ Synced│ ⋮   │
│ ☐ │ Elem. B  │ Cust A  │ ELM-B  │ Inact. │ School │ ⚠ Error │ ⋮   │
└────┴──────────┴─────────┴────────┴────────┴────────┴────────┴──────┘
```

#### Columns

| Column | Description |
|--------|-------------|
| **Name** | Institute display name |
| **Customer** | Parent customer organization |
| **Short Name** | Unique identifier (used in APIs) |
| **Status** | Active / Inactive / Maintenance |
| **Type** | School / University / Administration / Other |
| **Sync** | Synchronization status with Cephalix |
| **Actions** | Edit, Status, Synced Objects, Delete |

---

### Institute Detail (`/pages/cephalix/institutes/:id`)

#### Tabs

| Tab | Route | Purpose |
|-----|-------|---------|
| **Overview** | `/institutes/:id` | General info, status, quick actions |
| **Edit** | `/institutes/:id/edit` | Modify institute settings |
| **Status** | `/institutes/:id/status` | Real-time service status |
| **Synced Objects** | `/institutes/:id/synced-objects` | Objects synchronized from this institute |

---

### Step-by-Step Workflows

#### 1. Create New Institute

**Prerequisite**: Customer must exist

1. Navigate to **Institutes List** (`/pages/cephalix/institutes/all`)
2. Click **[+ Add Institute]**
3. Fill form:
   - **Customer**: Select parent customer (required)
   - **Name**: Institute name (required)
   - **Short Name**: Unique code, 2-20 chars (required)
   - **Type**: School / University / Administration / Other
   - **Status**: Active / Inactive / Maintenance
   - **Address**: Street, City, ZIP, Country
   - **Contact**: Director name, Email, Phone
   - **Settings**: Timezone, Language, Default quotas
4. Click **Save**
5. Institute created → Redirected to detail view

#### 2. Edit Institute Settings

1. In **Institute List**, click **⋮ Actions** → **Edit**
   - Or from detail view: Click **Edit** tab
2. Modify fields:
   - Basic info (name, type, status)
   - Contact details
   - Quota limits (users, devices, storage)
   - Feature flags (modules enabled)
3. Click **Save**
4. Changes take effect immediately

#### 3. Monitor Institute Status

1. Open **Institute Detail** → **Status** tab
2. View real-time status of:
   - **Services**: LDAP, DHCP, DNS, Proxy, Firewall
   - **Resources**: CPU, Memory, Disk, Network
   - **Users**: Online count, recent logins
   - **Devices**: Connected, offline, issues
3. **Refresh** button for latest data
4. **Alerts** shown for degraded services

#### 4. Manage Synced Objects

1. Open **Institute Detail** → **Synced Objects** tab
2. View objects synchronized from institute to Cephalix:
   - Users, Groups, Devices, Rooms, Software
3. **Sync Actions**:
   - **Full Sync**: Complete re-synchronization
   - **Incremental Sync**: Changes only
   - **Resolve Conflicts**: Manual conflict resolution
4. **Sync Log**: History with timestamps, status, errors

#### 5. Change Institute Status

**Quick status change from list:**
1. In list, click **⋮ Actions** → **Set Status**
2. Choose: Active / Inactive / Maintenance
3. Confirm → Immediate effect

**Maintenance Mode Effects:**
- Users cannot login (except admins)
- Scheduled tasks paused
- Sync continues
- Banner shown on institute pages

#### 6. Delete Institute

⚠️ **Deletes all institute data!**

1. In list or detail: **⋮ Actions** → **Delete**
2. Confirm dialog: Type institute short name
3. Click **Delete**
4. All users, devices, groups, data removed

---

### Synchronization Management

#### Sync Types

| Sync Type | Trigger | Duration | Use Case |
|-----------|---------|----------|----------|
| **Full Sync** | Manual / Scheduled | 5-30 min | Initial setup, major changes |
| **Incremental** | Every 15 min (auto) | 30-60 sec | Routine updates |
| **Emergency** | Manual | 1-5 min | Critical fixes |

#### Sync Status Indicators

| Icon | Status | Meaning |
|------|--------|---------|
| ✓ Green | Synced | Last sync successful |
| ⚠ Yellow | Warning | Sync completed with warnings |
| ✗ Red | Error | Sync failed - check logs |
| ⟳ Blue | Running | Sync in progress |
| ⏸ Gray | Paused | Sync disabled for this institute |

#### Troubleshooting Sync Issues

1. Go to **Synced Objects** tab
2. Check **Sync Log** for error details
3. Common errors:
   - **Connection timeout** → Check network/firewall
   - **Authentication failed** → Verify API credentials
   - **Schema mismatch** → Update institute to latest version
   - **Quota exceeded** → Increase customer/institute quotas

---

### Institute Templates

For rapid deployment of similar institutes:

1. **Create Template**: From existing institute → **Actions** → **Save as Template**
2. **Use Template**: When creating new institute → **Load from Template**
3. **Template includes**: Default quotas, enabled modules, standard groups/rooms

---

### Permissions Reference

| Action | Required ACL |
|--------|-------------|
| View list | `cephalix.manage` |
| Create | `cephalix.manage` |
| View details | `cephalix.manage` |
| Edit | `cephalix.modify` |
| Change status | `cephalix.modify` |
| Manage sync | `cephalix.manage` |
| Delete | `cephalix.manage` + confirmation |

---

## Deutsch

### Übersicht

Der **Institute**-Bereich verwaltet einzelne Schul-Instanzen innerhalb eines Kunden. Zwei Hauptansichten:
- **Listenansicht** (`/pages/cephalix/institutes/all`) - Übersicht aller Institute
- **Detailansicht** (`/pages/cephalix/institutes/:id`) - Spezifisches Institut verwalten

Benötigt `cephalix.manage` ACL für Liste, `cephalix.modify` für Details.

---

### Instituts-Liste (`/pages/cephalix/institutes/all`)

#### Seitenaufbau

```
┌─────────────────────────────────────────────────────────────────────┐
│ Institute                                           [+ Institut +]   │
├─────────────────────────────────────────────────────────────────────┤
│ Suche: [____________] Kunde: [Alle ▼] Status: [Alle ▼] [Spalten]   │
├────┬──────────┬─────────┬────────┬────────┬────────┬────────┬──────┤
│ ☐ │ Name     │ Kunde   │ Kurz   │ Status │ Typ    │ Sync   │ Akt. │
├────┼──────────┼─────────┼────────┼────────┼────────┼────────┼──────┤
│ ☐ │ Gymn. A  │ Kunde A │ GYM-A  │ Aktiv  │ Schule │ ✓ Synced│ ⋮   │
│ ☐ │ Grunds.B │ Kunde A │ ELM-B  │ Inakt. │ Schule │ ⚠ Error │ ⋮   │
└────┴──────────┴─────────┴────────┴────────┴────────┴────────┴──────┘
```

#### Spalten

| Spalte | Beschreibung |
|--------|-------------|
| **Name** | Anzeigename des Instituts |
| **Kunde** | Übergeordnete Kundenorganisation |
| **Kurzname** | Eindeutiger Identifikator (für APIs) |
| **Status** | Aktiv / Inaktiv / Wartung |
| **Typ** | Schule / Universität / Verwaltung / Sonstiges |
| **Sync** | Synchronisationsstatus mit Cephalix |
| **Aktionen** | Bearbeiten, Status, Synced Objects, Löschen |

---

### Institut-Detail (`/pages/cephalix/institutes/:id`)

#### Tabs

| Tab | Route | Zweck |
|-----|-------|-------|
| **Übersicht** | `/institutes/:id` | Allgemeine Info, Status, Schnellaktionen |
| **Bearbeiten** | `/institutes/:id/edit` | Instituteinstellungen ändern |
| **Status** | `/institutes/:id/status` | Echtzeit-Service-Status |
| **Synced Objects** | `/institutes/:id/synced-objects` | Vom Institut synchronisierte Objekte |

---

### Schritt-für-Schritt Workflows

#### 1. Neues Institut Anlegen

**Voraussetzung**: Kunde muss existieren

1. Zu **Institute-Liste** navigieren (`/pages/cephalix/institutes/all`)
2. **[+ Institut hinzufügen]** klicken
3. Formular ausfüllen:
   - **Kunde**: Übergeordneten Kunden wählen (Pflicht)
   - **Name**: Institutsname (Pflicht)
   - **Kurzname**: Eindeutiger Code, 2-20 Zeichen (Pflicht)
   - **Typ**: Schule / Universität / Verwaltung / Sonstiges
   - **Status**: Aktiv / Inaktiv / Wartung
   - **Adresse**: Straße, Stadt, PLZ, Land
   - **Kontakt**: Direktor-Name, E-Mail, Telefon
   - **Einstellungen**: Zeitzone, Sprache, Standard-Quotas
4. **Speichern** klicken
5. Institut erstellt → Weiterleitung zur Detailansicht

#### 2. Instituteinstellungen Bearbeiten

1. In **Instituts-Liste**: **⋮ Aktionen** → **Bearbeiten**
   - Oder in Detailansicht: **Bearbeiten**-Tab klicken
2. Felder ändern:
   - Basis-Info (Name, Typ, Status)
   - Kontaktdetails
   - Quota-Limits (Benutzer, Geräte, Speicher)
   - Feature-Flags (aktivierte Module)
3. **Speichern** klicken
4. Änderungen wirken sofort

#### 3. Institutsstatus Überwachen

1. **Institut-Detail** → **Status**-Tab öffnen
2. Echtzeit-Status anzeigen von:
   - **Dienste**: LDAP, DHCP, DNS, Proxy, Firewall
   - **Ressourcen**: CPU, Speicher, Festplatte, Netzwerk
   - **Benutzer**: Online-Anzahl, letzte Logins
   - **Geräte**: Verbunden, offline, Probleme
3. **Aktualisieren** für neueste Daten
4. **Alarme** bei degradierten Diensten

#### 4. Synced Objects Verwalten

1. **Institut-Detail** → **Synced Objects**-Tab öffnen
2. Vom Institut zu Cephalix synchronisierte Objekte anzeigen:
   - Benutzer, Gruppen, Geräte, Räume, Software
3. **Sync-Aktionen**:
   - **Vollständiger Sync**: Komplette Neusynchronisation
   - **Inkrementeller Sync**: Nur Änderungen
   - **Konflikte lösen**: Manuelle Konfliktlösung
4. **Sync-Log**: Historie mit Zeitstempeln, Status, Fehlern

#### 5. Institutsstatus Ändern

**Schnelländerung aus Liste:**
1. In Liste: **⋮ Aktionen** → **Status setzen**
2. Wählen: Aktiv / Inaktiv / Wartung
3. Bestätigen → Sofortige Wirkung

**Wartungsmodus-Effekte:**
- Benutzer können sich nicht anmelden (außer Admins)
- Geplante Tasks pausiert
- Sync läuft weiter
- Banner auf Institutsseiten angezeigt

#### 6. Institut Löschen

⚠️ **Löscht alle Institutsdaten!**

1. In Liste oder Detail: **⋮ Aktionen** → **Löschen**
2. Bestätigungsdialog: Instituts-Kurznamen eingeben
3. **Löschen** klicken
4. Alle Benutzer, Geräte, Gruppen, Daten entfernt

---

### Synchronisations-Verwaltung

#### Sync-Typen

| Sync-Typ | Auslöser | Dauer | Anwendungsfall |
|----------|----------|-------|----------------|
| **Vollständiger Sync** | Manuell / Geplant | 5-30 Min | Ersteinrichtung, größere Änderungen |
| **Inkrementell** | Alle 15 Min (auto) | 30-60 Sek | Routine-Updates |
| **Notfall** | Manuell | 1-5 Min | Kritische Fixes |

#### Sync-Status-Indikatoren

| Symbol | Status | Bedeutung |
|--------|--------|-----------|
| ✓ Grün | Synchronisiert | Letzter Sync erfolgreich |
| ⚠ Gelb | Warnung | Sync mit Warnungen abgeschlossen |
| ✗ Rot | Fehler | Sync fehlgeschlagen - Logs prüfen |
| ⟳ Blau | Laufend | Sync in Bearbeitung |
| ⏸ Grau | Pausiert | Sync für dieses Institut deaktiviert |

#### Sync-Probleme Beheben

1. Zu **Synced Objects**-Tab gehen
2. **Sync-Log** auf Fehlerdetails prüfen
3. Häufige Fehler:
   - **Verbindungszeitüberschreitung** → Netzwerk/Firewall prüfen
   - **Authentifizierung fehlgeschlagen** → API-Zugangsdaten prüfen
   - **Schema-Mismatch** → Institut auf neueste Version aktualisieren
   - **Quota überschritten** → Kunden/Instituts-Quotas erhöhen

---

### Institut-Vorlagen

Für schnelle Bereitstellung ähnlicher Institute:

1. **Vorlage erstellen**: Von bestehendem Institut → **Aktionen** → **Als Vorlage speichern**
2. **Vorlage verwenden**: Beim Neuanlegen → **Aus Vorlage laden**
3. **Vorlage enthält**: Standard-Quotas, aktivierte Module, Standard-Gruppen/Räume

---

### Berechtigungs-Referenz

| Aktion | Erforderliche ACL |
|--------|------------------|
| Liste anzeigen | `cephalix.manage` |
| Erstellen | `cephalix.manage` |
| Details anzeigen | `cephalix.manage` |
| Bearbeiten | `cephalix.modify` |
| Status ändern | `cephalix.modify` |
| Sync verwalten | `cephalix.manage` |
| Löschen | `cephalix.manage` + Bestätigung |