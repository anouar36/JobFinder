import { createReducer, on } from '@ngrx/store';
import { FavoriteOffer } from '../../core/models/models';
import * as FavoritesActions from './favorites.actions';

export interface FavoritesState {
  favorites: FavoriteOffer[];
  loading: boolean;
  error: string | null;
}

export const initialState: FavoritesState = {
  favorites: [],
  loading: false,
  error: null,
};

export const favoritesReducer = createReducer(
  initialState,

  // LOAD
  on(FavoritesActions.loadFavorites, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(FavoritesActions.loadFavoritesSuccess, (state, { favorites }) => ({
    ...state,
    loading: false,
    favorites,
  })),
  on(FavoritesActions.loadFavoritesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // ADD
  on(FavoritesActions.addFavorite, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(FavoritesActions.addFavoriteSuccess, (state, { favorite }) => ({
    ...state,
    loading: false,
    favorites: [...state.favorites, favorite],
  })),
  on(FavoritesActions.addFavoriteFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // REMOVE
  on(FavoritesActions.removeFavorite, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(FavoritesActions.removeFavoriteSuccess, (state, { favoriteId }) => ({
    ...state,
    loading: false,
    favorites: state.favorites.filter((f) => f.id !== favoriteId),
  })),
  on(FavoritesActions.removeFavoriteFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);