import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { BaseRepository } from './data-access/BaseRepository';

if (environment.production) {
  enableProdMode();
}

BaseRepository.initDB();

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
