# Two-Factor Authentication (2FA) / Zwei-Faktor-Authentifizierung (2FA)

## English

### Overview

CRANIX supports **TOTP-based 2FA** (Time-based One-Time Password) using standard authenticator apps (Google Authenticator, Microsoft Authenticator, Authy, etc.).

### When 2FA is Required

- **Enforced by admin**: `2fa.use` ACL assigned to your role
- **First login**: After admin enables 2FA for your account
- **New device**: When logging in from unrecognized device/browser

### Initial 2FA Setup

#### Automatic Redirect on First Login

If 2FA is required but not configured:

1. Login with username/password succeeds
2. System detects missing 2FA → Redirects to **Profile → CRX 2FA** (`/pages/cranix/profile/crx2fa`)
3. You **must** complete setup before accessing other pages

#### Setup Steps

1. **Open Authenticator App** on your phone
2. **Scan QR Code** displayed on screen
   - Or manually enter the **Secret Key** shown below QR code
3. **Enter Verification Code** from app (6 digits)
4. Click **Activate 2FA**
5. Success message → Redirect to your default landing page

#### Backup Codes

After activation, **save your backup codes** immediately:
- 10 one-time use codes generated
- Store securely (password manager, printed copy)
- Each code works **once** for login if authenticator unavailable

---

### Daily 2FA Login Flow

#### Standard Login with 2FA

1. Enter username/password on login page
2. Click **Login**
3. **PIN Entry Screen** appears:
   - Shows masked 2FA method (e.g., `TOTP App ***`)
   - Input field for 6-digit code
   - **Verify** button
   - **Resend PIN** button (for email/SMS methods)
4. Open authenticator app, read current code
5. Enter code, click **Verify**
6. Success → Redirect to landing page

#### PIN Resend (Email/SMS Methods)

If using email/SMS delivery:
1. Click **Resend PIN** on PIN entry screen
2. New code sent to registered contact method
3. Enter new code within validity period (typically 5 minutes)

---

### Managing 2FA Settings

#### Accessing 2FA Management

Navigate to: **Profile → CRX 2FA** (`/pages/cranix/profile/crx2fa`)

#### Available Actions

| Action | Description |
|--------|-------------|
| **View Active Methods** | List of configured 2FA methods |
| **Add New Method** | Register additional authenticator/device |
| **Remove Method** | Delete a 2FA method (requires verification) |
| **Regenerate Backup Codes** | Create new set (invalidates old codes) |
| **Disable 2FA** | Turn off 2FA (requires admin permission) |

#### Adding a Second Device

1. Go to **Profile → CRX 2FA**
2. Click **Add Method**
3. Select **TOTP App**
4. Scan QR code with new device
5. Enter verification code from new device
6. Both devices now work independently

#### Removing a Method

1. Go to **Profile → CRX 2FA**
2. Click **Remove** on the method
3. Enter verification code from **remaining** method
4. Confirm removal

---

### Troubleshooting 2FA

#### Lost Access to Authenticator

**Option 1: Backup Codes**
1. On PIN entry screen, click **Use Backup Code**
2. Enter one of your saved backup codes
3. Login succeeds → Immediately generate new backup codes

**Option 2: Second Registered Device**
- Use another device where you've set up 2FA

**Option 3: Admin Assistance**
- Contact your CRANIX administrator
- Admin can reset 2FA via user management
- You'll need to re-setup on next login

#### Time Synchronization Issues

TOTP codes depend on **accurate time** (±30 seconds):

| Device | Fix |
|--------|-----|
| Phone | Enable **Automatic Date & Time** in settings |
| Authenticator App | Use **Time Correction** feature (Google Authenticator: Settings → Time correction) |
| Computer | Sync with NTP server |

#### Invalid Code Errors

| Issue | Solution |
|-------|----------|
| "Pin falsch!" / "Wrong PIN!" | Check time sync, ensure correct account in app |
| Code works on one device not another | Time drift between devices - sync both |
| QR code scan fails | Enter secret key manually, check camera focus |

---

### 2FA for Administrators

#### Enforcing 2FA for Users

