import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(public usuarioService: UsuarioService) {}

  cerrarSesion() {
      this.usuarioService.cerrarSesion();
  }
}
