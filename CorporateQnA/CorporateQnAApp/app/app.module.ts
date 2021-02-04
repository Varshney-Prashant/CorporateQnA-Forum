import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent, AnswerComponent, FiltersComponent } from './home';
import { TopBarComponent, SideBarComponent, TopNavBarComponent } from './shared';
import { UserComponent, LoginComponent, RegistrationComponent } from './user';
import { AuthInterceptor } from './auth';
import { CategoryListComponent, CategoryFiltersComponent, CategoryCardComponent } from './categories';
import { UserListComponent, UserCardComponent, UserDetailsComponent } from './user-list';
import { UserService } from './services';
import { SearchPipe } from './shared';

import { NgxEditorModule } from 'ngx-editor';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


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
		CategoryCardComponent,
		UserListComponent,
		UserCardComponent,
		UserDetailsComponent,
		SearchPipe,
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
			progressBar: true
		}),
	],
	providers: [UserService, {
		provide: HTTP_INTERCEPTORS,
		useClass: AuthInterceptor,
		multi: true
	}],
	bootstrap: [AppComponent]
})
export class AppModule { }
