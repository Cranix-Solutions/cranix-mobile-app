# Authentication & Login / Authentifizierung & Anmeldung

## English

### Login Page (`/login`)

The standard login page for desktop browsers.

#### Step-by-Step Login Process

1. **Navigate to Login**
   - Open your CRANIX server URL
   - You'll see the login form automatically

2. **Enter Credentials**
   - **Username**: Your account username (e.g., `admin`, `teacher1`)
   - **Password**: Your account password
   - **Institute**: Select from dropdown (only shown if you have access to multiple institutes)

3. **Submit Login**
   - Click the **Login** button
   - The system validates credentials against the CRANIX server

4. **Two-Factor Authentication (if enabled)**
   - If your account has 2FA configured, you'll see a PIN entry screen
   - A PIN is sent to your registered device (email/SMS/app)
   - Enter the 6-digit PIN and click **Verify**
   - Option: Click **Resend PIN** if you didn't receive it

5. **Post-Login Redirect**
   Based on your permissions, you're redirected to:
   - **Cephalix Admin** (`cephalix.manage`) → `/pages/cephalix/institutes/all`
   - **User Manager** (`user.manage`) → `/pages/cranix/users/all`
   - **Teachers** (`education.groups`) → `/pages/cranix/mygroups`
   - **Default** → `/pages/cranix/profile/myself`

#### Login Form Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Username | Text | Yes | Your login username |
| Password | Password | Yes | Your account password |
| Institute | Select | Conditional | Visible only for multi-institute accounts |
| PIN | Text | Conditional | 6-digit code for 2FA verification |

#### Error Messages

| Error | Cause | Solution |
|-------|-------|----------|
| "Passwort falsch!" / "Wrong password!" | Invalid credentials | Check username/password, ensure Caps Lock is off |
| "Pin falsch!" / "Wrong PIN!" | Invalid 2FA code | Request new PIN, check time sync on device |
| "Ihr Token ist ungültig." | Expired/invalid token | Re-login from main page |
| "Ihr Zugriff ist abgelaufen." | Session expired | Login again |

---

### Mobile Login Page (`/mobillogin`)

Optimized for mobile devices and PWA standalone mode.

#### Differences from Desktop Login

- **Touch-friendly** input fields and buttons
- **Auto-focus** on username field
- **Responsive layout** for small screens
- **PWA-specific**: Used when app is installed and launched from home screen

#### When It's Used

- App installed as PWA and opened from home screen
- Mobile browser detected with small viewport
- Direct access via `?token=` parameter (see below)

---

### Token-Based Direct Access

You can access specific pages directly using a session token:

```
https://cranix.your-school.org/?token=YOUR_SESSION_TOKEN
```

#### Use Cases

- **Email links** from ticket notifications
- **Bookmarked pages** with valid session
- **API integrations** generating temporary access

#### Behavior

1. Token is validated server-side
2. Session is restored with original permissions
3. User is redirected to the page stored in the token session
4. If no target page: follows default role-based redirect

#### Security Notes

- Tokens have **limited validity** (configured server-side)
- Tokens are **single-use** for sensitive operations
- Never share token URLs in unsecured channels

---

### Session Management

#### Automatic Session Restoration

On app load, the system checks for:
1. URL parameter `?token=`
2. `sessionStorage` items: `cephalix_token`, `shortName`, `instituteName`
3. Valid stored session → auto-login
4. No valid session → redirect to login

#### Session Timeout

- **Default**: Configurable server-side (typically 8-24 hours)
- **Activity**: Extended on each API request
- **Warning**: No client-side warning before expiry
- **Expiry**: Redirects to login on next action

#### Manual Logout

1. Click **User Menu** (top-right avatar/name)
2. Select **Logout**
3. Session is destroyed server-side
4. Redirect to login page

---

### Password Management

#### Expired Password

If your password has expired:
1. Login succeeds but shows warning: "Your password is expired. You have to change it."
2. Automatic redirect to **Profile → Myself**
3. Enter current password, new password (twice)
4. Save changes → normal access restored

#### Password Requirements

- Minimum 8 characters
- At least 1 uppercase, 1 lowercase, 1 number
- Special characters recommended
- Cannot reuse last 5 passwords

---

## Deutsch

### Anmeldeseite (`/login`)

Die Standard-Anmeldeseite für Desktop-Browser.

#### Schritt-für-Schritt Anmeldeprozess

1. **Zur Anmeldung navigieren**
   - Öffnen Sie Ihre CRANIX-Server-URL
   - Das Anmeldeformular wird automatisch angezeigt

2. **Anmeldedaten eingeben**
   - **Benutzername**: Ihr Kontoname (z.B. `admin`, `lehrer1`)
   - **Passwort**: Ihr Kontopasswort
   - **Institut**: Aus Dropdown auswählen (nur bei Zugriff auf mehrere Institute sichtbar)

3. **Anmeldung absenden**
   - Klicken Sie auf **Anmelden**
   - Das System prüft die Anmeldedaten gegen den CRANIX-Server

