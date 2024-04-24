import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket/basket.service';
import { AccountService } from './account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'client';

  constructor(
    private basketService: BasketService,
    private accountService: AccountService
  ) {}
  ngOnInit(): void {
    this.loadCurrentUser();
    this.basket();
  }
  basket(){
    const basketId = localStorage.getItem('basket_id');
    if (basketId) {
      this.basketService.getBasket(basketId).subscribe({
        next: () => {
          console.log('intialBasket');
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }
  loadCurrentUser() {
    const token = localStorage.getItem('token');
    if (token) {
      this.accountService.loadCurrentUser(token).subscribe(
        () => {
          console.log('loaded user');
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
}
