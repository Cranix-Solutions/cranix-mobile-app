# Cranix Core: System Administration / Cranix Kern: Systemverwaltung

## English

### Overview

The **System** page (`/pages/cranix/system`) groups the server administration
tasks. Requires `system.status` ACL.

### Tabs

| Tab | Purpose |
|-----|---------|
| **System status** | Service/status overview |
| **System services** | Start/stop/enable services |
| **Server configuration** | Edit server configuration values |
| **Acls** | Manage groups, users and system ACLs |
| **Addon modules** | Manage addon modules |
| **Mailserver** | Mailserver settings (requires `system.mailserver`) |
| **Custom translations** | Change the texts of the app |

### Custom translations

Some customers want the app to use their own wording (for example
"Devices" → "Rechner"). The **Custom translations** tab allows changing any
text of the app without changing the app itself.

#### How the translations are built

Every text is looked up with the following precedence (the last one wins):

1. `assets/i18n/<lang>.json` – delivered with the app
2. `assets/i18n/custom/<lang>.json` – customer specific file on the server
3. Changes made in the **Custom translations** screen (stored in the browser)

So a text only has to be defined where it should differ from the delivered
value.

#### Change a text in the app

1. Open **System → Custom translations**
2. Select the **Language** (English/German)
3. Find the text with the **Search** field (searches key and current value)
4. Enter the new text in the field next to the entry
5. The change is applied immediately for the selected language

Use **Show only overwritten** to see only the texts you already changed. The
button with the **x** on a row restores the delivered text. **Clear all**
removes all changes of the selected language.

#### Distribute the changes to all users

Changes made in the screen are stored in the browser only. To apply them for
all users of the installation:

1. Click **Export** → a JSON file (`de.json` or `en.json`) is downloaded
2. Deploy the file as `assets/i18n/custom/<lang>.json` on the server
3. Reload the app for all users

With **Import** an existing file (for example from another installation) can be
loaded into the screen and edited further.

#### File format

The custom file only contains the changed keys:

```json
{
    "Devices": "Rechner",
    "Rooms": "Klassenzimmer"
}
```

#### Note on updates

The folder `assets/i18n/custom/` is part of the application package and can be
replaced by an update. To keep the customisations, serve the folder from a
persistent location outside the packaged application (see
`CUSTOM_I18N_PREFIXES` in `src/app/services/custom-translate-loader.ts`) or
re-deploy the file after an update.

---

### Permissions Reference

| Action | Required ACL |
|--------|-------------|
| Open System page | `system.status` |
| Custom translations | `system.status` |
| Mailserver tab | `system.mailserver` |

---

### Common Issues

| Issue | Solution |
|-------|----------|
| A changed text is not visible | Make sure the edited language matches the app language |
| Text still delivered after delete | Reload the page, the language file is reloaded |
| Changes lost after update | Deploy the exported file as `assets/i18n/custom/<lang>.json` |

---

## Deutsch

### Übersicht

Die **System**-Seite (`/pages/cranix/system`) bündelt die
Server-Verwaltungsaufgaben. Benötigt `system.status` ACL.

### Tabs

| Tab | Zweck |
|-----|-------|
| **System status** | Dienst-/Statusübersicht |
| **System services** | Dienste starten/stoppen/aktivieren |
| **Server configuration** | Server-Konfigurationswerte bearbeiten |
| **Acls** | Gruppen, Benutzer und System-ACLs verwalten |
| **Addon modules** | Addon-Module verwalten |
| **Mailserver** | Mailserver-Einstellungen (benötigt `system.mailserver`) |
| **Custom translations** | Texte der App ändern |

### Eigene Übersetzungen

Manche Kunden möchten eigene Formulierungen verwenden (zum Beispiel
"Devices" → "Rechner"). Der Tab **Custom translations** erlaubt es, jeden Text
der App zu ändern, ohne die App selbst zu verändern.

#### Wie die Übersetzungen zusammengesetzt werden

Jeder Text wird mit folgender Reihenfolge gesucht (der letzte Treffer gewinnt):

1. `assets/i18n/<lang>.json` – mit der App ausgeliefert
2. `assets/i18n/custom/<lang>.json` – kundenspezifische Datei auf dem Server
3. Änderungen aus dem Bildschirm **Custom translations** (im Browser gespeichert)

Ein Text muss also nur dort definiert werden, wo er vom ausgelieferten Wert
abweichen soll.

#### Einen Text in der App ändern

1. **System → Custom translations** öffnen
2. **Language** wählen (Englisch/Deutsch)
3. Text über das **Search**-Feld suchen (durchsucht Schlüssel und aktuellen Wert)
4. Neuen Text im Feld neben dem Eintrag eingeben
5. Die Änderung wird sofort für die gewählte Sprache angewendet

Mit **Show only overwritten** werden nur die bereits geänderten Texte angezeigt.
Die Schaltfläche mit dem **x** in einer Zeile stellt den ausgelieferten Text
wieder her. **Clear all** entfernt alle Änderungen der gewählten Sprache.

#### Änderungen für alle Benutzer bereitstellen

Änderungen aus dem Bildschirm werden nur im Browser gespeichert. Um sie für alle
Benutzer der Installation anzuwenden:

1. **Export** klicken → eine JSON-Datei (`de.json` oder `en.json`) wird geladen
2. Die Datei als `assets/i18n/custom/<lang>.json` auf dem Server ablegen
3. Die App für alle Benutzer neu laden

Mit **Import** kann eine vorhandene Datei (zum Beispiel aus einer anderen
Installation) in den Bildschirm geladen und weiterbearbeitet werden.

#### Dateiformat

Die kundenspezifische Datei enthält nur die geänderten Schlüssel:

```json
{
    "Devices": "Rechner",
    "Rooms": "Klassenzimmer"
}
```

#### Hinweis zu Updates

Der Ordner `assets/i18n/custom/` ist Teil des Anwendungspakets und kann durch
ein Update ersetzt werden. Um die Anpassungen zu behalten, den Ordner von einem
dauerhaften Ort außerhalb des Pakets ausliefern (siehe `CUSTOM_I18N_PREFIXES` in
`src/app/services/custom-translate-loader.ts`) oder die Datei nach einem Update
neu bereitstellen.

---

### Berechtigungs-Referenz

| Aktion | Erforderliche ACL |
|--------|-------------------|
| System-Seite öffnen | `system.status` |
| Eigene Übersetzungen | `system.status` |
| Mailserver-Tab | `system.mailserver` |

---

### Häufige Probleme

| Problem | Lösung |
|---------|--------|
| Geänderter Text nicht sichtbar | Prüfen, ob die bearbeitete Sprache der App-Sprache entspricht |
| Text nach Löschen weiterhin ausgeliefert | Seite neu laden, die Sprachdatei wird neu geladen |
| Änderungen nach Update verloren | Exportierte Datei als `assets/i18n/custom/<lang>.json` bereitstellen |
