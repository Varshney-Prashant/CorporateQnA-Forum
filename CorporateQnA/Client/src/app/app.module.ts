import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AnswerComponent } from './home/answer/answer.component';
import { NgxEditorModule } from 'ngx-editor';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { TopBarComponent } from './shared/top-bar/top-bar.component';
import { SideBarComponent } from './shared/side-bar/side-bar.component';
import { TopNavBarComponent } from './shared/top-nav-bar/top-nav-bar.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FiltersComponent } from './home/filters/filters.component';
import { ToastrModule } from 'ngx-toastr';
import { UserComponent, LoginComponent, RegistrationComponent } from './user';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from './auth';
import { CategoryListComponent } from './categories/category-list/category-list.component';
import { CategoryFiltersComponent } from './categories/category-list/category-filters/category-filters.component';
import { CategoryCardComponent } from './categories/category-list/category-card/category-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AnswerComponent,
    TopBarComponent,
    SideBarComponent,
    TopNavBarComponent,
    FiltersComponent,
    UserComponent,
    LoginComponent,
    RegistrationComponent,
    CategoryListComponent,
    CategoryFiltersComponent,
    CategoryCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxEditorModule,
    FormsModule,
    FilterPipeModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar:true
    }),
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
