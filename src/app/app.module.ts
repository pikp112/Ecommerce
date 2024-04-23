import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { HomeModule } from './home/home.module';
import { CoreModule } from './core/core.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    HttpClientModule,
    //ShopModule,
    SharedModule,
    PaginationModule,
    HomeModule,
    BrowserAnimationsModule,
    BreadcrumbModule,
    NgxSpinnerModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
