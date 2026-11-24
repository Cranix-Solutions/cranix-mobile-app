import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { LanguageService } from 'src/app/services/language.service';
import { CustomTranslationService, TranslationOverrides } from 'src/app/services/custom-translation.service';
import { GenericObjectService } from 'src/app/services/generic-object.service';

interface TranslationRow {
  key: string;
  base: string;
  override: string;
}

@Component({
  standalone: false,
  selector: 'cranix-system-translations',
  templateUrl: './system-translations.component.html',
  styleUrls: ['./system-translations.component.scss'],
})
export class SystemTranslationsComponent implements OnInit, OnDestroy {

  languages: { text: string, value: string }[] = [];
  language: string;
  rows: TranslationRow[] = [];
  filtered: TranslationRow[] = [];
  filter: string = '';
  onlyOverridden: boolean = false;
  overrideCount: number = 0;
  private base: { [key: string]: any } = {};
  /** Pending debounced save per row key. */
  private saveTimers: { [key: string]: any } = {};

  constructor(
    public languageService: LanguageService,
    public objectService: GenericObjectService,
    public customTranslation: CustomTranslationService,
    private alertController: AlertController
  ) {
    this.languages = this.languageService.getLanguages();
    this.language = this.languageService.language || 'de';
  }

  ngOnInit() {
    this.load();
  }

  ngOnDestroy() {
    this.clearSaveTimers();
  }

  onLanguageChange() {
    this.clearSaveTimers();
    this.load();
  }

  private async load() {
    // Make sure the stored overrides were read before the rows are built.
    await this.customTranslation.ready;
    this.customTranslation.getBaseTranslations(this.language).subscribe({
      next: (base) => {
        this.base = base || {};
        this.buildRows();
      },
      error: (err) => {
        console.log('SystemTranslations: could not load base translations', err);
        this.base = {};
        this.buildRows();
      }
    });
  }

  private buildRows() {
    const overrides: TranslationOverrides = this.customTranslation.getOverrides(this.language);
    this.rows = Object.keys(this.base).sort().map((key) => ({
      key: key,
      base: this.asText(this.base[key]),
      override: overrides[key] !== undefined ? overrides[key] : ''
    }));
    this.applyFilter();
  }

  private asText(value: any): string {
    if (value === null || value === undefined) {
      return '';
    }
    return typeof value === 'string' ? value : JSON.stringify(value);
  }

  applyFilter() {
    const filter = (this.filter || '').toLowerCase();
    this.filtered = this.rows.filter((row) => {
      if (this.onlyOverridden && !row.override) {
        return false;
      }
      if (!filter) {
        return true;
      }
      return row.key.toLowerCase().indexOf(filter) > -1 ||
        row.base.toLowerCase().indexOf(filter) > -1;
    });
    this.overrideCount = this.rows.filter((row) => row.override).length;
  }

  /**
   * Called while typing in the override field. The value is stored in the local
   * storage shortly after the user stopped typing (debounced) and is merged
   * into the running translation immediately.
   */
  onOverride(row: TranslationRow, value: any) {
	  console.log(row)
    row.override = value ? String(value) : '';
    this.overrideCount = this.rows.filter((r) => r.override).length;
    this.clearSaveTimer(row.key);
    if (!row.override) {
      // Empty value removes the override immediately.
      this.customTranslation.removeOverride(this.language, row.key);
      return;
    }
    this.saveTimers[row.key] = setTimeout(() => {
      delete this.saveTimers[row.key];
      this.customTranslation.setOverride(this.language, row.key, row.override);
    }, 400);
  }

  reset(row: TranslationRow) {
    this.clearSaveTimer(row.key);
    row.override = '';
    this.overrideCount = this.rows.filter((r) => r.override).length;
    this.customTranslation.removeOverride(this.language, row.key);
  }

  private clearSaveTimer(key: string) {
    if (this.saveTimers[key]) {
      clearTimeout(this.saveTimers[key]);
      delete this.saveTimers[key];
    }
  }

  private clearSaveTimers() {
    for (const key of Object.keys(this.saveTimers)) {
      clearTimeout(this.saveTimers[key]);
    }
    this.saveTimers = {};
  }

  async clearAll() {
    const alert = await this.alertController.create({
      header: this.languageService.trans('Confirm!'),
      message: this.languageService.trans('Do you realy want to delete?'),
      buttons: [
        {
          text: this.languageService.trans('Cancel'),
          role: 'cancel',
        }, {
          text: 'OK',
          handler: () => {
            this.clearSaveTimers();
            this.customTranslation.clearAll(this.language).then(() => {
              this.rows.forEach((row) => row.override = '');
              this.applyFilter();
            });
          }
        }
      ]
    });
    await alert.present();
  }

  exportFile() {
    const data = this.customTranslation.export(this.language);
    const blob = new Blob([data], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${this.language}.json`;
    link.click();
    window.URL.revokeObjectURL(url);
    this.objectService.okMessage(this.languageService.trans('The file was downloaded.'));
  }

  importFile(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return;
    }
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.customTranslation.importFromJson(this.language, String(reader.result)).then(() => {
        this.load();
        this.objectService.okMessage(this.languageService.trans('The import was done successfully.'));
      }).catch((err) => {
        this.objectService.errorMessage(err.message || String(err));
      });
    };
    reader.readAsText(file);
    input.value = '';
  }

  trackByKey(index: number, row: TranslationRow) {
    return row.key;
  }
}
