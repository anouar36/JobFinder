import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, of, withLatestFrom } from 'rxjs';

import * as FavoritesActions from './favorites.actions';
import { Favorites } from '../../core/services/favorites';
import { selectFavorites } from './favorites.selectors';
import { FavoriteOffer } from '../../core/models/models';

@Injectable()
export class FavoritesEffects {
  private actions$ = inject(Actions);
  private favoritesService = inject(Favorites);
  private store = inject(Store);

  /** ✅ LOAD favorites */
  loadFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FavoritesActions.loadFavorites),
      mergeMap(({ userId }) =>
        this.favoritesService.getFavoritesByUser(userId).pipe(
          map((favorites) => FavoritesActions.loadFavoritesSuccess({ favorites })),
          catchError((err) =>
            of(
              FavoritesActions.loadFavoritesFailure({
                error: err?.message || 'Failed to load favorites',
              })
            )
          )
        )
      )
    )
  );

  /** ✅ ADD favorite مع منع التكرار */
  addFavorite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FavoritesActions.addFavorite),
      withLatestFrom(this.store.select(selectFavorites)),
      mergeMap(([{ favorite }, favorites]) => {
        const exists = favorites.some(
          (f: FavoriteOffer) => f.userId === favorite.userId && f.offerId === favorite.offerId
        );

        if (exists) {
          return of(
            FavoritesActions.addFavoriteFailure({
              error: 'Offer already in favorites',
            })
          );
        }

        return this.favoritesService.addFavorite(favorite).pipe(
          map((created) => FavoritesActions.addFavoriteSuccess({ favorite: created })),
          catchError((err) =>
            of(
              FavoritesActions.addFavoriteFailure({
                error: err?.message || 'Failed to add favorite',
              })
            )
          )
        );
      })
    )
  );

  /** ✅ REMOVE favorite */
  removeFavorite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FavoritesActions.removeFavorite),
      mergeMap(({ favoriteId }) =>
        this.favoritesService.removeFavorite(favoriteId).pipe(
          map(() => FavoritesActions.removeFavoriteSuccess({ favoriteId })),
          catchError((err) =>
            of(
              FavoritesActions.removeFavoriteFailure({
                error: err?.message || 'Failed to remove favorite',
              })
            )
          )
        )
      )
    )
  );
}