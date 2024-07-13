import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';



import { LanguageInterceptor } from './interceptors/language.interceptor';

import { CommonModule } from '@angular/common';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { FooterComponent } from './common/footer/footer.component';
import { LoaderComponent } from './common/loader/loader.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { HomeComponent } from './pages/home/home.component';


import { RouterModule } from '@angular/router';


import { Error404Component } from './pages/error404/error404.component';

import { CategoryComponent } from './pages/category/category.component';
import { OurStoryComponent } from './pages/our-story/our-story.component';



@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    FooterComponent,
    NavbarComponent,

    HomeComponent,

    Error404Component,

    CategoryComponent,
    OurStoryComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule ,
    CommonModule,
    NgbAccordionModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,

        useFactory: HttpLoaderFactory,

        deps: [HttpClient]
      }
    }),
    RouterModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: LanguageInterceptor, multi: true,
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
export function HttpLoaderFactory(http: HttpClient){
  return new TranslateHttpLoader(http);
}
