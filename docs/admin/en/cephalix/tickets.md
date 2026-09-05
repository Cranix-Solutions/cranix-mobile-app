# Cephalix Administration: Support Tickets / Cephalix-Administration: Support-Tickets

## English

### Overview

The **Tickets** system (`/pages/cephalix/tickets`) manages support requests across all customers and institutes. Requires `cephalix.ticket` ACL.

### Page Layout

#### Ticket List (`/pages/cephalix/tickets`)

```
┌─────────────────────────────────────────────────────────────────────┐
│ Support Tickets                                    [Filter] [Cols] │
├─────────────────────────────────────────────────────────────────────┤
│ Status: [All ▼] Priority: [All ▼] Customer: [All ▼] Institute: [All ▼] │
├────┬────────┬──────────┬──────────┬────────┬─────────┬────────┬──────┤
│ ☐ │ #1245  │ Login    │ Gymn. A  │ High   │ Open    │ 2h ago │ ⋮    │
│ ☐ │ #1244  │ Printer  │ Elem. B  │ Normal │ In Prog │ 1d ago │ ⋮    │
│ ☐ │ #1243  │ Sync     │ Uni C    │ Critical│ New    │ 5m ago │ ⋮    │
└────┴────────┴──────────┴──────────┴────────┴─────────┴────────┴──────┘
```

#### Columns

| Column | Description |
|--------|-------------|
| **ID** | Ticket number (click for details) |
| **Subject** | Brief issue summary |
| **Institute** | Affected institute |
| **Priority** | Critical / High / Normal / Low |
| **Status** | New / Open / In Progress / On Hold / Resolved / Closed |
| **Age** | Time since creation/update |
| **Actions** | View, Assign, Update, Close |

---

### Ticket Detail (`/pages/cephalix/tickets/:id`)

#### Sections

| Section | Content |
|---------|---------|
| **Header** | ID, Subject, Status, Priority, Institute, Customer |
| **Metadata** | Created, Updated, Assigned to, Reporter, Category |
| **Description** | Full issue description (rich text) |
| **Comments** | Threaded discussion with timestamps |
| **Attachments** | Files, screenshots, logs |
| **History** | Status changes, assignments, SLA events |

---

### Step-by-Step Workflows

#### 1. View Ticket List

1. Navigate to **Tickets** (`/pages/cephalix/tickets`)
2. Use filters to narrow down:
   - **Status**: New, Open, In Progress, On Hold, Resolved, Closed
   - **Priority**: Critical, High, Normal, Low
   - **Customer/Institute**: Specific or all
   - **Date range**: Created/updated within period
3. Click **ID** or **Subject** to open detail view

#### 2. View Ticket Details

1. Click ticket **#ID** in list
2. Review:
   - **Description**: Full problem details
   - **Comments**: Discussion history
   - **Attachments**: Download logs/screenshots
   - **History**: Audit trail of all changes
3. **Actions** available based on status/permissions

#### 3. Update Ticket Status

**From List (Quick):**
1. Click **⋮ Actions** → **Set Status**
2. Choose new status
3. Optional: Add comment
4. Confirm

**From Detail View:**
1. Click **Status** dropdown (top-right)
2. Select new status
3. Enter comment (required for certain transitions)
4. Click **Update**

#### Status Transition Rules

| From → To | Allowed For | Comment Required |
|-----------|-------------|------------------|
| New → Open | Assignee, Admin | No |
| New → In Progress | Assignee | Yes |
| Open → In Progress | Assignee | Yes |
| In Progress → On Hold | Assignee, Admin | Yes (reason) |
| On Hold → In Progress | Assignee | No |
| In Progress → Resolved | Assignee | Yes (solution) |
| Resolved → Closed | Reporter, Admin | No |
| Any → Reopened | Reporter, Admin | Yes (reason) |

#### 4. Assign Ticket

1. Open ticket detail
2. Click **Assignee** field / **Assign** button
3. Select team member from dropdown
   - Filtered by: Customer access, Role, Availability
4. Optional: Add assignment note
5. Click **Assign**
6. Notification sent to new assignee

#### 5. Add Comment / Internal Note

1. Open ticket detail → **Comments** section
2. **Type**: Public (visible to reporter) / Internal (staff only)
3. Write comment (Markdown supported)
4. **Attach files** if needed (drag & drop)
5. Click **Post Comment**
6. Email notification sent based on preferences

#### 6. Manage Attachments

**Upload:**
1. In comment area or **Attachments** tab
2. Drag files or click **Browse**
3. Max size: 50MB per file
4. Allowed: Images, PDF, logs, archives

**Download/Delete:**
1. Go to **Attachments** tab
2. Click **Download** or **Delete** (own uploads only)

#### 7. Create Ticket (Admin/Support)

