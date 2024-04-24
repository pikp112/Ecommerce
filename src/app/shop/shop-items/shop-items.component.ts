import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../../shared/Product';
import { BasketService } from '../../basket/basket.service';

@Component({
  selector: 'app-shop-items',
  templateUrl: './shop-items.component.html',
  styleUrl: './shop-items.component.scss'
})
export class ShopItemsComponent implements OnInit{
  @Input() products: IProduct;
  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
  }

  addItemToBasket() {
    this.basketService.addItemToBasket(this.products);
  }
}
