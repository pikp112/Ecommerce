import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../../shared/Product';

@Component({
  selector: 'app-shop-items',
  templateUrl: './shop-items.component.html',
  styleUrl: './shop-items.component.scss'
})
export class ShopItemsComponent implements OnInit{
  @Input() products: IProduct;
  constructor() { }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