1. Navigate to **Users → All Users**
2. Select user(s) → **Actions → Set 2FA Requirement**
3. Assign `2fa.use` ACL to user/role
4. User prompted to setup on next login

#### Viewing 2FA Status

In **Users** list, columns show:
- **2FA Status**: Enabled/Disabled/Required
- **Methods**: Number of registered methods
- **Last Used**: Timestamp of last 2FA verification

#### Emergency 2FA Reset

As admin:
1. Go to **Users → All Users**
2. Find user → **Edit → Security**
3. Click **Reset 2FA**
4. User must re-setup on next login
5. **Audit log** entry created automatically

---

### Best Practices

1. **Always configure backup codes** and store securely
2. **Register at least 2 devices** (phone + tablet/backup phone)
3. **Use authenticator app** (not SMS) for better security
4. **Regularly verify** you can access all registered methods
5. **Update backup codes** after any device change
6. **Never share** QR codes, secret keys, or backup codes

---

## Deutsch

### Übersicht

CRANIX unterstützt **TOTP-basierte 2FA** (Time-based One-Time Password) mit Standard-Authenticator-Apps (Google Authenticator, Microsoft Authenticator, Authy, etc.).

### Wann 2FA Erforderlich Ist

- **Vom Admin erzwungen**: `2fa.use` ACL der Rolle zugewiesen
- **Erster Login**: Nachdem Admin 2FA für Ihren Account aktiviert hat
- **Neues Gerät**: Bei Anmeldung von nicht erkanntem Gerät/Browser

### Ersteinrichtung von 2FA

#### Automatische Weiterleitung beim Ersten Login

Wenn 2FA erforderlich aber nicht konfiguriert ist:

1. Anmeldung mit Benutzername/Passwort gelingt
2. System erkennt fehlendes 2FA → Weiterleitung zu **Profil → CRX 2FA** (`/pages/cranix/profile/crx2fa`)
3. Sie **müssen** die Einrichtung abschließen bevor andere Seiten zugänglich sind

#### Einrichtungsschritte

1. **Authenticator-App öffnen** auf Ihrem Handy
2. **QR-Code scannen** der auf dem Bildschirm angezeigt wird
   - Oder **Geheimschlüssel** manuell eingeben (unter QR-Code angezeigt)
3. **Verifizierungscode eingeben** aus der App (6 Ziffern)
4. **2FA aktivieren** klicken
5. Erfolgsmeldung → Weiterleitung zur Standard-Startseite

#### Backup-Codes

Nach Aktivierung **sofort Backup-Codes sichern**:
- 10 Einmal-Codes werden generiert
- Sicher aufbewahren (Passwort-Manager, Ausdruck)
- Jeder Code funktioniert **einmal** für Login wenn Authenticator nicht verfügbar

---

### Täglicher 2FA-Login-Ablauf

#### Standard-Login mit 2FA

1. Benutzername/Passwort auf Anmeldeseite eingeben
2. **Anmelden** klicken
3. **PIN-Eingabemaske** erscheint:
   - Zeigt maskierte 2FA-Methode (z.B. `TOTP App ***`)
   - Eingabefeld für 6-stelligen Code
   - **Prüfen** Button
   - **PIN erneut senden** Button (für E-Mail/SMS Methoden)
4. Authenticator-App öffnen, aktuellen Code ablesen
5. Code eingeben, **Prüfen** klicken
6. Erfolg → Weiterleitung zur Startseite

#### PIN Erneut Senden (E-Mail/SMS Methoden)

Bei E-Mail/SMS-Zustellung:
1. **PIN erneut senden** auf PIN-Eingabemaske klicken
2. Neuer Code an registrierte Kontaktmethode gesendet
3. Neuen Code innerhalb Gültigkeitszeitraum eingeben (typisch 5 Minuten)

---

### 2FA-Einstellungen Verwalten

#### Zugriff auf 2FA-Verwaltung

Navigieren zu: **Profil → CRX 2FA** (`/pages/cranix/profile/crx2fa`)

#### Verfügbare Aktionen

