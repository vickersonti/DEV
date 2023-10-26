import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProdutosListComponent } from './pages/produtos-list/produtos-list.component';
import { ProdutosFormComponent } from './pages/produtos-list/produtos-form/produtos-form.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { ConfirmationDialogComponent } from './shared/components/confirmation-dialog/confirmation-dialog/confirmation-dialog.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { CurrencyMaskModule } from "ng2-currency-mask";
import {MatPaginatorModule} from '@angular/material/paginator';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashBoardComponent } from './pages/dash-board/dash-board.component';
import { LoginComponent } from './pages/login/login.component';
import { MatMenuModule } from '@angular/material/menu';
import { SignupComponent } from './pages/signup/signup.component';
import { PessoasComponent } from './pages/pessoas/pessoas.component';
import { PessoasFormComponent } from './pages/pessoas/pessoas-form/pessoas-form.component';
import { SnackMessageComponent } from './pages/pessoas/snack-message/snack-message.component';

@NgModule({
  declarations: [
    AppComponent,
    ProdutosListComponent,
    ProdutosFormComponent,
    ConfirmationDialogComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    DashBoardComponent,
    LoginComponent,
    SignupComponent,
    PessoasComponent,
    PessoasFormComponent,
    SnackMessageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSortModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    MatSnackBarModule,
    CurrencyMaskModule,
    MatPaginatorModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
