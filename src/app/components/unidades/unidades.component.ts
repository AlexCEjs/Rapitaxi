import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.component.html',
  styleUrls: ['./unidades.component.css']
})
export class UnidadesComponent {

  taxis: any[] = [];
  usuarios: any[] = [];

  modelo: string = '';
  placa: string = '';
  marca: string = '';
  num_motor: string = '';
  num_chasis: string = '';
  anio: string = '';
  cilindraje: string = '';
  color: string = '';
  id_usuario: number = this.authService.obtenerIdUsuario();
  estado: string = '';

  errorMessage: string = '';
  successMessage: string = '';

  constructor(private http: HttpClient, private router: Router, public authService: UsuarioService) {}


  registro(): void{
    this.errorMessage = '';
    this.successMessage = '';
    const turno ={
      modelo: this.modelo,
      placa: this.placa,
      marca: this.marca,
      num_motor: this.num_motor,
      num_chasis: this.num_chasis,
      anio: this.anio,
      cilindraje: this.cilindraje,
      color: this.color,
      id_usuario: this.id_usuario,
      estado: this.estado
    }
    this.http.post<any>('http://localhost:3000/api/unidad/registro', turno).subscribe(
      
      (response) => {
        this.successMessage = 'Unidad registrada exitosamente';
      },
      (error) => {
        this.errorMessage = 'Error al registrar la unidad';
      }
    );
  }


  ngOnInit() {
    this.getUser();
    this.getSocios();
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

  getUser() {
    this.http.get<any[]>('http://localhost:3000/api/unidad/lista').subscribe(
      response => {
        this.taxis = response;
      },
      error => {
        console.error(error);
      }
    );
  }


  
}
