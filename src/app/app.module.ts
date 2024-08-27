import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegistrerComponent } from './components/registrer/registrer.component';

import {HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UnidadesComponent } from './components/unidades/unidades.component';
import { TurnosComponent } from './components/turnos/turnos.component';
import { TurnoUnidadComponent } from './components/turno-unidad/turno-unidad.component';
import { PagosComponent } from './components/pagos/pagos.component';
import { MultaComponent } from './components/multa/multa.component';
import { DetalleMultaComponent } from './components/detalle-multa/detalle-multa.component';
import { CobroComponent } from './components/cobro/cobro.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { ContactoComponent } from './components/contacto/contacto.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    RegistrerComponent,
    UnidadesComponent,
    TurnosComponent,
    TurnoUnidadComponent,
    PagosComponent,
    MultaComponent,
    DetalleMultaComponent,
    CobroComponent,
    UsuariosComponent,
    ContactoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
