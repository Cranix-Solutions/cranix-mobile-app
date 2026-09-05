# Cranix Core: Users Management / Cranix Kern: Benutzerverwaltung

## English

### Overview

The **Users** page (`/pages/cranix/users`) manages all user accounts (students, teachers, parents, admins). Requires `user.manage` ACL.

### Page Layout

#### Users List - All Users (`/pages/cranix/users/all`)

```
┌─────────────────────────────────────────────────────────────────┐
│ Users                                    [+ Add User] [Import]  │
├─────────────────────────────────────────────────────────────────┤
│ Tabs: [All] [Import] [CRX 2FA] [Parents] [ID Cards]            │
├─────────────────────────────────────────────────────────────────┤
│ [Filter: All ▼] [Role: All ▼] [Search: ___________] [Columns]  │
├────┬──────────┬──────────┬──────────┬──────────┬────────┬───────┤
│ ☐  │ UID      │ Name     │ Role     │ Email    │ Groups │ Act. │
├────┼──────────┼──────────┼──────────┼──────────┼────────┼───────┤
│ ☐  │ mueller  │ Müller M │ teachers │ m@s.ch   │ 3      │ ⋮    │
│ ☐  │ schmidt  │ Schmidt S│ students │ s@s.ch   │ 2      │ ⋮    │
│ ☐  │ admin    │ Admin A  │ admins   │ a@s.ch   │ 1      │ ⋮    │
└────┴──────────┴──────────┴──────────┴──────────┴────────┴───────┘
```

**Tabs:**
| Tab | Route | Purpose |
|-----|-------|---------|
| **All** | `/users/all` | Main user list |
| **Import** | `/users/import` | Bulk user import from CSV |
| **CRX 2FA** | `/users/crx2fa` | View 2FA status for all users |
| **Parents** | `/users/parents` | Manage parent accounts & children links |
| **ID Cards** | `/users/idcards` | Identity card requests management |

**Columns (All Users):**
| Column | Description |
|--------|-------------|
| **UID** | Unique login identifier |
| **Name** | Surname, Given name |
| **Role** | students / teachers / parents / admins / ... |
| **Email** | Contact email |
| **Groups** | Number of group memberships |
| **Actions** | Edit, Groups, Password, 2FA, Delete |

---

### Step-by-Step Workflows

#### 1. Create New User
1. Click **[+ Add User]**
2. Fill form:
   - **UID**: Login name (unique, lowercase, e.g., "mueller_m")
   - **UUID**: Auto-generated or manual
   - **Surname / Given Name**: Full name
   - **Birth Day**: Date of birth (required for students)
   - **Password**: Initial password (user must change on first login if `mustChange`)
   - **Role**: students / teachers / parents / admins / ...
   - **Email Address**: Contact email
   - **Phone Number**: Optional
   - **Mail Aliases**: Additional email addresses
   - **Mail Quota (MB)**: Mailbox size limit
   - **File Quota (MB)**: File storage limit
   - **Must Change Password**: Force password change on first login
3. **Save** → User created, added to primary group based on role

#### 2. Edit User
1. Click **⋮ Actions** → **Edit**
2. Modify fields (UID cannot be changed)
3. **Save** → Updates applied

#### 3. Manage User Groups
1. Click **⋮ Actions** → **Groups** on user row
2. **Groups Modal** opens:
   - **Current Groups**: User's group memberships
   - **Available Groups**: Groups user can join (filterable by type)
3. **Add to Group**: Select → **Add →**
4. **Remove from Group**: Select → **← Remove**
5. **Close** → Membership updated

#### 4. Reset User Password
1. Click **⋮ Actions** → **Password**
2. Enter new password (twice)
3. **Save** → User must use new password on next login
4. Option: Set `mustChange = true` to force change on first login

#### 5. Manage User 2FA
1. Click **⋮ Actions** → **2FA** on user row
2. View: Current 2FA methods, backup codes status
3. **Admin Actions**:
   - **Reset 2FA**: Removes all methods, user must re-setup
   - **Disable 2FA**: Turns off 2FA requirement for user
   - **Generate Backup Codes**: Creates new backup code set

#### 6. Bulk User Import (CSV)
1. Switch to **Import** tab
2. Click **[Start Import]**
3. **Upload CSV** with columns:
   ```
   uid,uuid,surName,givenName,birthDay,password,role,emailAddress,telefonNumber,mailAliases,msQuota,fsQuota
   ```
4. **Options**:
   - **Default Password**: For users without password in CSV
   - **Must Change**: Force password change
   - **Skip Errors**: Continue on row errors
