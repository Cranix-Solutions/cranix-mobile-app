# Profile / Profil

## Quick Access
- **Route**: `/pages/cranix/profile`
- **Menu**: Profile (user avatar → Profile)
- **Required ACL**: `permitall` / `2fa.use` (for 2FA tab)

## UI Overview
```
┌─────────────────────────────────────────────────────────────┐
│ Profile                                              [Save]  │
├─────────────────────────────────────────────────────────────┤
│ [Myself] [My Files] [My Devices] [My VPN] [CRX 2FA]         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐  ┌─────────────────────────────────────┐  │
│  │  Avatar     │  │  Personal Data                      │  │
│  │  [Change]   │  │  Name: Max Mustermann               │  │
│  └─────────────┘  │  Email: max@school.edu              │  │
│                   │  Phone: +49 123 456789              │  │
│  [Change Password]│  Language: German ▼                 │  │
│                   │  Timezone: Europe/Berlin ▼          │  │
│                   └─────────────────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Tabs:**
| Tab | Route | Purpose |
|-----|-------|---------|
| **Myself** | `/profile/myself` | Personal data, password, avatar |
| **My Files** | `/profile/myFiles` | Personal file storage |
| **My Devices** | `/profile/mydevice` | Registered devices, certificates |
| **My VPN** | `/profile/myVPN` | VPN config downloads |
| **CRX 2FA** | `/profile/crx2fa` | Two-factor authentication setup |

---

## Top Workflows

### 1. Change Password
1. **Myself** tab → **Change Password**
2. Enter: Current password, New password (twice)
3. **Requirements**: 8+ chars, upper/lower/number/special
4. Click **Save** → Must re-login with new password

### 2. Update Personal Info
1. **Myself** tab → Edit fields
2. Update: Email, Phone, Language, Timezone
3. Click **Save** → Changes immediate

### 3. Upload Avatar
1. **Myself** tab → Click avatar placeholder
2. Select image (max 2MB, JPG/PNG)
3. Crop if needed → **Save**

### 4. Manage Personal Files
1. **My Files** tab
2. **Upload**: Drag & drop or click **Browse**
3. **Organize**: Create folders, move files
4. **Share**: Right-click → **Get Link** (expiry optional)

### 5. View/Download VPN Config
1. **My VPN** tab
2. See: OpenVPN / WireGuard configs
3. Click **Download** → `.ovpn` or `.conf`
4. Import in VPN client (OpenVPN Connect, WireGuard app)

### 6. Set Up 2FA (TOTP)
1. **CRX 2FA** tab → **Add Method** → **TOTP App**
2. Scan QR code with Google Authenticator / Authy / Microsoft Authenticator
3. Enter 6-digit code from app
4. **Save** → **Backup codes generated** → **DOWNLOAD & STORE SAFELY**

### 7. Add Second 2FA Device
1. **CRX 2FA** tab → **Add Method**
2. Scan with new phone/tablet
3. Verify with code from new device
4. Both devices now work independently

### 8. Regenerate Backup Codes
1. **CRX 2FA** tab → **Regenerate Backup Codes**
2. **Confirm** → Old codes invalidated
3. **Download new codes** immediately

---

## Key Shortcuts
| Key | Action |
|-----|--------|
| `Tab` | Navigate between fields |
| `Enter` | Save form (if focused) |
| `Esc` | Cancel edit / Close dialog |

---

## Common Issues
| Problem | Fix |
|---------|-----|
| Password rejected | Check requirements: 8 chars, upper, lower, number, special |
| 2FA code invalid | Sync time on phone (Settings → Auto date/time) |
| VPN config not working | Download fresh config, check server address |
| File upload fails | Check size (< 50MB), file type, storage quota |
| Language not changing | Clear browser cache, reload app |

---

## Deutsch

### Schneller Zugriff
- **Route**: `/pages/cranix/profile`
- **Menü**: Profil (Benutzer-Avatar → Profil)
- **Erforderliche ACL**: `permitall` / `2fa.use` (für 2FA-Tab)

### UI-Übersicht
```
┌─────────────────────────────────────────────────────────────┐
│ Profil                                               [Speichern]│
├─────────────────────────────────────────────────────────────┤
│ [Selbst] [Meine Dateien] [Meine Geräte] [Mein VPN] [CRX 2FA] │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐  ┌─────────────────────────────────────┐  │
│  │  Avatar     │  │  Persönliche Daten                  │  │
│  │  [Ändern]   │  │  Name: Max Mustermann               │  │
│  └─────────────┘  │  E-Mail: max@schule.edu             │  │
│                   │  Telefon: +49 123 456789            │  │
│  [Passwort ändern]│  Sprache: Deutsch ▼                 │  │
│                   │  Zeitzone: Europe/Berlin ▼          │  │
│                   └─────────────────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Tabs:**
| Tab | Route | Zweck |
|-----|-------|-------|
| **Selbst** | `/profile/myself` | Persönliche Daten, Passwort, Avatar |
| **Meine Dateien** | `/profile/myFiles` | Persönlicher Dateispeicher |
| **Meine Geräte** | `/profile/mydevice` | Registrierte Geräte, Zertifikate |
| **Mein VPN** | `/profile/myVPN` | VPN-Konfigurationen downloaden |
| **CRX 2FA** | `/profile/crx2fa` | Zwei-Faktor-Authentifizierung |

