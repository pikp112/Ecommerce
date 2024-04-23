import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { ShopItemsComponent } from './shop-items/shop-items.component';
import { SharedModule } from '../shared/shared.module';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ShopRoutingModule } from './shop-routing.module';
import { BreadcrumbModule } from 'primeng/breadcrumb';

@NgModule({
  declarations: [
    ShopComponent,
    ShopItemsComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ShopRoutingModule,
    BreadcrumbModule
  ],
  exports: [ ]
})
export class ShopModule { }
