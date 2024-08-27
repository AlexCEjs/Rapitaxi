import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-cobro',
  templateUrl: './cobro.component.html',
  styleUrls: ['./cobro.component.css']
})
export class CobroComponent {
  id_usuario: number = this.authService.obtenerIdUsuario();
  fecha: string = "";
  total: string = "";
  observacion: string = "";
  estado: string = "";
  errorMessage: string = '';
  successMessage: string = '';
  nombre: string = '';

  nuevoCobro: any = {};
  mostrarEditarModal = false;
  mostrarAgregarModal = false;
  cobroSeleccionado: any = {};

  cobros: any[] = [];
  usuarios: any[] = [];

  constructor(private http: HttpClient, private router: Router, public authService: UsuarioService) {}

  registro(): void{
    this.errorMessage = '';
    this.successMessage = '';
    const cobro ={
      id_usuario: this.id_usuario,
      fecha: this.fecha,
      total: this.total,
      observacion: this.observacion,
      estado: this.estado
    }

    this.http.post<any>('http://localhost:3000/api/cobro/registro', cobro).subscribe(
      
      (response) => {
        this.successMessage = 'Cobro registrada exitosamente';
      },
      (error) => {
        this.errorMessage = 'Error al procesar el cobro';
      }
    );
  }

  ngOnInit() {
    this.getUser();
    this.getSocios();
  }

  getUser() {
    this.http.get<any[]>('http://localhost:3000/api/cobro/lista').subscribe(
      response => {
        this.cobros = response;
      },
      error => {
        console.error(error);
      }
    );
  }

  getSocios() {
    this.http.get<any[]>('http://localhost:3000/api/usuario/lista').subscribe(
      response => {
        this.usuarios = response;
      },
      error => {
        console.error(error);
      }
    );
  }

  abrirEditarModal(cobro: any) {
    this.cobroSeleccionado = { ...cobro };
    this.errorMessage = '';
    this.successMessage = '';
    this.mostrarEditarModal = true; 
  }

  cerrarAgregarModal() {
    this.mostrarAgregarModal = false;
    this.mostrarEditarModal = false;
  }

  abrirAgregarModal() {
    this.nuevoCobro = {};
    this.mostrarAgregarModal = true;
  }

   //metodo para editar
   editarCobro(): void {
    this.errorMessage = '';
    this.successMessage = '';

    this.http.put<any>('http://localhost:3000/api/cobro/actualizar/' + this.cobroSeleccionado.id_cobro, this.cobroSeleccionado).subscribe(
      () => {
        
        this.successMessage = 'Cobro actualizado exitosamente ts.';
        this.getUser(); 
        this.cerrarAgregarModal();
      },
      (error) => {
        this.errorMessage = 'Error al registrar cobro';
      }
    );
  }

  eliminarCobro(id: string): void {
    this.errorMessage = '';
    this.successMessage = '';

    this.http.delete<any>('http://localhost:3000/api/cobro/delete/' + id).subscribe(
      () => {
        this.successMessage = 'Cobro eliminado exitosamente.';
        this.getUser(); 
        
      },
      (error) => {
        this.errorMessage = error.error;
      }
    );
  }

buscarPorUsuario(): void {
  if (this.nombre) {
    this.errorMessage = '';
    this.successMessage = '';

    this.http.get<any[]>('http://localhost:3000/api/cobro/buscar/' + this.nombre).subscribe(
      (response) => {
        if (response.length > 0) {
          this.cobros = [response[0]]; 
        } else {
          this.cobros = [];
          this.errorMessage = 'No se encontraron cobro en ese usuario.';
        }
      },
      (error) => {
        this.errorMessage = 'Ocurrió un error al buscar el cobro de usuario.';
      }
    );
  }
}
}
