import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {

  usuarios: any[] = [];

  errorMessage: string = '';
  successMessage: string = '';

  nuevoUser: any = {};
  mostrarEditarModal = false;
  mostrarAgregarModal = false;
  userSeleccionado: any = {};

  constructor(private http: HttpClient, private router: Router, public authService: UsuarioService) {}
  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.http.get<any[]>('http://localhost:3000/api/usuario/lista').subscribe(
      response => {
        this.usuarios = response;
      },
      error => {
        console.error(error);
      }
    );
  }

  editarUser(): void {
    this.errorMessage = '';
    this.successMessage = '';

    this.http.put<any>('http://localhost:3000/api/usuario/actualizar/' + this.userSeleccionado.id, this.userSeleccionado).subscribe(
      () => {
        
        this.successMessage = 'Usuario actualizado exitosamente.';
        this.getUser(); 
        this.cerrarAgregarModal();
      },
      (error) => {
        this.errorMessage = 'Error al registrar usuario actualizado.';
      }
    );
  }

  abrirEditarModal(user: any) {
    this.userSeleccionado = { ...user };
    this.errorMessage = '';
    this.successMessage = '';
    this.mostrarEditarModal = true; 
  }

  cerrarAgregarModal() {
    this.mostrarAgregarModal = false;
    this.mostrarEditarModal = false;
  }

  abrirAgregarModal() {
    this.nuevoUser = {};
    this.mostrarAgregarModal = true;
  }

  eliminarUsuario(id: string): void {
    this.errorMessage = '';
    this.successMessage = '';

    this.http.delete<any>('http://localhost:3000/api/usuario/delete/' + id).subscribe(
      () => {
        this.successMessage = 'Usuario eliminado exitosamente.';
        this.getUser(); 
        
      },
      (error) => {
        this.errorMessage = error.error;
      }
    );
  }

}
