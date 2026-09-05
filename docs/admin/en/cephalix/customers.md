# Cephalix Administration: Customers / Cephalix-Administration: Kunden

## English

### Overview

The **Customers** page (`/pages/cephalix/customers`) is for **Cephalix administrators** managing multiple school instances. Requires `customer.manage` ACL.

### Page Layout

```
┌─────────────────────────────────────────────────────────────┐
│ Customers                              [+ Add Customer]     │
├─────────────────────────────────────────────────────────────┤
│ Search: [________________________]  [Filter] [Columns]     │
├──────┬──────────┬──────────┬──────────┬──────────┬─────────┤
│ ☐   │ Name     │ Short    │ Status   │ Type     │ Actions │
├──────┼──────────┼──────────┼──────────┼──────────┼─────────┤
│ ☐   │ School A │ SCHA     │ Active   │ Standard │ ⋮       │
│ ☐   │ School B │ SCHB     │ Inactive │ Premium  │ ⋮       │
└──────┴──────────┴──────────┴──────────┴──────────┴─────────┘
```

### Customer List Columns

| Column | Description |
|--------|-------------|
| **Name** | Full customer/school name |
| **Short Name** | Abbreviation (used in URLs, logs) |
| **Status** | Active / Inactive / Suspended |
| **Type** | Standard / Premium / Trial |
| **Actions** | Edit, View Institutes, Delete, Sync |

### Step-by-Step Workflows

#### 1. Create New Customer

1. Click **[+ Add Customer]** button (top-right)
2. Fill in the form:
   - **Name**: Full school/organization name (required)
   - **Short Name**: 2-10 character code, unique (required)
   - **Type**: Standard / Premium / Trial
   - **Status**: Active / Inactive
   - **Address**: Street, City, ZIP, Country
   - **Contact**: Admin name, Email, Phone
3. Click **Save**
4. New customer appears in list → Click to manage institutes

#### 2. Edit Customer Details

1. Find customer in list (use search/filter)
2. Click **⋮ Actions** → **Edit**
3. Modify fields as needed
4. Click **Save**
5. Changes apply immediately

#### 3. Manage Customer's Institutes

1. Click **⋮ Actions** → **Institutes** on customer row
2. Opens **Institutes List** filtered to this customer
3. Create/edit institutes within this customer context

#### 4. Sync Customer Data

1. Click **⋮ Actions** → **Sync**
2. Triggers synchronization with external systems
3. Progress shown in notification area
4. Check sync log for details

#### 5. Delete Customer

⚠️ **Warning**: Deletes ALL institutes, users, and data!

1. Click **⋮ Actions** → **Delete**
2. Confirm dialog: Type customer short name to confirm
3. Click **Delete** (irreversible)
2. Customer removed from list

### Search & Filter

- **Search box**: Filters by name, short name, contact email
- **Filter button**: Advanced filters (status, type, creation date)
- **Columns button**: Show/hide columns, reorder
- **Pagination**: 25/50/100 rows per page

### Bulk Actions

Select multiple rows (checkboxes) → **Bulk Actions** dropdown:
- **Activate** / **Deactivate**
- **Change Type** (Standard/Premium/Trial)
- **Export** (CSV, Excel, PDF)
- **Delete** (with confirmation)

### Permissions Reference

| Action | Required ACL |
|--------|-------------|
| View list | `customer.manage` |
| Create | `customer.manage` |
| Edit | `customer.modify` |
| Delete | `customer.manage` + confirmation |
| View Institutes | `cephalix.manage` |
| Sync | `customer.manage` |

### Common Issues

| Issue | Solution |
|-------|----------|
| "Short name already exists" | Choose unique short name |
| Cannot delete customer | Check for active institutes - delete those first |
| Sync fails | Check network connectivity, review sync logs |
| Missing + Add button | Verify `customer.manage` ACL assigned |

---

## Deutsch

### Übersicht

Die **Kunden**-Seite (`/pages/cephalix/customers`) ist für **Cephalix-Administratoren** die mehrere Schul-Instanzen verwalten. Benötigt `customer.manage` ACL.

### Seitenaufbau

