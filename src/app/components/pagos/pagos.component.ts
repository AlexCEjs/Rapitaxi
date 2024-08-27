import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent {
  id_usuario: number= this.authService.obtenerIdUsuario();
  valor: string = '';
  fecha: string = '';
  descripcion: string = '';
  estado: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  nuevoPago: any = {};
  mostrarEditarModal = false;
  mostrarAgregarModal = false;
  pagoSeleccionado: any = {};

  usuarios: any[] = [];
  pago: any[] = [];

  constructor(private http: HttpClient, private router: Router, public authService: UsuarioService) {}

  registro(): void{
    this.errorMessage = '';
    this.successMessage = '';
    const pago ={
      id_usuario: this.id_usuario,
      valor: this.valor,
      fecha: this.fecha,
      descripcion: this.descripcion,
      estado: this.estado
    }

    this.http.post<any>('http://localhost:3000/api/pagos/registro', pago).subscribe(
      
      (response) => {
        this.successMessage = 'Pago registrado exitosamente';
      },
      (error) => {
        this.errorMessage = 'Error al procesar el pago';
      }
    );
  }

  ngOnInit() {
    this.getPago();
    this.getSocios();
  }

  getPago() {
    this.http.get<any[]>('http://localhost:3000/api/pagos/lista').subscribe(
      response => {
        this.pago = response;
      },
      error => {
        console.error(error);
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

  abrirEditarModal(pagos: any) {
    this.pagoSeleccionado = { ...pagos };
    this.errorMessage = '';
    this.successMessage = '';
    this.mostrarEditarModal = true; 
  }

  cerrarAgregarModal() {
    this.mostrarAgregarModal = false;
    this.mostrarEditarModal = false;
  }

  abrirAgregarModal() {
    this.nuevoPago = {};
    this.mostrarAgregarModal = true;
  }

  //metodo para editar
  editarPago(): void {
    this.errorMessage = '';
    this.successMessage = '';

    this.http.put<any>('http://localhost:3000/api/pagos/actualizar/' + this.pagoSeleccionado.id, this.pagoSeleccionado).subscribe(
      () => {
        
        this.successMessage = 'Pago actualizado exitosamente.';
        this.getPago(); 
        this.cerrarAgregarModal();
      },
      (error) => {
        this.errorMessage = 'Error al registrar pago';
      }
    );
  }

  eliminarPago(id: string): void {
    this.errorMessage = '';
    this.successMessage = '';

    this.http.delete<any>('http://localhost:3000/api/pagos/delete/' + id).subscribe(
      () => {
        this.successMessage = 'Pago eliminado exitosamente.';
        this.getPago(); 
        
      },
      (error) => {
        this.errorMessage = error.error;
      }
    );
  }
}
