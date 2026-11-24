# Custom translations

Place customer specific translations in this folder.

* `de.json` – overrides for German
* `en.json` – overrides for English

A file only has to contain the keys the customer wants to change, for example:

```json
{
    "Devices": "Rechner",
    "Rooms": "Klassenzimmer"
}
```

These values are merged on top of the translations delivered with the app
(`../de.json` / `../en.json`). Keys which are not listed keep the delivered
value.

## How it works

The app merges the translations with the following precedence (later wins):

1. `assets/i18n/<lang>.json` – delivered with the app
2. `assets/i18n/custom/<lang>.json` – this folder
3. Overrides made in the app under **System → Custom translations** (stored in
   the browser of the user)

The screen under **System → Custom translations** can be used to build such a
file and to export it (button *Export*). Deploy the exported file as
`assets/i18n/custom/<lang>.json` so all users of the installation get the
customisation.

## Keeping the customisations over an update

This folder is part of the application package and may be replaced when the app
is updated. To keep the customisations, serve this folder from a persistent
location outside the packaged application (see `CUSTOM_I18N_PREFIXES` in
`src/app/services/custom-translate-loader.ts`), or re-deploy the files after an
update.
