import { ApplicationConfig, provideBrowserGlobalErrorListeners, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { jobsReducer } from './store/jobs/jobs.reducer';
import { JobsEffects } from './store/jobs/jobs.effects';
import { FavoritesEffects } from './store/favorites/favorites.effects';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { favoritesReducer } from './store/favorites/favorites.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    provideStore({ jobs: jobsReducer, favorites: favoritesReducer }),
    provideEffects([JobsEffects, FavoritesEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
    
  ]
};
