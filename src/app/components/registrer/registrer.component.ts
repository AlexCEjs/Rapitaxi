import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-registrer',
  templateUrl: './registrer.component.html',
  styleUrls: ['./registrer.component.css']
})
export class RegistrerComponent {
  nombre: string = '';
  apellido: string = '';
  direccion: string = '';
  telefono: string = '';
  correo: string = '';
  password: string = '';
  estado: string = '';
  rol: string = '';
  verPassword: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private http: HttpClient, private router: Router, public authService: UsuarioService) {}

  registro(): void {
    this.errorMessage = '';
    this.successMessage = '';
    const usuario = {
      nombre: this.nombre,
      apellido: this.apellido,
      direccion: this.direccion,
      telefono: this.telefono,
      correo: this.correo,
      password: this.password,
      estado: "activo",
      rol: "cliente"
      
    };

    this.http.post<any>('http://localhost:3000/api/usuario/registro', usuario).subscribe(
      
      (response) => {
        this.successMessage = 'Usuario registrado exitosamente';
      },
      (error) => {
        this.errorMessage = 'Error al registrar usuario';
      }
    );
  }

  togglePasswordVisibility() {
    this.verPassword = !this.verPassword;
  }
  
}