4. **Zwei-Faktor-Authentifizierung (falls aktiviert)**
   - Bei konfiguriertem 2FA erscheint eine PIN-Eingabemaske
   - Ein PIN wird an Ihr registriertes Gerät gesendet (E-Mail/SMS/App)
   - Geben Sie den 6-stelligen PIN ein und klicken Sie auf **Prüfen**
   - Option: **PIN erneut senden** falls nicht erhalten

5. **Weiterleitung nach Anmeldung**
   Basierend auf Ihren Berechtigungen werden Sie weitergeleitet zu:
   - **Cephalix Admin** (`cephalix.manage`) → `/pages/cephalix/institutes/all`
   - **Benutzerverwalter** (`user.manage`) → `/pages/cranix/users/all`
   - **Lehrer** (`education.groups`) → `/pages/cranix/mygroups`
   - **Standard** → `/pages/cranix/profile/myself`

#### Anmeldeformular-Felder

| Feld | Typ | Pflicht | Beschreibung |
|------|-----|---------|--------------|
| Benutzername | Text | Ja | Ihr Anmeldename |
| Passwort | Passwort | Ja | Ihr Kontopasswort |
| Institut | Auswahl | Bedingt | Nur bei Multi-Institut-Konten sichtbar |
| PIN | Text | Bedingt | 6-stelliger Code für 2FA-Verifizierung |

#### Fehlermeldungen

| Fehlermeldung | Ursache | Lösung |
|--------------|---------|--------|
| "Passwort falsch!" | Ungültige Anmeldedaten | Benutzername/Passwort prüfen, Caps Lock deaktivieren |
| "Pin falsch!" | Ungültiger 2FA-Code | Neuen PIN anfordern, Zeitsynchronisation prüfen |
| "Ihr Token ist ungültig." | Abgelaufener/ungültiger Token | Neu anmelden von Hauptseite |
| "Ihr Zugriff ist abgelaufen." | Sitzung abgelaufen | Erneut anmelden |

---

### Mobile Anmeldeseite (`/mobillogin`)

Optimiert für mobile Geräte und PWA-Standalone-Modus.

#### Unterschiede zur Desktop-Anmeldung

- **Touch-freundliche** Eingabefelder und Buttons
- **Autofokus** auf Benutzername-Feld
- **Responsives Layout** für kleine Bildschirme
- **PWA-spezifisch**: Wird verwendet wenn App installiert und vom Homescreen gestartet

#### Wann Sie Verwendet Wird

- App als PWA installiert und vom Homescreen geöffnet
- Mobiler Browser mit kleinem Viewport erkannt
- Direkter Zugriff über `?token=` Parameter (siehe unten)

---

### Token-basierter Direkter Zugriff

Sie können spezifische Seiten direkt mit einem Sitzungstoken aufrufen:

```
https://cranix.ihre-schule.org/?token=IHR_SESSION_TOKEN
```

#### Anwendungsfälle

- **E-Mail-Links** aus Ticket-Benachrichtigungen
- **Lesezeichen** mit gültiger Sitzung
- **API-Integrationen** die temporären Zugriff erzeugen

#### Verhalten

1. Token wird serverseitig validiert
2. Sitzung wird mit ursprünglichen Berechtigungen wiederhergestellt
3. Benutzer wird zur im Token gespeicherten Zielseite weitergeleitet
4. Falls keine Zielseite: Standard-Role-basierte Weiterleitung

#### Sicherheitshinweise

- Tokens haben **begrenzte Gültigkeit** (serverseitig konfiguriert)
- Tokens sind **einmalig** für sensible Operationen
- Token-URLS niemals in unsicheren Kanälen teilen

---

### Sitzungsverwaltung

#### Automatische Sitzungswiederherstellung

Beim App-Start prüft das System:
1. URL-Parameter `?token=`
2. `sessionStorage` Einträge: `cephalix_token`, `shortName`, `instituteName`
3. Gültige gespeicherte Sitzung → Auto-Login
4. Keine gültige Sitzung → Weiterleitung zur Anmeldung

#### Sitzungszeitlimit

- **Standard**: Serverseitig konfigurierbar (typisch 8-24 Stunden)
- **Aktivität**: Wird bei jeder API-Anfrage verlängert
- **Warnung**: Keine clientseitige Warnung vor Ablauf
- **Ablauf**: Bei nächster Aktion Weiterleitung zur Anmeldung

#### Manueller Logout

1. Klicken Sie auf **Benutzermenü** (rechts oben Avatar/Name)
2. Wählen Sie **Abmelden**
3. Sitzung wird serverseitig zerstört
4. Weiterleitung zur Anmeldeseite

---

### Passwortverwaltung

#### Abgelaufenes Passwort

Wenn Ihr Passwort abgelaufen ist:
1. Anmeldung gelingt aber zeigt Warnung: "Your password is expired. You have to change it."
2. Automatische Weiterleitung zu **Profil → Selbst**
3. Aktuelles Passwort, neues Passwort (zweimal) eingeben
4. Speichern → normaler Zugriff wiederhergestellt

#### Passwortanforderungen

- Mindestens 8 Zeichen
- Mindestens 1 Großbuchstabe, 1 Kleinbuchstabe, 1 Zahl
- Sonderzeichen empfohlen
- Letzten 5 Passwörter dürfen nicht wiederverwendet werden