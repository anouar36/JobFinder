import { Injectable } from '@angular/core';
import { FavoriteOffer } from '../models/models';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Favorites {

  private  baseUrl = 'http://localhost:3000';
  private  favoritesUrl = `${this.baseUrl}/favoritesOffers`;
  
  constructor(private http: HttpClient) {}

   getFavoritesByUser(userId: string): Observable<FavoriteOffer[]> {
    return this.http.get<FavoriteOffer[]>(`${this.favoritesUrl}?userId=${userId}`);
  }

  addFavorite(payload: Omit<FavoriteOffer, 'id'>): Observable<FavoriteOffer> {
    return this.http.post<FavoriteOffer>(this.favoritesUrl, payload);
  }

  removeFavorite(favoriteId: number): Observable<void> {
    return this.http.delete<void>(`${this.favoritesUrl}/${favoriteId}`);
  }

  checkExists(userId: string, offerId: number): Observable<boolean> {
    return this.http
      .get<FavoriteOffer[]>(`${this.favoritesUrl}?userId=${userId}&offerId=${offerId}`)
      .pipe(map((items) => items.length > 0));
  }

  getFavoriteIdByOffer(userId: string, offerId: number): Observable<number | null> {
    return this.http
      .get<FavoriteOffer[]>(`${this.favoritesUrl}?userId=${userId}&offerId=${offerId}`)
      .pipe(map((items) => (items.length ? (items[0].id ?? null) : null)));
  }

    

}
