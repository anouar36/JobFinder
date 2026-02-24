import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FavoritesState } from './favorites.reducer';
import { FavoriteOffer } from '../../core/models/models';

export const selectFavoritesState =
  createFeatureSelector<FavoritesState>('favorites');

export const selectFavorites = createSelector(
  selectFavoritesState,
  (state) => state.favorites
);

export const selectFavoritesLoading = createSelector(
  selectFavoritesState,
  (state) => state.loading
);

export const selectFavoritesError = createSelector(
  selectFavoritesState,
  (state) => state.error
);

export const selectIsOfferFavorite = (offerId: number) =>
  createSelector(selectFavorites, (favorites) =>
    favorites.some((f) => f.offerId === offerId)
  );

// export const selectFavoriteIdByOfferId = (offerId: number) =>
//   createSelector(selectFavorites, (favorites) => {
//     const found = favorites.find((f) => f.offerId === offerId);
//     return found?.id ?? null;
//   });


