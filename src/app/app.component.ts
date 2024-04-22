import { Component, OnInit } from '@angular/core';
import { IProduct } from './shared/shared/Product';
import { HttpClient } from '@angular/common/http';
import { IPagination } from './shared/shared/Pagination';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'client';
  baseUrl = 'https://localhost:44332/api/Product/get-all-products';
  products: IProduct[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    console.log('App component initialized');
    this.getProducts();
  }

  getProducts(){
    this.http.get(this.baseUrl).subscribe(
      (response: IPagination) => {
        this.products = response.data;
      },
      (error) => {
        console.log(error);
      }
    )
  }
}
