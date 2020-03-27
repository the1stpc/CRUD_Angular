import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CrudPageComponent} from './crud-page/crud-page.component';
import {SiteLayoutComponent} from './shared/layouts/site-layout/site-layout.component';
import {UserFormComponent} from './crud-page/user-form/user-form.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {HttpClientModule} from '@angular/common/http';
import {LoaderComponent} from './shared/components/loader/loader.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import { FilterPipe } from './pipes/filter.pipe';
import { ToastComponent } from './shared/components/toast/toast.component';
import {TextMaskModule} from 'angular2-text-mask';



@NgModule({
  declarations: [
    AppComponent,
    CrudPageComponent,
    SiteLayoutComponent,
    UserFormComponent,
    LoaderComponent,
    FilterPipe,
    ToastComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    FormsModule,
    TextMaskModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
