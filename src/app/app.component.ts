import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthMoviesService } from './core/services/auth-movies.service';
import { ApiResponse } from './core/models/model';
import { Observable } from 'rxjs';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HeaderComponent } from "./shared/header/header.component";





@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NgxSpinnerModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
