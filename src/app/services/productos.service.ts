import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
}

@Injectable({ providedIn: 'root' })
export class ProductosService {
  private http = inject(HttpClient);

  listar(): Observable<Producto[]> {
    return this.http
      .get<{ productos: Producto[] }>(`${environment.apiUrl}/productos`)
      .pipe(map((res) => res.productos));
  }
}