import { Component } from '@angular/core';
import { UsuarioService } from './services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Rapitaxi';
  rolUsuario: string = '';
  constructor(public auth:UsuarioService, private router: Router){
    if (auth.estaAutenticado()) {
      this.rolUsuario = auth.obtenerTipoUsuario();
    }
  }
}
