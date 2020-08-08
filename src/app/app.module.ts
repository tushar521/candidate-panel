import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Auth/login/login.component';
import { RegisterComponent } from './Auth/register/register.component';
import { ForgotPasswordComponent } from './Auth/forgot-password/forgot-password.component';
import { MainDashboardComponent, CategoriesDialog, ProductFullDetailsDialog } from './Dashboard/main-dashboard/main-dashboard.component';

import { ToasterModule, ToasterService } from 'angular2-toaster'
import { NgxLoadingModule } from 'ngx-loading'
import { UtilsService } from './core/utils.service';
import { GeneralService } from './core/general.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { StandardApiStructureManagerService } from './core/standard-api-structure-manager.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { FooterComponent } from './Dashboard/footer/footer.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';


import { SlideshowModule } from 'ng-simple-slideshow';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    MainDashboardComponent,
    CategoriesDialog,
    ProductFullDetailsDialog,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToasterModule,
    NgxLoadingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    MatDividerModule,
    MatToolbarModule,
    SlideshowModule,
    MatMenuModule
  ],
  entryComponents: [MainDashboardComponent, CategoriesDialog, ProductFullDetailsDialog],
  providers: [ToasterService, UtilsService, GeneralService, StandardApiStructureManagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
