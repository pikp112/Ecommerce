import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, map } from 'rxjs';
import { Basket, IBasket, IBasketItem, IBasketTotals } from '../shared/Basket';
import { IProduct } from '../shared/Product';

@Injectable({
  providedIn: 'root',
})
export class BasketService implements OnInit {
  baseURL: string = environment.baseURL;
  private basketSource = new BehaviorSubject<IBasket>(null); // behaviour subject because we want to store the last value
  basket$ = this.basketSource.asObservable();
  private basketTotalSource = new BehaviorSubject<IBasketTotals>(null); // behaviour subject because we want to store the last value
  basketTotal$ = this.basketTotalSource.asObservable();
  
  constructor(private http: HttpClient) {}
  ngOnInit(): void {}
  
  private calculeTotal(){
    const basket = this.getCurrentBasketValue();
    const shipping = 0;
    const subtotal = basket.basketItems.reduce((a, b) => (b.price * b.quantity) + a, 0);
    const total = subtotal + shipping;
    this.basketTotalSource.next({shipping, total, subtotal});
  }

  incremenBasketItemQuantity(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket.basketItems.findIndex(x => x.id === item.id);
    basket.basketItems[foundItemIndex].quantity++;
    this.setBasket(basket);
  }
  decrementBasketItemQuantity(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket.basketItems.findIndex(x => x.id === item.id);
    if (basket.basketItems[foundItemIndex].quantity > 1) {
      basket.basketItems[foundItemIndex].quantity--;
      this.setBasket(basket);
    } else {
      this.removeItemFromBasket(item);
    }
  }
  removeItemFromBasket(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    if (basket.basketItems.some(x => x.id === item.id)) {
      basket.basketItems = basket.basketItems.filter(x => x.id !== item.id);
      if (basket.basketItems.length > 0) {
        this.setBasket(basket);
      } else {
        this.deleteBasket(basket);
      }
    }
  }
  deleteBasket(basket: IBasket) {
    return this.http.delete(this.baseURL + 'Basket/delete-basket-item/' + basket.id).subscribe(
      {next: () => {
        this.basketSource.next(null);
        this.basketTotalSource.next(null);
        localStorage.removeItem('basket_id');
      },
      error: (error) => {
        console.error(error);
      }}
    );
  }
  deleteLocalBasket(id: string) {
    this.basketSource.next(null);
    this.basketTotalSource.next(null);
    localStorage.removeItem('basket_id');
  }
  getBasket(id: string) {
    return this.http.get(this.baseURL + 'Basket/get-basket-item/' + id).pipe(
      map(
        (basket: IBasket) => {
          this.basketSource.next(basket);
          this.calculeTotal();
        },
        (error: any) => {
          console.log(error);
        }
      )
    );
  }

  setBasket(basket: IBasket) {
    return this.http
      .post(this.baseURL + 'Basket/update-basket', basket)
      .subscribe(
        (response: IBasket) => {
          this.basketSource.next(response);
          this.calculeTotal();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getCurrentBasketValue() {
    return this.basketSource.value;
  }

  addItemToBasket(item: IProduct, quantity: number = 1) {
    const itemToAdd: IBasketItem = this.MapProductItemToBasketItem(item, quantity);
    const currentBasket = this.getCurrentBasketValue() ?? this.createBasket();
    currentBasket.basketItems = this.AddOrUpdate(
      currentBasket.basketItems,
      itemToAdd,
      quantity
    );
    return this.setBasket(currentBasket);
  }
  private AddOrUpdate(
    basketItems: IBasketItem[],
    itemToAdd: IBasketItem,
    quantity: number
  ): IBasketItem[] {
    const index = basketItems.findIndex((i) => i.id === itemToAdd.id);
    if (index === -1) { // means item is not in the basket
      itemToAdd.quantity = quantity;
      basketItems.push(itemToAdd);
    } else { // means item is in the basket
      basketItems[index].quantity += quantity;
    }
    return basketItems;
  }

  private createBasket(): IBasket {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }

  private MapProductItemToBasketItem(item: IProduct, quantity: number): IBasketItem {
    return {
      id: item.id,
      productName: item.name,
      price: item.price,
      productPicture: item.productPicture,
      category: item.categoryName,
      quantity,
    };
  }
}
