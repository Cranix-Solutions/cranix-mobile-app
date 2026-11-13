import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loading: HTMLIonLoadingElement | null = null;
  private busy = false;

  constructor(
    private loadingController: LoadingController,
    private languageService: LanguageService
  ) { }

  async show(): Promise<boolean> {
    if (this.busy) {
      return false;
    }
    this.busy = true;
    try {
      this.loading = await this.loadingController.create({
        message: this.languageService.trans('Request was sent. Please be patient!'),
        spinner: 'circles',
        backdropDismiss: false,
        translucent: true
      });
      await this.loading.present();
      return true;
    } catch (err) {
      this.busy = false;
      this.loading = null;
      return false;
    }
  }

  async hide(): Promise<void> {
    if (!this.loading) {
      return;
    }
    const loading = this.loading;
    this.loading = null;
    this.busy = false;
    try {
      await loading.dismiss();
    } catch (err) {
      // The overlay may already be dismissed by Ionic.
    }
  }
}