1. Click **[+ New Ticket]** (if permitted)
2. Fill form:
   - **Customer/Institute**: Select affected entity
   - **Category**: Access / Hardware / Software / Network / Sync / Other
   - **Priority**: Critical / High / Normal / Low
   - **Subject**: Brief summary (required)
   - **Description**: Detailed issue (Markdown)
   - **Attachments**: Logs, screenshots
3. Click **Create**
4. Ticket created with **New** status
5. Auto-assigned based on category/institute rules

#### 8. Bulk Actions

Select multiple tickets → **Bulk Actions**:
- **Assign to**: Me / Specific user / Round-robin
- **Set Status**: Open / In Progress / On Hold
- **Set Priority**: Escalate / De-escalate
- **Add Tag**: For reporting
- **Export**: CSV with selected fields

---

### SLA & Escalation

#### Default SLAs by Priority

| Priority | Response Time | Resolution Time | Escalation |
|----------|--------------|-----------------|------------|
| **Critical** | 15 minutes | 4 hours | Every 30 min |
| **High** | 1 hour | 8 hours | Every 2 hours |
| **Normal** | 4 hours | 24 hours | Every 8 hours |
| **Low** | 8 hours | 72 hours | Daily |

#### SLA Indicators

In ticket list:
- 🟢 Green: Within SLA
- 🟡 Yellow: Approaching breach (50% time elapsed)
- 🔴 Red: SLA breached
- ⚫ Black: No SLA (internal tickets)

---

### Ticket Categories

| Category | Typical Issues | Default Assignee |
|----------|---------------|------------------|
| **Access** | Login, 2FA, permissions, locked accounts | Identity Team |
| **Hardware** | Printers, devices, thin clients, projectors | Hardware Team |
| **Software** | App deployment, licenses, updates | Software Team |
| **Network** | WiFi, DHCP, DNS, VPN, firewall | Network Team |
| **Sync** | Cephalix sync, data inconsistency | Sync Team |
| **Other** | General inquiries, feature requests | Triage Team |

---

### Search & Filtering

#### Quick Search
- Searches: Subject, Description, Comments, Ticket ID
- Syntax: `keyword`, `"exact phrase"`, `-exclude`

#### Advanced Filters
- **Date range**: Created, Updated, Due date
- **Custom fields**: Tags, Custom attributes
- **SLA status**: Within/Breached/At risk
- **Assignee**: Me, Unassigned, Specific user

#### Saved Filters
1. Configure filters
2. Click **Save Filter** → Name it
3. Access from **Saved Filters** dropdown
4. Share with team (if permitted)

---

### Permissions Reference

| Action | Required ACL |
|--------|-------------|
| View list | `cephalix.ticket` |
| View details | `cephalix.ticket` |
| Create ticket | `cephalix.ticket` + create permission |
| Update status | `cephalix.ticket` |
| Assign ticket | `cephalix.ticket` + assign permission |
| Add comments | `cephalix.ticket` |
| Manage attachments | `cephalix.ticket` |
| Bulk actions | `cephalix.ticket` + bulk permission |
| Delete ticket | `cephalix.ticket` + admin role |

---

### Common Issues

| Issue | Solution |
|-------|----------|
| Cannot see tickets | Verify `cephalix.ticket` ACL assigned |
| Cannot assign | Check assign permission + user has customer access |
| SLA not calculating | Verify institute has SLA configuration |
| Email notifications not sent | Check notification settings in profile |
| Attachment upload fails | Check file size/type, disk space |

---

## Deutsch

### Übersicht

Das **Tickets**-System (`/pages/cephalix/tickets`) verwaltet Support-Anfragen über alle Kunden und Institute. Benötigt `cephalix.ticket` ACL.

### Seitenaufbau

#### Ticket-Liste (`/pages/cephalix/tickets`)

```
┌─────────────────────────────────────────────────────────────────────┐
│ Support-Tickets                                    [Filter] [Spalt.]│
├─────────────────────────────────────────────────────────────────────┤
│ Status: [Alle ▼] Priorität: [Alle ▼] Kunde: [Alle ▼] Institut: [Alle ▼] │
├────┬────────┬──────────┬──────────┬────────┬─────────┬────────┬──────┤
│ ☐ │ #1245  │ Login    │ Gymn. A  │ Hoch   │ Offen   │ vor 2h │ ⋮    │
│ ☐ │ #1244  │ Drucker  │ Grunds.B │ Normal │ In Arbeit│ vor 1T │ ⋮    │
│ ☐ │ #1243  │ Sync     │ Uni C    │ Kritisch│ Neu    │ vor 5m │ ⋮    │
└────┴────────┴──────────┴──────────┴────────┴─────────┴────────┴──────┘
```

#### Spalten