```
┌─────────────────────────────────────────────────────────────┐
│ Kunden                                [+ Kunde hinzufügen]  │
├─────────────────────────────────────────────────────────────┤
│ Suche: [________________________]  [Filter] [Spalten]      │
├──────┬──────────┬──────────┬──────────┬──────────┬─────────┤
│ ☐   │ Name     │ Kurzname │ Status   │ Typ      │ Aktionen│
├──────┼──────────┼──────────┼──────────┼──────────┼─────────┤
│ ☐   │ Schule A │ SCHA     │ Aktiv    │ Standard │ ⋮       │
│ ☐   │ Schule B │ SCHB     │ Inaktiv  │ Premium  │ ⋮       │
└──────┴──────────┴──────────┴──────────┴──────────┴─────────┘
```

### Kundenlisten-Spalten

| Spalte | Beschreibung |
|--------|-------------|
| **Name** | Voller Schul-/Organisationsname |
| **Kurzname** | Abkürzung (wird in URLs, Logs verwendet) |
| **Status** | Aktiv / Inaktiv / Gesperrt |
| **Typ** | Standard / Premium / Test |
| **Aktionen** | Bearbeiten, Institute anzeigen, Löschen, Sync |

### Schritt-für-Schritt Workflows

#### 1. Neuen Kunden Anlegen

1. **[+ Kunde hinzufügen]** Button klicken (rechts oben)
2. Formular ausfüllen:
   - **Name**: Voller Schul-/Organisationsname (Pflicht)
   - **Kurzname**: 2-10 Zeichen, eindeutig (Pflicht)
   - **Typ**: Standard / Premium / Test
   - **Status**: Aktiv / Inaktiv
   - **Adresse**: Straße, Stadt, PLZ, Land
   - **Kontakt**: Admin-Name, E-Mail, Telefon
3. **Speichern** klicken
4. Neuer Kunde erscheint in Liste → Klicken um Institute zu verwalten

#### 2. Kundendetails Bearbeiten

1. Kunden in Liste finden (Suche/Filter nutzen)
2. **⋮ Aktionen** → **Bearbeiten** klicken
3. Felder nach Bedarf ändern
4. **Speichern** klicken
5. Änderungen wirken sofort

#### 3. Institutes des Kunden Verwalten

1. **⋮ Aktionen** → **Institute** in der Kundenzeile klicken
2. Öffnet **Institute-Liste** gefiltert auf diesen Kunden
3. Institute innerhalb dieses Kunden-Kontexts erstellen/bearbeiten

#### 4. Kundendaten Synchronisieren

1. **⋮ Aktionen** → **Sync** klicken
2. Löst Synchronisation mit externen Systemen aus
3. Fortschritt im Benachrichtigungsbereich
4. Sync-Log für Details prüfen

#### 5. Kunden Löschen

⚠️ **Warnung**: Löscht ALLE Institute, Benutzer und Daten!

1. **⋮ Aktionen** → **Löschen** klicken
2. Bestätigungsdialog: Kurznamen des Kunden eingeben zur Bestätigung
3. **Löschen** klicken (nicht rückgängig machbar)
4. Kunde aus Liste entfernt

### Suche & Filter

- **Suchfeld**: Filtert nach Name, Kurznamen, Kontakt-E-Mail
- **Filter-Button**: Erweiterte Filter (Status, Typ, Erstellungsdatum)
- **Spalten-Button**: Spalten ein-/ausblenden, neu ordnen
- **Pagination**: 25/50/100 Zeilen pro Seite

### Massenaktionen

Mehrere Zeilen auswählen (Checkboxen) → **Massenaktionen** Dropdown:
- **Aktivieren** / **Deaktivieren**
- **Typ ändern** (Standard/Premium/Test)
- **Exportieren** (CSV, Excel, PDF)
- **Löschen** (mit Bestätigung)

### Berechtigungs-Referenz

| Aktion | Erforderliche ACL |
|--------|------------------|
| Liste anzeigen | `customer.manage` |
| Erstellen | `customer.manage` |
| Bearbeiten | `customer.modify` |
| Löschen | `customer.manage` + Bestätigung |
| Institute anzeigen | `cephalix.manage` |
| Synchronisieren | `customer.manage` |

### Häufige Probleme

| Problem | Lösung |
|---------|--------|
| "Kurzname existiert bereits" | Eindeutigen Kurznamen wählen |
| Kunden nicht löschbar | Auf aktive Institute prüfen - diese zuerst löschen |
| Sync schlägt fehl | Netzwerkverbindung prüfen, Sync-Logs ansehen |
| + Hinzufügen Button fehlt | `customer.manage` ACL prüfen |