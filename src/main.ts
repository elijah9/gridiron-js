import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { initDb } from './data-access/Database.service';

if (environment.production) {
  enableProdMode();
}

initDb();

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