| Aktion | Beschreibung |
|--------|-------------|
| **Aktive Methoden anzeigen** | Liste konfigurierter 2FA-Methoden |
| **Neue Methode hinzufügen** | Zusätzlichen Authenticator/Gerät registrieren |
| **Methode entfernen** | 2FA-Methode löschen (erfordert Verifizierung) |
| **Backup-Codes neu generieren** | Neuen Satz erstellen (alte Codes ungültig) |
| **2FA deaktivieren** | 2FA ausschalten (benötigt Admin-Berechtigung) |

#### Zweites Gerät Hinzufügen

1. Zu **Profil → CRX 2FA** gehen
2. **Methode hinzufügen** klicken
3. **TOTP App** auswählen
4. QR-Code mit neuem Gerät scannen
5. Verifizierungscode vom neuen Gerät eingeben
6. Beide Geräte funktionieren nun unabhängig

#### Methode Entfernen

1. Zu **Profil → CRX 2FA** gehen
2. **Entfernen** bei der Methode klicken
3. Verifizierungscode von **verbleibender** Methode eingeben
4. Entfernung bestätigen

---

### 2FA-Problemlösung

#### Zugriff auf Authenticator Verloren

**Option 1: Backup-Codes**
1. Auf PIN-Eingabemaske **Backup-Code verwenden** klicken
2. Einen der gesicherten Backup-Codes eingeben
3. Login gelingt → Sofort neue Backup-Codes generieren

**Option 2: Zweites Registriertes Gerät**
- Anderes Gerät nutzen wo 2FA eingerichtet ist

**Option 3: Admin-Hilfe**
- CRANIX-Administrator kontaktieren
- Admin kann 2FA über Benutzerverwaltung zurücksetzen
- Bei nächstem Login erneute Einrichtung nötig

#### Zeitsynchronisations-Probleme

TOTP-Codes hängen von **genauer Zeit** ab (±30 Sekunden):

| Gerät | Lösung |
|-------|--------|
| Handy | **Automatisches Datum & Uhrzeit** in Einstellungen aktivieren |
| Authenticator-App | **Zeitkorrektur** nutzen (Google Authenticator: Einstellungen → Zeitkorrektur) |
| Computer | Mit NTP-Server synchronisieren |

#### Ungültige Code-Fehler

| Problem | Lösung |
|---------|--------|
| "Pin falsch!" / "Wrong PIN!" | Zeitsync prüfen, korrektes Konto in App sicherstellen |
| Code funktioniert auf einem Gerät nicht auf anderem | Zeitversatz zwischen Geräten - beide synchronisieren |
| QR-Code Scan fehlschlägt | Geheimschlüssel manuell eingeben, Kamerfokus prüfen |

---

### 2FA für Administratoren

#### 2FA für Benutzer Erzwingen

1. Zu **Benutzer → Alle Benutzer** navigieren
2. Benutzer auswählen → **Aktionen → 2FA-Pflicht setzen**
3. `2fa.use` ACL dem Benutzer/Rolle zuweisen
4. Benutzer wird bei nächstem Login zur Einrichtung aufgefordert

#### 2FA-Status Einsehen

In der **Benutzer**-Liste zeigen Spalten:
- **2FA-Status**: Aktiviert/Deaktiviert/Erforderlich
- **Methoden**: Anzahl registrierter Methoden
- **Zuletzt verwendet**: Zeitstempel der letzten 2FA-Verifizierung

#### Notfall-2FA-Reset

Als Admin:
1. Zu **Benutzer → Alle Benutzer** gehen
2. Benutzer finden → **Bearbeiten → Sicherheit**
3. **2FA zurücksetzen** klicken
4. Benutzer muss bei nächstem Login neu einrichten
5. **Audit-Log** Eintrag wird automatisch erstellt

---

### Best Practices

1. **Immer Backup-Codes konfigurieren** und sicher aufbewahren
2. **Mindestens 2 Geräte registrieren** (Handy + Tablet/Backup-Handy)
3. **Authenticator-App nutzen** (nicht SMS) für bessere Sicherheit
4. **Regelmäßig prüfen** dass alle registrierten Methoden zugänglich sind
5. **Backup-Codes aktualisieren** nach jedem Gerätewechsel
6. **NIEMALS** QR-Codes, Geheimschlüssel oder Backup-Codes teilen