import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { UsersListComponent } from './pages/users/users-list/users-list.component';
import { UserFormComponent } from './pages/users/user-form/user-form.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UsersListComponent,
    UserFormComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //para buscar os dados da api deve importar o modulo httpClient. Deve-se importar acima com a linha
    //import { HttpClientModule } from '@angular/common/http';
    HttpClientModule,
    //Deve-se importar também dois modulos de form do angular que tratam de formulários também que são
    //FormsModule e ReactiveFormsModule
    FormsModule,
    ReactiveFormsModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
