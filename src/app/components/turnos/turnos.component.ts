import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent {
  turnos: any[] = [];
  

  descripcion: string = '';
  hora_inicio: string = '';
  hora_final: string = '';
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
      descripcion: this.descripcion,
      hora_inicio: this.hora_inicio,
      hora_final: this.hora_final,
      estado: this.estado
    }
    this.http.post<any>('http://localhost:3000/api/turno/registro', turno).subscribe(
      
      (response) => {
        this.successMessage = 'Turno registrado exitosamente';
      },
      (error) => {
        this.errorMessage = 'Error al registrar turno';
      }
    );
  }
  
  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.http.get<any[]>('http://localhost:3000/api/turno/lista').subscribe(
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

    this.http.put<any>('http://localhost:3000/api/turno/actualizar/' + this.turnoSeleccionado.id, this.turnoSeleccionado).subscribe(
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

    this.http.delete<any>('http://localhost:3000/api/turno/delete/' + id).subscribe(
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
