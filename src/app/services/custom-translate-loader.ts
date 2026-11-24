import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

/**
 * Prefix of the translation files delivered with the app.
 */
export const I18N_PREFIX = 'assets/i18n/';
export const I18N_SUFFIX = '.json';

/**
 * Prefixes of the customer specific translation files. A file placed in one of
 * these folders only has to contain the keys the customer wants to change; it
 * is merged on top of the delivered translation. Files are merged in the given
 * order, so later entries win.
 *
 * To let the customisations survive an app update the folder can be served from
 * a persistent location outside the packaged application.
 */
export const CUSTOM_I18N_PREFIXES: string[] = [
  'assets/i18n/custom/'
];

/**
 * Loads the translations delivered with the app and merges the optional
 * customer specific translations on top of them.
 */
export class CrxTranslateLoader extends TranslateHttpLoader {

  constructor(
    private httpClient: HttpClient,
    prefix: string = I18N_PREFIX,
    suffix: string = I18N_SUFFIX
  ) {
    super(httpClient, prefix, suffix);
  }

  getTranslation(lang: string): Observable<any> {
    const requests: Observable<any>[] = [
      this.loadFrom(this.prefix, lang)
    ];
    for (const customPrefix of CUSTOM_I18N_PREFIXES) {
      requests.push(this.loadFrom(customPrefix, lang));
    }
    return forkJoin(requests).pipe(
      map((parts) => parts.reduce((merged, part) => this.merge(merged, part), {}))
    );
  }

  /**
   * Loads a single translation file. A missing file is treated as an empty
   * translation so that e.g. an absent custom file does not break the load.
   */
  private loadFrom(prefix: string, lang: string): Observable<any> {
    return this.httpClient.get<any>(`${prefix}${lang}${this.suffix}`).pipe(
      catchError(() => of({}))
    );
  }

  /**
   * Merges the source translation over the target one. Only the keys present in
   * source are taken over, nested objects are merged recursively.
   */
  private merge(target: any, source: any): any {
    const result: any = { ...(target || {}) };
    for (const key of Object.keys(source || {})) {
      const value = source[key];
      if (value !== null && typeof value === 'object' && !Array.isArray(value) &&
          result[key] !== null && typeof result[key] === 'object' && !Array.isArray(result[key])) {
        result[key] = this.merge(result[key], value);
      } else {
        result[key] = value;
      }
    }
    return result;
  }
}