| Spalte | Beschreibung |
|--------|-------------|
| **ID** | Ticket-Nummer (klickbar für Details) |
| **Betreff** | Kurze Problembeschreibung |
| **Institut** | Betroffenes Institut |
| **Priorität** | Kritisch / Hoch / Normal / Niedrig |
| **Status** | Neu / Offen / In Arbeit / Gehalten / Gelöst / Geschlossen |
| **Alter** | Zeit seit Erstellung/Aktualisierung |
| **Aktionen** | Anzeigen, Zuweisen, Aktualisieren, Schließen |

---

### Ticket-Detail (`/pages/cephalix/tickets/:id`)

#### Bereiche

| Bereich | Inhalt |
|---------|--------|
| **Kopf** | ID, Betreff, Status, Priorität, Institut, Kunde |
| **Metadaten** | Erstellt, Aktualisiert, Zugewiesen an, Melder, Kategorie |
| **Beschreibung** | Vollständige Problembeschreibung (Rich Text) |
| **Kommentare** | Threaded Diskussion mit Zeitstempeln |
| **Anhänge** | Dateien, Screenshots, Logs |
| **Historie** | Statusänderungen, Zuweisungen, SLA-Ereignisse |

---

### Schritt-für-Schritt Workflows

#### 1. Ticket-Liste Anzeigen

1. Zu **Tickets** navigieren (`/pages/cephalix/tickets`)
2. Filter nutzen:
   - **Status**: Neu, Offen, In Arbeit, Gehalten, Gelöst, Geschlossen
   - **Priorität**: Kritisch, Hoch, Normal, Niedrig
   - **Kunde/Institut**: Spezifisch oder alle
   - **Datumsbereich**: Erstellt/Aktualisiert in Zeitraum
3. **ID** oder **Betreff** klicken für Detailansicht

#### 2. Ticket-Details Anzeigen

1. Ticket **#ID** in Liste klicken
2. Prüfen:
   - **Beschreibung**: Vollständige Problemdetails
   - **Kommentare**: Diskussionshistorie
   - **Anhänge**: Logs/Screenshots herunterladen
   - **Historie**: Audit-Trail aller Änderungen
3. **Aktionen** verfügbar basierend auf Status/Berechtigungen

#### 3. Ticket-Status Aktualisieren

**Aus Liste (Schnell):**
1. **⋮ Aktionen** → **Status setzen** klicken
2. Neuen Status wählen
3. Optional: Kommentar hinzufügen
4. Bestätigen

**Aus Detailansicht:**
1. **Status**-Dropdown (rechts oben) klicken
2. Neuen Status wählen
3. Kommentar eingeben (bei bestimmten Übergängen Pflicht)
4. **Aktualisieren** klicken

#### Status-Übergangsregeln

| Von → Nach | Erlaubt für | Kommentar Pflicht |
|------------|-------------|-------------------|
| Neu → Offen | Bearbeiter, Admin | Nein |
| Neu → In Arbeit | Bearbeiter | Ja |
| Offen → In Arbeit | Bearbeiter | Ja |
| In Arbeit → Gehalten | Bearbeiter, Admin | Ja (Grund) |
| Gehalten → In Arbeit | Bearbeiter | Nein |
| In Arbeit → Gelöst | Bearbeiter | Ja (Lösung) |
| Gelöst → Geschlossen | Melder, Admin | Nein |
| Beliebig → Wiedereröffnet | Melder, Admin | Ja (Grund) |

#### 4. Ticket Zuweisen

1. Ticket-Detail öffnen
2. **Bearbeiter**-Feld / **Zuweisen**-Button klicken
3. Teammitglied aus Dropdown wählen
   - Gefiltert nach: Kunden-Zugriff, Rolle, Verfügbarkeit
4. Optional: Zuweisungsnotiz hinzufügen
5. **Zuweisen** klicken
6. Benachrichtigung an neuen Bearbeiter gesendet

#### 5. Kommentar / Interner Hinweis Hinzufügen

1. Ticket-Detail → **Kommentare**-Bereich
2. **Typ**: Öffentlich (für Melder sichtbar) / Intern (nur Team)
3. Kommentar schreiben (Markdown unterstützt)
4. **Dateien anhängen** falls nötig (Drag & Drop)
5. **Kommentar posten** klicken
6. E-Mail-Benachrichtigung basierend auf Präferenzen

#### 6. Anhänge Verwalten

**Hochladen:**
1. Im Kommentarbereich oder **Anhänge**-Tab
2. Dateien ziehen oder **Durchsuchen** klicken
3. Max. Größe: 50MB pro Datei
4. Erlaubt: Bilder, PDF, Logs, Archive

**Herunterladen/Löschen:**
1. Zu **Anhänge**-Tab gehen
2. **Herunterladen** oder **Löschen** (nur eigene Uploads) klicken

