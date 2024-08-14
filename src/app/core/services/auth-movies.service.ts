import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment.ts.service';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiResponse, GenreResponse } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class AuthMoviesService {

  private apiMovies = `${environment.apiUrl}discover/movie`;
  private apiGenre = `${environment.apiUrl}genre/movie/list`;
  private apiSearch = `${environment.apiUrl}search/movie`;


  constructor(private http: HttpClient) { }

  getMovies(language: string, page: number, genreIds: number[] = []): Observable<ApiResponse> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYjE2NTVjZTg4NWUwODI1Y2IwOWMxYTY4NGUwNDE4YSIsIm5iZiI6MTcyMjYwNzYxNy4yNDU4ODcsInN1YiI6IjY2YWNlNmY1OTg2OTU0NDE4YjI4YzYyMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.W3HvAYfw6iBonXTuk2bIcvucPzZz2VBb82zvK1Ipv3U',
      'accept': 'application/json'
    });

    let params = new HttpParams()
      .set('language', language)
      .set('page', page.toString());

    if (genreIds.length > 0) {
      params = params.set('with_genres', genreIds.join(','));
    }

    return this.http.get<ApiResponse>(this.apiMovies, { headers, params })
  }

  searchMovies(query: string, language: string, page: number): Observable<ApiResponse> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYjE2NTVjZTg4NWUwODI1Y2IwOWMxYTY4NGUwNDE4YSIsIm5iZiI6MTcyMjYwNzYxNy4yNDU4ODcsInN1YiI6IjY2YWNlNmY1OTg2OTU0NDE4YjI4YzYyMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.W3HvAYfw6iBonXTuk2bIcvucPzZz2VBb82zvK1Ipv3U',
      'accept': 'application/json'
    });

    const params = new HttpParams()
      .set('query', query)
      .set('language', language)
      .set('page', page.toString())


    return this.http.get<ApiResponse>(this.apiSearch, { headers, params })
  }

  getGenre(language: string): Observable<GenreResponse> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYjE2NTVjZTg4NWUwODI1Y2IwOWMxYTY4NGUwNDE4YSIsIm5iZiI6MTcyMjYwNzYxNy4yNDU4ODcsInN1YiI6IjY2YWNlNmY1OTg2OTU0NDE4YjI4YzYyMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.W3HvAYfw6iBonXTuk2bIcvucPzZz2VBb82zvK1Ipv3U',
      'accept': 'application/json'
    });

    const params = new HttpParams().set('language', language);

    return this.http.get<GenreResponse>(this.apiGenre, { headers, params })
  }

}
