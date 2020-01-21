import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { TeamRepository } from './data-access/TeamRepository';

if (environment.production) {
  enableProdMode();
}

TeamRepository.initDB();

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
