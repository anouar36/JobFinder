import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import * as FavoritesActions from '../../store/favorites/favorites.actions';
import {
  selectFavorites,
  selectFavoritesLoading,
  selectFavoritesError,
} from '../../store/favorites/favorites.selectors';
import { FavoriteOffer } from '../../core/models/models';

/**
 * FavoritesComponent (beginner friendly)
 *
 * - Loads favorites from json-server: GET /favoritesOffers?userId=...
 * - Shows the list
 * - Allows removing a favorite: DELETE /favoritesOffers/:id
 */
@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css',
})
export class FavoritesComponent implements OnInit {
  private store = inject(Store);
  private destroyRef = inject(DestroyRef);

  // Selectors from NgRx Store
  favorites$ = this.store.select(selectFavorites);
  loading$ = this.store.select(selectFavoritesLoading);
  error$ = this.store.select(selectFavoritesError);

  // We read the logged user from localStorage (same as Auth service)
  private getUserIdString(): string | null {
    const raw = localStorage.getItem('userLogining');
    if (!raw) return null;

    try {
      const user = JSON.parse(raw);
      const id = user?.id;
      if (id === undefined || id === null) return null;
      return String(id);
    } catch {
      return null;
    }
  }

  ngOnInit(): void {
    // 1) get current user id
    const userId = this.getUserIdString();
    if (!userId) {
      // No user => nothing to load
      return;
    }

    // 2) load favorites for this user
    this.store.dispatch(FavoritesActions.loadFavorites({ userId }));

    // (Optional) debug: see favorites in console
    this.favorites$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((favs) => {
      console.log('Favorites loaded:', favs);
    });
  }

  removeFavorite(item: FavoriteOffer) {
    // json-server requires numeric id to delete
    if (item.id == null) return;
    this.store.dispatch(FavoritesActions.removeFavorite({ favoriteId: item.id }));
  }

  openOffer(item: FavoriteOffer) {
    if (!item.url) return;
    window.open(item.url, '_blank');
  }
}
