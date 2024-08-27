import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private claveEstadoAutenticacion = 'usuarioHaIniciadoSesion';
  private claveTipoUsuario = 'tipoUsuario';
  private claveIdUsuario = 'id';

  constructor() {}

  iniciarSesion() {
    localStorage.setItem(this.claveEstadoAutenticacion, 'true');
  }

  cerrarSesion() {
    localStorage.removeItem(this.claveEstadoAutenticacion);
    localStorage.removeItem(this.claveTipoUsuario);

  }

  estaAutenticado(): boolean {
    return localStorage.getItem(this.claveEstadoAutenticacion) === 'true';
  }
  obtenerTipoUsuario(): string {
    if (this.estaAutenticado()) {
      const tipoUsuario = localStorage.getItem(this.claveTipoUsuario);
      return tipoUsuario !== null ? tipoUsuario : '';
    }
    return '';
  }
  guardarTipoUsuario(tipo: string) {
    localStorage.setItem(this.claveTipoUsuario, tipo);
  }

  obtenerIdUsuario(): number {
    if (this.estaAutenticado()) {
        const id = localStorage.getItem(this.claveIdUsuario);
        return id !== null ? parseInt(id, 10) : 0; // Parsea la cadena a número entero
    }
    return 0; // Devuelve 0 si no se encuentra el ID de usuario
}
guardarIdUsuario(id: number) {
  localStorage.setItem(this.claveIdUsuario, id.toString()); // Convierte el número a cadena antes de guardar
}

private userId: number | null = null;

setUserId(id: number) {
  this.userId = id;
}

getUserId(): number | null {
  return this.userId;
}

}