---

### Top-Workflows

#### 1. Passwort Ändern
1. **Selbst**-Tab → **Passwort ändern**
2. Eingeben: Aktuelles Passwort, Neues Passwort (zweimal)
3. **Anforderungen**: 8+ Zeichen, Groß/Klein/Zahl/Sonderzeichen
4. **Speichern** → Erneut mit neuem Passwort anmelden

#### 2. Persönliche Daten Aktualisieren
1. **Selbst**-Tab → Felder bearbeiten
2. Aktualisieren: E-Mail, Telefon, Sprache, Zeitzone
3. **Speichern** → Änderungen sofort wirksam

#### 3. Avatar Hochladen
1. **Selbst**-Tab → Auf Avatar-Platzhalter klicken
2. Bild wählen (max 2MB, JPG/PNG)
3. Zuschneiden falls nötig → **Speichern**

#### 4. Eigene Dateien Verwalten
1. **Meine Dateien**-Tab
2. **Hochladen**: Drag & Drop oder **Durchsuchen**
3. **Organisieren**: Ordner erstellen, Dateien verschieben
4. **Teilen**: Rechtsklick → **Link erhalten** (Ablauf optional)

#### 5. VPN-Konfiguration Herunterladen
1. **Mein VPN**-Tab
2. Siehe: OpenVPN / WireGuard Konfigurationen
3. **Herunterladen** klicken → `.ovpn` oder `.conf`
4. In VPN-Client importieren (OpenVPN Connect, WireGuard App)

#### 6. 2FA Einrichten (TOTP)
1. **CRX 2FA**-Tab → **Methode hinzufügen** → **TOTP App**
2. QR-Code mit Google Authenticator / Authy / Microsoft Authenticator scannen
3. 6-stelligen Code aus App eingeben
4. **Speichern** → **Backup-Codes generiert** → **HERUNTERLADEN & SICHER AUFBEWAHREN**

#### 7. Zweites 2FA-Gerät Hinzufügen
1. **CRX 2FA**-Tab → **Methode hinzufügen**
2. Mit neuem Handy/Tablet scannen
3. Mit Code vom neuen Gerät verifizieren
4. Beide Geräte funktionieren nun unabhängig

#### 8. Backup-Codes Neu Generieren
1. **CRX 2FA**-Tab → **Backup-Codes neu generieren**
2. **Bestätigen** → Alte Codes ungültig
3. **Neue Codes sofort herunterladen**

---

### Tastaturkürzel
| Taste | Aktion |
|-------|--------|
| `Tab` | Zwischen Feldern navigieren |
| `Enter` | Formular speichern (wenn fokussiert) |
| `Esc` | Bearbeitung abbrechen / Dialog schließen |

---

### Häufige Probleme
| Problem | Lösung |
|---------|--------|
| Passwort abgelehnt | Anforderungen prüfen: 8 Zeichen, Groß, Klein, Zahl, Sonderzeichen |
| 2FA-Code ungültig | Zeit auf Handy synchronisieren (Einstellungen → Auto Datum/Zeit) |
| VPN-Config funktioniert nicht | Frische Config herunterladen, Serveradresse prüfen |
| Datei-Upload fehlschlägt | Größe (< 50MB), Dateityp, Speicherquota prüfen |
| Sprache ändert sich nicht | Browser-Cache leeren, App neu laden |