5. **Start** → Import runs in background
6. **Monitor**: Import tab shows progress, errors, results
7. **Download Results**: CSV with success/failure per row

#### 7. Manage Parent Accounts
1. Switch to **Parents** tab
2. **Segments**: Parents / Requests / PTM (Parent-Teacher Meetings)
3. **Parents List**: Shows parent accounts with linked children
   - **Add Parent**: Create parent account, link children
   - **Edit Parent**: Modify parent details, change linked children
4. **Requests**: Pending parent registration requests
   - **Approve**: Create parent account, link children
   - **Reject**: Delete request
5. **PTM**: Manage parent-teacher meetings (see Calendar/PTM docs)

#### 8. ID Cards Management
1. Switch to **ID Cards** tab
2. **Work Modes**: All / Opened / Expired / Valid / Release
3. **Requests List**: Identity card requests from users
   - **Review**: View photo, details
   - **Approve**: Set validity date, allow card
   - **Reject/Delete**: Remove request
4. **Release Mode**: Batch approve multiple cards
   - Select validity period
   - **Release** → Batch process with progress bar

#### 9. Delete User
⚠️ **Warning**: Removes user, home directory, mail, group memberships!

1. Click **⋮ Actions** → **Delete**
2. Confirm: Type UID
3. **Delete** → User and all data removed

---

### Search, Filter & Bulk Actions

- **Search**: Filters by UID, name, email, role
- **Role Filter**: students / teachers / parents / admins / ...
- **Columns**: Toggle (Birthday, Phone, Quotas, etc.)
- **Bulk Actions** (select multiple):
  - **Delete** multiple users
  - **Export** to CSV/Excel/PDF
  - **Set Role** for multiple
  - **Set Quota** for multiple
  - **Force Password Change** for multiple

---

### User Roles & Default Groups

| Role | Default Primary Group | Typical Permissions |
|------|----------------------|---------------------|
| **students** | students | Calendar, Profile, MyGroups (if enrolled) |
| **teachers** | teachers | MyGroups, Calendar, Informations, Room Control |
| **parents** | parents | Informations (read), PTM registration |
| **admins** | admins | Full access based on ACLs |
| **staff** | staff | Limited admin functions |

---

### Permissions Reference

| Action | Required ACL |
|--------|-------------|
| View list | `user.manage` |
| Create | `user.manage` |
| Edit | `user.modify` |
| Manage Groups | `user.manage` |
| Reset Password | `user.manage` |
| Manage 2FA | `user.manage` + `2fa.use` |
| Import Users | `user.manage` |
| Manage Parents | `user.manage` |
| ID Cards | `user.manage` |
| Delete | `user.manage` + confirmation |

---

### Common Issues

| Issue | Solution |
|-------|----------|
| UID already exists | Use unique UID, check deleted users |
| Import fails | Check CSV format, encoding (UTF-8), required columns |
| User can't login | Check: Account exists, password correct, not disabled |
| Parent not linked to child | Use Parents tab → Edit parent → Add child IDs |
| 2FA not working for user | Reset 2FA in admin, user re-configures |
| ID card photo not showing | Check file upload, base64 encoding |
| Quota not applying | Restart mail/file services, check quota config |

---

## Deutsch

### Übersicht

Die **Benutzer**-Seite (`/pages/cranix/users`) verwaltet alle Benutzerkonten (Schüler, Lehrer, Eltern, Admins). Benötigt `user.manage` ACL.

### Seitenaufbau

#### Benutzerliste - Alle Benutzer (`/pages/cranix/users/all`)

```
┌─────────────────────────────────────────────────────────────────┐
│ Benutzer                            [+ Benutzer +] [Import]     │
├─────────────────────────────────────────────────────────────────┤
│ Tabs: [Alle] [Import] [CRX 2FA] [Eltern] [ID-Karten]           │
├─────────────────────────────────────────────────────────────────┤
│ [Filter: Alle ▼] [Rolle: Alle ▼] [Suche: ___________] [Spalten]│
├────┬──────────┬──────────┬──────────┬──────────┬────────┬───────┤
│ ☐  │ UID      │ Name     │ Rolle    │ E-Mail   │ Gruppen│ Akt. │
├────┼──────────┼──────────┼──────────┼──────────┼────────┼───────┤
│ ☐  │ mueller  │ Müller M │ teachers │ m@s.ch   │ 3      │ ⋮    │
│ ☐  │ schmidt  │ Schmidt S│ students │ s@s.ch   │ 2      │ ⋮    │
│ ☐  │ admin    │ Admin A  │ admins   │ a@s.ch   │ 1      │ ⋮    │
└────┴──────────┴──────────┴──────────┴──────────┴────────┴───────┘
```

