import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  correo: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  constructor(private http: HttpClient, private router: Router, public authService: UsuarioService) {}
   
  login(): void {
    this.errorMessage = '';
    this.successMessage = '';
    const user = {
      correo: this.correo,
      password: this.password
    };

    this.http.post<any>('http://localhost:3000/api/usuario/login', user).subscribe(
      () => {
        this.http.post<any>('http://localhost:3000/api/usuario/obtenerTipoUsuarios', { correo: this.correo }).subscribe(
          (response) => {
            if (response.rol) {
              this.authService.iniciarSesion();
              this.successMessage = 'Inicio de sesión exitoso'
              this.successMessage = 'Inicio exitoso';
              localStorage.setItem('tipoUsuario', response.rol);
              this.router.navigate(['/home']);
            } else {
              this.errorMessage = 'Tipo de usuario no encontrado';
            }
          },
          (error) => {
            this.errorMessage = 'Error al obtener el tipo de usuario';
          }
        );
      },
      (error) => {
        this.errorMessage = 'Email o contraseña inválidos';
      }
    );
  }
}
