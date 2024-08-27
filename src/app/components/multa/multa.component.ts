import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-multa',
  templateUrl: './multa.component.html',
  styleUrls: ['./multa.component.css']
})
export class MultaComponent {

  idusuario: number = this.authService.obtenerIdUsuario();
  fecha_multa: string = "";
  descripcion: string = "";
  valor: string = "";
  estado: string = "";
  errorMessage: string = '';
  successMessage: string = '';

  nuevoMulta: any = {};
  mostrarEditarModal = false;
  mostrarAgregarModal = false;
  multaSeleccionado: any = {};
  multas: any[] = [];

  usuarios: any[] = [];

  constructor(private http: HttpClient, private router: Router, public authService: UsuarioService) {}

  registro(): void{
    this.errorMessage = '';
    this.successMessage = '';
    const multa ={
      idusuario: this.idusuario,
      fecha_multa: this.fecha_multa,
      descripcion: this.descripcion,
      valor: this.valor,
      estado: this.estado
    }

    this.http.post<any>('http://localhost:3000/api/multa/registro', multa).subscribe(
      
      (response) => {
        this.successMessage = 'Multa registrada exitosamente';
      },
      (error) => {
        this.errorMessage = 'Error al registrar la multa';
      }
    );
  }

  getSocios() {
    this.http.get<any[]>('http://localhost:3000/api/lista').subscribe(
      response => {
        this.usuarios = response;
      },
      error => {
        console.error(error);
      }
    );
  }

  ngOnInit() {
    this.getUser();
    this.getSocios();
  }

  getUser() {
    this.http.get<any[]>('http://localhost:3000/api/multa/lista').subscribe(
      response => {
        this.multas = response;
      },
      error => {
        console.error(error);
      }
    );
  }

  abrirEditarModal(turno: any) {
    this.multaSeleccionado = { ...turno };
    this.errorMessage = '';
    this.successMessage = '';
    this.mostrarEditarModal = true; 
  }

  cerrarAgregarModal() {
    this.mostrarAgregarModal = false;
    this.mostrarEditarModal = false;
  }

  abrirAgregarModal() {
    this.nuevoMulta = {};
    this.mostrarAgregarModal = true;
  }
  //metodo para editar
  editarMulta(): void {
    this.errorMessage = '';
    this.successMessage = '';

    this.http.put<any>('http://localhost:3000/api/multa/actualizar/' + this.multaSeleccionado.id, this.multaSeleccionado).subscribe(
      () => {
        
        this.successMessage = 'Multa actualizada exitosamente.';
        this.getUser(); 
        this.cerrarAgregarModal();
      },
      (error) => {
        this.errorMessage = 'Error al registrar Multa';
      }
    );
  }

  eliminarMulta(id: string): void {
    this.errorMessage = '';
    this.successMessage = '';

    this.http.delete<any>('http://localhost:3000/api/multa/delete/' + id).subscribe(
      () => {
        this.successMessage = 'Multa eliminado exitosamente.';
        this.getUser(); 
        
      },
      (error) => {
        this.errorMessage = error.error;
      }
    );
  }
}