**Tabs:**
| Tab | Route | Zweck |
|-----|-------|-------|
| **Alle** | `/users/all` | Hauptbenutzerliste |
| **Import** | `/users/import` | Massenimport aus CSV |
| **CRX 2FA** | `/users/crx2fa` | 2FA-Status aller Benutzer |
| **Eltern** | `/users/parents` | Elternkonten & Kinder-Verknüpfungen |
| **ID-Karten** | `/users/idcards` | Identitätskarten-Anträge |

**Spalten (Alle Benutzer):**
| Spalte | Beschreibung |
|--------|-------------|
| **UID** | Eindeutiger Anmeldename |
| **Name** | Nachname, Vorname |
| **Rolle** | students / teachers / parents / admins / ... |
| **E-Mail** | Kontakt-E-Mail |
| **Gruppen** | Anzahl Gruppenmitgliedschaften |
| **Aktionen** | Bearbeiten, Gruppen, Passwort, 2FA, Löschen |

---

### Schritt-für-Schritt Workflows

#### 1. Neuen Benutzer Anlegen
1. **[+ Benutzer hinzufügen]** klicken
2. Formular ausfüllen:
   - **UID**: Anmeldename (eindeutig, kleinbuchstaben, z.B. "mueller_m")
   - **UUID**: Automatisch generiert oder manuell
   - **Nachname / Vorname**: Vollständiger Name
   - **Geburtstag**: Geburtsdatum (Pflicht für Schüler)
   - **Passwort**: Initialpasswort (Benutzer muss bei erstem Login ändern falls `mustChange`)
   - **Rolle**: students / teachers / parents / admins / ...
   - **E-Mail-Adresse**: Kontakt-E-Mail
   - **Telefonnummer**: Optional
   - **E-Mail-Aliase**: Zusätzliche E-Mail-Adressen
   - **Mail-Quota (MB)**: Postfach-Größenlimit
   - **Datei-Quota (MB)**: Dateispeicher-Limit
   - **Passwort ändern erzwingen**: Passwortwechsel bei erstem Login erzwingen
3. **Speichern** → Benutzer erstellt, Primärgruppe basierend auf Rolle zugewiesen

#### 2. Benutzer Bearbeiten
1. **⋮ Aktionen** → **Bearbeiten** klicken
2. Felder ändern (UID nicht änderbar)
3. **Speichern** → Aktualisierungen angewendet

#### 3. Benutzergruppen Verwalten
1. **⋮ Aktionen** → **Gruppen** in Benutzerzeile klicken
2. **Gruppen-Modal** öffnet sich:
   - **Aktuelle Gruppen**: Gruppenmitgliedschaften des Benutzers
   - **Verfügbare Gruppen**: Gruppen denen Benutzer beitreten kann (nach Typ filterbar)
3. **Zur Gruppe hinzufügen**: Auswählen → **Hinzufügen →**
4. **Aus Gruppe entfernen**: Auswählen → **← Entfernen**
5. **Schließen** → Mitgliedschaft aktualisiert

#### 4. Benutzerpasswort Zurücksetzen
1. **⋮ Aktionen** → **Passwort** klicken
2. Neues Passwort eingeben (zweimal)
3. **Speichern** → Benutzer muss neues Passwort beim nächsten Login nutzen
4. Option: `mustChange = true` setzen für erzwungenen Wechsel beim ersten Login

#### 5. Benutzer-2FA Verwalten
1. **⋮ Aktionen** → **2FA** in Benutzerzeile klicken
2. Anzeigen: Aktuelle 2FA-Methoden, Backup-Codes-Status
3. **Admin-Aktionen**:
   - **2FA zurücksetzen**: Entfernt alle Methoden, Benutzer muss neu einrichten
   - **2FA deaktivieren**: 2FA-Pflicht für Benutzer ausschalten
   - **Backup-Codes generieren**: Neuen Backup-Code-Satz erstellen

#### 6. Massenimport Benutzer (CSV)
1. Zu **Import**-Tab wechseln
2. **[Import starten]** klicken
3. **CSV hochladen** mit Spalten:
   ```
   uid,uuid,surName,givenName,birthDay,password,role,emailAddress,telefonNumber,mailAliases,msQuota,fsQuota
   ```
4. **Optionen**:
   - **Standardpasswort**: Für Benutzer ohne Passwort in CSV
   - **Passwort ändern**: Passwortwechsel erzwingen
   - **Fehler überspringen**: Bei Zeilenfehlern weitermachen
