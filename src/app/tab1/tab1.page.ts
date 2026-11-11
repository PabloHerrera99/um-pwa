import { Component, OnInit, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem,
  IonLabel, IonRefresher, IonRefresherContent, IonSpinner, IonText
} from '@ionic/angular';
import { ProductosService, Producto } from '../services/productos.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [
    CurrencyPipe, IonHeader, IonToolbar, IonTitle, IonContent, IonList,
    IonItem, IonLabel, IonRefresher, IonRefresherContent, IonSpinner, IonText
  ],
})
export class Tab1Page implements OnInit {
  private productosService = inject(ProductosService);

  productos = signal<Producto[]>([]);
  cargando = signal(true);
  error = signal('');

  ngOnInit() {
    this.cargar();
  }

  cargar(event?: any) {
    this.productosService.listar().subscribe({
      next: (data) => {
        this.productos.set(data);
        this.error.set('');
        this.cargando.set(false);
        event?.target.complete();
      },
      error: () => {
        this.error.set('No se pudieron obtener los productos.');
        this.cargando.set(false);
        event?.target.complete();
      },
    });
  }
}