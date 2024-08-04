// language.service.ts

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguage: string = 'en';
  languageChanged: Subject<string> = new Subject<string>();

  constructor() { }

  getCurrentLanguage(): string {
    return this.currentLanguage;

  }

  setCurrentLanguage(lang: string): void {
    this.currentLanguage = lang;
    this.languageChanged.next(lang);
  }
}