5. **Starten** → Import läuft im Hintergrund
6. **Überwachen**: Import-Tab zeigt Fortschritt, Fehler, Ergebnisse
7. **Ergebnisse herunterladen**: CSV mit Erfolg/Fehler pro Zeile

#### 7. Elternkonten Verwalten
1. Zu **Eltern**-Tab wechseln
2. **Segmente**: Eltern / Anfragen / PTM (Elternsprechtage)
3. **Elternliste**: Zeigt Elternkonten mit verknüpften Kindern
   - **Elternteil hinzufügen**: Elternkonto erstellen, Kinder verknüpfen
   - **Elternteil bearbeiten**: Eltern-Details ändern, verknüpfte Kinder ändern
4. **Anfragen**: Ausstehende Elternregistrierungsanfragen
   - **Genehmigen**: Elternkonto erstellen, Kinder verknüpfen
   - **Ablehnen**: Anfrage löschen
5. **PTM**: Elternsprechtage verwalten (siehe Kalender/PTM Docs)

#### 8. ID-Karten Verwalten
1. Zu **ID-Karten**-Tab wechseln
2. **Arbeitsmodi**: Alle / Offen / Abgelaufen / Gültig / Freigabe
3. **Anträge-Liste**: Identitätskarten-Anträge von Benutzern
   - **Prüfen**: Foto, Details ansehen
   - **Genehmigen**: Gültigkeitsdatum setzen, Karte erlauben
   - **Ablehnen/Löschen**: Antrag entfernen
4. **Freigabe-Modus**: Mehrere Karten stapelweise genehmigen
   - Gültigkeitszeitraum wählen
   - **Freigeben** → Stapelverarbeitung mit Fortschrittsbalken

#### 9. Benutzer Löschen
⚠️ **Warnung**: Entfernt Benutzer, Home-Verzeichnis, Mail, Gruppenmitgliedschaften!

1. **⋮ Aktionen** → **Löschen** klicken
2. Bestätigen: UID eingeben
3. **Löschen** → Benutzer und alle Daten entfernt

---

### Suche, Filter & Massenaktionen

- **Suche**: Filtert nach UID, Name, E-Mail, Rolle
- **Rollen-Filter**: students / teachers / parents / admins / ...
- **Spalten**: Umschalten (Geburtstag, Telefon, Quotas, etc.)
- **Massenaktionen** (mehrere auswählen):
  - **Mehrere Benutzer löschen**
  - **Exportieren** nach CSV/Excel/PDF
  - **Rolle setzen** für mehrere
  - **Quota setzen** für mehrere
  - **Passwortwechsel erzwingen** für mehrere

---

### Benutzerrollen & Standardgruppen

| Rolle | Standard-Primärgruppe | Typische Berechtigungen |
|------|----------------------|------------------------|
| **students** | students | Kalender, Profil, MyGroups (falls eingeschrieben) |
| **teachers** | teachers | MyGroups, Kalender, Informationen, Raumsteuerung |
| **parents** | parents | Informationen (lesen), PTM-Registrierung |
| **admins** | admins | Vollzugriff basierend auf ACLs |
| **staff** | staff | Eingeschränkte Admin-Funktionen |

---

### Berechtigungs-Referenz

| Aktion | Erforderliche ACL |
|--------|------------------|
| Liste anzeigen | `user.manage` |
| Erstellen | `user.manage` |
| Bearbeiten | `user.modify` |
| Gruppen verwalten | `user.manage` |
| Passwort zurücksetzen | `user.manage` |
| 2FA verwalten | `user.manage` + `2fa.use` |
| Benutzer importieren | `user.manage` |
| Eltern verwalten | `user.manage` |
| ID-Karten | `user.manage` |
| Löschen | `user.manage` + Bestätigung |

---

### Häufige Probleme

| Problem | Lösung |
|---------|--------|
| UID existiert bereits | Eindeutige UID nutzen, gelöschte Benutzer prüfen |
| Import schlägt fehl | CSV-Format, Kodierung (UTF-8), Pflichtspalten prüfen |
| Benutzer kann nicht anmelden | Prüfen: Konto existiert, Passwort korrekt, nicht deaktiviert |
| Elternteil nicht mit Kind verknüpft | Eltern-Tab → Elternteil bearbeiten → Kinder-IDs hinzufügen |
| 2FA funktioniert nicht für Benutzer | 2FA im Admin zurücksetzen, Benutzer richtet neu ein |
| ID-Karten-Foto nicht sichtbar | Datei-Upload, Base64-Kodierung prüfen |
| Quota wird nicht angewendet | Mail/Datei-Dienste neu starten, Quota-Konfig prüfen |