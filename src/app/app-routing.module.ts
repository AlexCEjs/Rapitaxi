import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegistrerComponent } from './components/registrer/registrer.component';
import { UnidadesComponent } from './components/unidades/unidades.component';
import { TurnosComponent } from './components/turnos/turnos.component';
import { MultaComponent } from './components/multa/multa.component';
import { PagosComponent } from './components/pagos/pagos.component';
import { CobroComponent } from './components/cobro/cobro.component';
import { DetalleMultaComponent } from './components/detalle-multa/detalle-multa.component';
import { TurnoUnidadComponent } from './components/turno-unidad/turno-unidad.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { ContactoComponent } from './components/contacto/contacto.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'login', component:LoginComponent},
  {path: 'home', component:HomeComponent},
  {path: 'registrer', component:RegistrerComponent},
  {path: 'unidades', component:UnidadesComponent},
  {path: 'turnos', component:TurnosComponent},
  {path: 'multa', component:MultaComponent},
  {path: 'pagos', component:PagosComponent},
  {path: 'turno-unidad', component:TurnoUnidadComponent},
  {path: 'cobro', component:CobroComponent},
  {path: 'detalle-multa', component:DetalleMultaComponent},
  {path: 'usuarios', component:UsuariosComponent},
  {path: 'contacto', component:ContactoComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
