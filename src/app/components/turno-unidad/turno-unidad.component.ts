import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-turno-unidad',
  templateUrl: './turno-unidad.component.html',
  styleUrls: ['./turno-unidad.component.css']
})
export class TurnoUnidadComponent {

  turnos: any[] = [];
  ruta: any[] = [];
  unidad: any[] = [];

  id_unidad: string = '';
  id_turno: string = '';
  fecha: string = '';
  observacion: string = '';
  estado: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  nuevoTurno: any = {};
  mostrarEditarModal = false;
  mostrarAgregarModal = false;

  turnoSeleccionado: any = {};


  constructor(private http: HttpClient, private router: Router, public authService: UsuarioService) {}

  registro(): void{
    this.errorMessage = '';
    this.successMessage = '';
    const turno ={
      id_unidad: this.id_unidad,
      id_turno: this.id_turno,
      fecha: this.fecha,
      observacion: this.observacion,
      estado: this.estado
    }
    this.http.post<any>('http://localhost:3000/api/turnounidad/registro', turno).subscribe(
      
      (response) => {
        this.successMessage = 'Registrado exitosamente';
      },
      (error) => {
        this.errorMessage = 'Error al registrar turno';
      }
    );
  }
  
  getRuta() {
    this.http.get<any[]>('http://localhost:3000/api/turno/lista').subscribe(
      response => {
        this.ruta = response;
      },
      error => {
        console.error(error);
      }
    );
  }
  getUnidad() {
    this.http.get<any[]>('http://localhost:3000/api/unidad/lista').subscribe(
      response => {
        this.unidad = response;
      },
      error => {
        console.error(error);
      }
    );
  }

  ngOnInit() {
    this.getUser();
    this.getRuta();
    this.getUnidad();
  }

  getUser() {
    this.http.get<any[]>('http://localhost:3000/api/turnounidad/lista').subscribe(
      response => {
        this.turnos = response;
      },
      error => {
        console.error(error);
      }
    );
  }

  abrirEditarModal(turno: any) {
    this.turnoSeleccionado = { ...turno };
    this.errorMessage = '';
    this.successMessage = '';
    this.mostrarEditarModal = true; 
  }

  cerrarAgregarModal() {
    this.mostrarAgregarModal = false;
    this.mostrarEditarModal = false;
  }

  abrirAgregarModal() {
    this.nuevoTurno = {};
    this.mostrarAgregarModal = true;
  }

  //metodo para editar
  editarTurno(): void {
    this.errorMessage = '';
    this.successMessage = '';

    this.http.put<any>('http://localhost:3000/api/turnounidad/actualizar/' + this.turnoSeleccionado.id, this.turnoSeleccionado).subscribe(
      () => {
        
        this.successMessage = 'Turno actualizado exitosamente.';
        this.getUser(); 
        this.cerrarAgregarModal();
      },
      (error) => {
        this.errorMessage = 'Error al registrar turno';
      }
    );
  }

  eliminarTurno(id: string): void {
    this.errorMessage = '';
    this.successMessage = '';

    this.http.delete<any>('http://localhost:3000/api/turnounidad/delete/' + id).subscribe(
      () => {
        this.successMessage = 'Turno eliminado exitosamente.';
        this.getUser(); 
        
      },
      (error) => {
        this.errorMessage = error.error;
      }
    );
  }
}