#### 7. Ticket Erstellen (Admin/Support)

1. **[+ Neues Ticket]** klicken (falls berechtigt)
2. Formular ausfüllen:
   - **Kunde/Institut**: Betroffene Entität wählen
   - **Kategorie**: Zugang / Hardware / Software / Netzwerk / Sync / Sonstiges
   - **Priorität**: Kritisch / Hoch / Normal / Niedrig
   - **Betreff**: Kurze Zusammenfassung (Pflicht)
   - **Beschreibung**: Detailliertes Problem (Markdown)
   - **Anhänge**: Logs, Screenshots
3. **Erstellen** klicken
4. Ticket mit Status **Neu** erstellt
5. Auto-Zuweisung basierend auf Kategorie/Institut-Regeln

#### 8. Massenaktionen

Mehrere Tickets auswählen → **Massenaktionen**:
- **Zuweisen an**: Mich / Bestimmter User / Round-Robin
- **Status setzen**: Offen / In Arbeit / Gehalten
- **Priorität setzen**: Eskalieren / Deeskalieren
- **Tag hinzufügen**: Für Reporting
- **Exportieren**: CSV mit gewählten Feldern

---

### SLA & Eskalation

#### Standard SLAs nach Priorität

| Priorität | Reaktionszeit | Lösungszeit | Eskalation |
|-----------|--------------|-------------|------------|
| **Kritisch** | 15 Minuten | 4 Stunden | Alle 30 Min |
| **Hoch** | 1 Stunde | 8 Stunden | Alle 2 Stunden |
| **Normal** | 4 Stunden | 24 Stunden | Alle 8 Stunden |
| **Niedrig** | 8 Stunden | 72 Stunden | Täglich |

#### SLA-Indikatoren

In Ticket-Liste:
- 🟢 Grün: Innerhalb SLA
- 🟡 Gelb: Drohende Verletzung (50% Zeit verstrichen)
- 🔴 Rot: SLA verletzt
- ⚫ Schwarz: Kein SLA (interne Tickets)

---

### Ticket-Kategorien

| Kategorie | Typische Probleme | Standard-Bearbeiter |
|-----------|------------------|---------------------|
| **Zugang** | Login, 2FA, Berechtigungen, gesperrte Accounts | Identity Team |
| **Hardware** | Drucker, Geräte, Thin Clients, Projektoren | Hardware Team |
| **Software** | App-Verteilung, Lizenzen, Updates | Software Team |
| **Netzwerk** | WLAN, DHCP, DNS, VPN, Firewall | Network Team |
| **Sync** | Cephalix Sync, Dateninkonsistenz | Sync Team |
| **Sonstiges** | Allgemeine Anfragen, Feature Requests | Triage Team |

---

### Suche & Filterung

#### Schnellsuche
- Durchsucht: Betreff, Beschreibung, Kommentare, Ticket-ID
- Syntax: `stichwort`, `"exakte phrase"`, `-ausschließen`

#### Erweiterte Filter
- **Datumsbereich**: Erstellt, Aktualisiert, Fälligkeitsdatum
- **Benutzerdefinierte Felder**: Tags, Custom-Attribute
- **SLA-Status**: Innerhalb/Verletzt/Gefährdet
- **Bearbeiter**: Ich, Unzugewiesen, Bestimmter User

#### Gespeicherte Filter
1. Filter konfigurieren
2. **Filter speichern** → Namen geben
3. Aus **Gespeicherte Filter** Dropdown abrufen
4. Mit Team teilen (falls berechtigt)

---

### Berechtigungs-Referenz

| Aktion | Erforderliche ACL |
|--------|------------------|
| Liste anzeigen | `cephalix.ticket` |
| Details anzeigen | `cephalix.ticket` |
| Ticket erstellen | `cephalix.ticket` + Erstellrecht |
| Status aktualisieren | `cephalix.ticket` |
| Ticket zuweisen | `cephalix.ticket` + Zuweisungsrecht |
| Kommentare hinzufügen | `cephalix.ticket` |
| Anhänge verwalten | `cephalix.ticket` |
| Massenaktionen | `cephalix.ticket` + Massenrecht |
| Ticket löschen | `cephalix.ticket` + Admin-Rolle |

---

### Häufige Probleme

| Problem | Lösung |
|---------|--------|
| Tickets nicht sichtbar | `cephalix.ticket` ACL prüfen |
| Nicht zuweisen möglich | Zuweisungsrecht + User-Kundenzugriff prüfen |
| SLA nicht berechnet | Institut-SLA-Konfiguration prüfen |
| E-Mail-Benachrichtigungen nicht versendet | Benachrichtigungseinstellungen im Profil prüfen |
| Anhang-Upload fehlgeschlagen | Dateigröße/Typ, Speicherplatz prüfen |