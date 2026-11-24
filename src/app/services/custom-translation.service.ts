import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { TranslateService, TranslationObject } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { I18N_PREFIX, I18N_SUFFIX } from './custom-translate-loader';

export const CUSTOM_TRANSLATIONS_KEY = 'CUSTOM_TRANSLATIONS';

export interface TranslationOverrides {
  [key: string]: string;
}

/**
 * Manages the translations a customer changed inside the app. The overrides are
 * kept per language in the local storage of the browser and are merged on top
 * of the loaded (delivered + custom file) translations.
 *
 * Precedence of the translations:
 *   delivered file  <  assets/i18n/custom/<lang>.json  <  local overrides
 */
@Injectable({
  providedIn: 'root'
})
export class CustomTranslationService {

  private overrides: { [lang: string]: TranslationOverrides } = {};
  /** Resolves once the stored overrides were read from the local storage. */
  public ready: Promise<void>;

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private translate: TranslateService
  ) {
    // Apply the stored overrides after the base translation of a language was
    // loaded. onLangChange is emitted once a language (and its files) is ready.
    this.translate.onLangChange.subscribe((event) => {
      this.apply(event.lang);
    });
    this.ready = this.init();
  }

  private async init(): Promise<void> {
    await this.storage.create();
    const stored = await this.storage.get(CUSTOM_TRANSLATIONS_KEY);
    if (stored) {
      try {
        this.overrides = typeof stored === 'string' ? JSON.parse(stored) : stored;
      } catch (error) {
        console.log('CustomTranslationService: invalid stored overrides', error);
        this.overrides = {};
      }
    }
    // If the current language was already loaded before the storage was ready
    // apply the overrides now, otherwise onLangChange will do it.
    if (this.translate.currentLang) {
      this.apply(this.translate.currentLang);
    }
  }

  /**
   * Merges the overrides of the given language over the loaded translations.
   * Does nothing until the base translation is available.
   */
  apply(lang: string): void {
    if (!lang) {
      return;
    }
    const l = lang.toLowerCase();
    const overrides = this.overrides[l];
    if (!overrides || Object.keys(overrides).length === 0) {
      return;
    }
    if (!this.translate.translations[l]) {
      // Base translation not loaded yet, retry when the language changes.
      return;
    }
    this.translate.setTranslation(l, overrides, true);
  }

  getOverrides(lang: string): TranslationOverrides {
    return this.overrides[lang?.toLowerCase()] || {};
  }

  hasOverride(lang: string, key: string): boolean {
    return this.getOverrides(lang)[key] !== undefined;
  }

  /**
   * Base (delivered) translations of a language, used by the editor to show the
   * original value next to the override.
   */
  getBaseTranslations(lang: string): Observable<TranslationObject> {
    return this.http.get<TranslationObject>(`${I18N_PREFIX}${lang}${I18N_SUFFIX}`);
  }

  /**
   * Sets or removes (empty value) a single override and applies it immediately.
   */
  async setOverride(lang: string, key: string, value: string): Promise<void> {
    const l = lang.toLowerCase();
    if (!this.overrides[l]) {
      this.overrides[l] = {};
    }
    if (value === null || value === undefined || value.trim() === '') {
      this.removeOverride(lang, key);
      return;
    }
    this.overrides[l][key] = value;
    this.apply(l);
    await this.persist();
  }

  /**
   * Removes a single override and restores the original value by reloading the
   * language file from the loader.
   */
  async removeOverride(lang: string, key: string): Promise<void> {
    const l = lang.toLowerCase();
    if (this.overrides[l]) {
      delete this.overrides[l][key];
    }
    await this.persist();
    await this.reload(l);
  }

  /**
   * Removes all overrides of a language.
   */
  async clearAll(lang: string): Promise<void> {
    this.overrides[lang.toLowerCase()] = {};
    await this.persist();
    await this.reload(lang);
  }

  /**
   * Returns the overrides of a language as pretty printed JSON, ready to be
   * deployed as assets/i18n/custom/<lang>.json.
   */
  export(lang: string): string {
    const overrides = this.getOverrides(lang);
    const sorted: TranslationOverrides = {};
    for (const key of Object.keys(overrides).sort()) {
      sorted[key] = overrides[key];
    }
    return JSON.stringify(sorted, null, 4);
  }

  /**
   * Imports overrides from JSON. Accepts either a flat object or an object
   * keyed by language. Existing overrides are merged.
   */
  async importFromJson(lang: string, json: string): Promise<void> {
    let parsed: any;
    try {
      parsed = JSON.parse(json);
    } catch (error) {
      throw new Error('The file does not contain valid JSON.');
    }
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      throw new Error('The file does not contain a translation object.');
    }
    const l = lang.toLowerCase();
    if (parsed[l] && typeof parsed[l] === 'object' && !Array.isArray(parsed[l])) {
      parsed = parsed[l];
    }
    if (!this.overrides[l]) {
      this.overrides[l] = {};
    }
    for (const key of Object.keys(parsed)) {
      const value = parsed[key];
      if (typeof value === 'string') {
        this.overrides[l][key] = value;
      }
    }
    await this.persist();
    this.apply(l);
  }

  private persist(): Promise<any> {
    return this.storage.set(CUSTOM_TRANSLATIONS_KEY, JSON.stringify(this.overrides));
  }

  /**
   * Reloads a language from the loader and re-applies the remaining overrides.
   */
  private reload(lang: string): Promise<void> {
    const l = lang.toLowerCase();
    return new Promise<void>((resolve) => {
      this.translate.reloadLang(l).subscribe({
        next: () => { this.apply(l); resolve(); },
        error: () => { this.apply(l); resolve(); }
      });
    });
  }
}
