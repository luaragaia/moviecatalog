import { Component, ViewChild } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { ApiResponse } from '../../core/models/model';
import { AuthMoviesService } from '../../core/services/auth-movies.service';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LocalDateTimePipe } from '../../shared/pipes/local-date.pipe';
import { ErrorTransformPipe } from "../../shared/pipes/error-transform.pipe";
import { ModalService } from '../../core/services/modal.service';
import { ErrorAlertComponent } from '../../shared/modals/error-alert/error-alert.component';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NgxSpinnerModule, DatePipe, LocalDateTimePipe, ErrorTransformPipe, ErrorAlertComponent, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  movies$!: Observable<ApiResponse>;
  genres: { id: number; name: string; active: boolean }[] = [];
  language: string = 'pt';
  searchQuery: string = '';

  pageStart: number = 1;
  pageSize: number = 5;
  currentPage: number = 1;
  totalPages: number = 1;

  noMovies: boolean = false;

  skeletonItems: any[] = Array(20);

  @ViewChild(ErrorAlertComponent) errorAlert!: ErrorAlertComponent;

  constructor(private movieService: AuthMoviesService, private modalService: ModalService) {}

  ngOnInit(): void {
    this.loadMovies(this.currentPage);
    this.loadGenres(this.language);

  }

  loadMovies(page: number): void {
    this.currentPage = page;
    if (this.searchQuery.trim().length > 0) {
      this.searchMovies(true);
    } else {
      const activeGenreIds = this.genres.filter(genre => genre.active).map(genre => genre.id);
      this.movies$ = this.movieService.getMovies(this.language, Math.min(page, 500), activeGenreIds).pipe(
        catchError(error => {
          console.error('Erro ao carregar os filmes', error);
          this.modalService.showError(error.status);
          const defaultResponse: ApiResponse = {
            results: [],
            total_pages: 0,
            dates: {
              maximum: '',
              minimum: ''
            },
            page: 0,
            total_results: 0
          };
          return of(defaultResponse);
        })
      );
      this.movies$.subscribe(response => {
        this.totalPages = Math.min(response.total_pages, 500);
        this.noMovies = response.results.length === 0;
      });
    }
  }



  loadGenres(language: string): void {
    this.movieService.getGenre(language)
      .pipe(
        catchError((error) => {
          console.error('HomeComponent: loadGenres error:', error);
          this.modalService.showError('Erro ao carregar os gêneros, mas você pode acessar o catálogo de filmes mesmo assim.');
          return of({ genres: [] });
        })
      )
      .subscribe({
        next: (response) => {
          this.genres = response.genres.map(genre => ({ ...genre, active: false }));
        },
      });
  }

  toggleGenre(genre: { id: number; name: string; active: boolean }): void {
    genre.active = !genre.active;
    this.searchQuery = '';
    this.currentPage = 1;
    this.pageStart = 1;
    this.loadMovies(this.currentPage);
  }

  setPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = Math.min(page, 500);
      this.loadMovies(this.currentPage);
    }
  }


  searchMovies(isPaging: boolean = false): void {
    if (this.searchQuery.trim().length > 0) {
      if (!isPaging) {

        this.genres = this.genres.map(genre => ({ ...genre, active: false }));
        this.currentPage = 1;
        this.pageStart = 1;
      }

      this.movies$ = this.movieService.searchMovies(this.searchQuery, this.language, this.currentPage).pipe(
        catchError(error => {
          console.error('Erro ao buscar os filmes', error);
          this.modalService.showError(error.status);
          const defaultResponse: ApiResponse = {
            results: [],
            total_pages: 0,
            dates: {
              maximum: '',
              minimum: ''
            },
            page: 0,
            total_results: 0
          };
          return of(defaultResponse);
        })
      );
      this.movies$.subscribe(response => {
        this.totalPages = Math.min(response.total_pages, 500);
        this.noMovies = response.results.length === 0;
      });
    } else {

      this.genres = this.genres.map(genre => ({ ...genre, active: false }));
      this.currentPage = 1;
      this.pageStart = 1;
      this.loadMovies(this.currentPage);
    }
  }


  nextPage(): void {
    if (this.pageStart + this.pageSize <= this.totalPages) {
      this.pageStart = Math.min(this.pageStart + this.pageSize, 500 - this.pageSize + 1);
    }
  }

  backPage(): void {
    if (this.pageStart - this.pageSize >= 1) {
      this.pageStart -= this.pageSize;
    }
  }

  lastPage(): void {
    this.pageStart = Math.max(Math.min(this.totalPages - this.pageSize + 1, 500 - this.pageSize + 1), 1);
    this.setPage(Math.max(Math.min(this.totalPages - this.pageSize + 1, 500 - this.pageSize + 1), 1));
  }

  firstPage(): void {
    this.pageStart = 1;
    this.setPage(1);
  }

  onImageLoad(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.classList.add('loaded');
  }
}
