import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
// Update the import to match the actual exported member from './app/app'
import { AppComponent } from './app/app';
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));