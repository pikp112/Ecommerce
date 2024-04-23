import { Component, OnInit } from '@angular/core';
import { IProduct } from './shared/Product';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'client';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
  }


}
