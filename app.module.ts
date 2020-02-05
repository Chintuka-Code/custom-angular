import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { TraverseComponent } from './pages/traverse/traverse.component';
import { Url2Component } from './pages/url2/url2.component';
import { MinNumberComponent } from './pages/min-number/min-number.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TraverseComponent,
    Url2Component,
    MinNumberComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
