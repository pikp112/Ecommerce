import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ShopService } from './shop.service';
import { IProduct } from '../shared/Product';
import { ICategory } from '../shared/Category';
import { ShopParams } from '../shared/shopparams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {
  products: IProduct[] = [];
  categories: ICategory[] = [];
  categoryidSelected: number;
  shopParams = new ShopParams();
  @ViewChild('search', { static: false }) searchTerm: ElementRef;
  soreOptions =
    [
      { name: 'Name', value: 'Name' },
      { name: 'Price : Low to High', value: 'PriceAsc' },
      { name: 'Price : high to low', value: 'PriceDesc' }
    ];
  sortSelected: string = 'name';
  
  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  getProducts(){
    this.shopService.getProducts(this.shopParams)
    .subscribe(response => {
      this.products = response.data;
      this.shopParams.totalCount = response.pageCount;
      this.shopParams.pageNumber = response.pageNumber;
      this.shopParams.pageSize = response.pageSize;
    });
  }

  getCategories(){
    this.shopService.getCategories()
    .subscribe(response => {
      this.categories = [{ id: 0, name: 'All', description: '' }, ...response];
    });
  }

  oncategoryselected(categoryid: number){
    this.shopParams.categoryid = categoryid;
    this.getProducts();
  }

  onSortSelected(sort:Event){
    let sortValue = (sort.target as HTMLSelectElement).value;
    this.shopParams.sorting = sortValue;
    this.getProducts();
  }

  onPageChanged(event: any){
    this.shopParams.pageNumber = event;
    this.getProducts();
  }

  onSearch(searchTerm: string){
    this.shopParams.search = searchTerm;
    this.getProducts();
  }

  onSearchInput(){
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.getProducts();
  }
}
