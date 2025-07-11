import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonButton,
  IonIcon,
  IonSkeletonText,
  IonRefresher,
  IonRefresherContent,
  IonBadge,
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  personOutline,
  storefrontOutline,
  trendingUpOutline,
  chevronForwardOutline,
  refreshOutline,
} from 'ionicons/icons';

// Services
import { CartService } from '../core/services/cart.service';
import { NotificacionesService } from '../core/services/notificaciones.service';

// Interfaces
interface Usuario {
  id: number;
  nombre: string;
  email: string;
  avatar?: string;
}

interface NegocioSugerido {
  id: number;
  nombre: string;
  categoria: string;
  rating: number;
  tiempoEntrega: number;
  imagen: string;
  promocion?: string;
}

interface Promocion {
  id: number;
  titulo: string;
  descripcion: string;
  descuento: number;
  negocio: string;
  imagen: string;
  vigencia: Date;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    IonHeader,
    IonToolbar,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardContent,
    IonButton,
    IonIcon,
    IonSkeletonText,
    IonRefresher,
    IonRefresherContent,
    IonBadge,
  ],
})
export class HomePage implements OnInit {
  // Services injection
  private readonly cartService = inject(CartService);
  private readonly notificacionesService = inject(NotificacionesService);

  // Signals para estado reactivo - Angular 20
  private readonly _usuario = signal<Usuario | null>(null);
  private readonly _negociosSugeridos = signal<NegocioSugerido[]>([]);
  private readonly _promociones = signal<Promocion[]>([]);
  private readonly _isLoading = signal<boolean>(true);

  // Computed signals
  readonly usuario = this._usuario.asReadonly();
  readonly negociosSugeridos = this._negociosSugeridos.asReadonly();
  readonly promociones = this._promociones.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();

  readonly saludo = computed(() => {
    const usuario = this._usuario();
    if (!usuario) return '';

    const hora = new Date().getHours();
    let tipoSaludo = '';

    if (hora < 12) {
      tipoSaludo = 'Buenos días';
    } else if (hora < 18) {
      tipoSaludo = 'Buenas tardes';
    } else {
      tipoSaludo = 'Buenas noches';
    }

    return `${tipoSaludo}, ${usuario.nombre}`;
  });

  readonly carritoCount = this.cartService.itemsCount;
  readonly notificacionesCount = this.notificacionesService.unreadCount;

  constructor() {
    this.addIcons();
  }

  ngOnInit() {
    this.cargarDatosIniciales();
  }

  async cargarDatosIniciales() {
    this._isLoading.set(true);

    try {
      // Simular carga de datos con Promise.all para paralelismo
      const [usuario, negocios, promociones] = await Promise.all([
        this.cargarUsuario(),
        this.cargarNegociosSugeridos(),
        this.cargarPromociones(),
      ]);

      this._usuario.set(usuario);
      this._negociosSugeridos.set(negocios);
      this._promociones.set(promociones);
    } catch (error) {
      console.error('Error cargando datos iniciales:', error);
    } finally {
      this._isLoading.set(false);
    }
  }

  async onRefresh(event: any) {
    await this.cargarDatosIniciales();
    event.target.complete();
  }

  verTodosNegocios() {
    // Navegación se manejará en el template
  }

  verTodasPromociones() {
    // Navegación se manejará en el template
  }

  // Métodos privados para simular carga de datos
  private async cargarUsuario(): Promise<Usuario> {
    // Simular delay de red
    await new Promise((resolve) => setTimeout(resolve, 800));

    return {
      id: 1,
      nombre: 'Juan Pérez',
      email: 'juan@example.com',
      avatar: 'assets/avatars/default-avatar.png',
    };
  }

  private async cargarNegociosSugeridos(): Promise<NegocioSugerido[]> {
    // Simular delay de red
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return [
      {
        id: 1,
        nombre: 'Tacos El Güero',
        categoria: 'Comida Mexicana',
        rating: 4.8,
        tiempoEntrega: 25,
        imagen: 'assets/negocios/tacos-el-guero.jpg',
        promocion: '20% OFF',
      },
      {
        id: 2,
        nombre: 'Pizza Italiana',
        categoria: 'Pizza',
        rating: 4.6,
        tiempoEntrega: 35,
        imagen: 'assets/negocios/pizza-italiana.jpg',
      },
      {
        id: 3,
        nombre: 'Sushi Express',
        categoria: 'Comida Japonesa',
        rating: 4.9,
        tiempoEntrega: 40,
        imagen: 'assets/negocios/sushi-express.jpg',
        promocion: '15% OFF',
      },
      {
        id: 4,
        nombre: 'Café Central',
        categoria: 'Café',
        rating: 4.7,
        tiempoEntrega: 15,
        imagen: 'assets/negocios/cafe-central.jpg',
      },
    ];
  }

  private async cargarPromociones(): Promise<Promocion[]> {
    // Simular delay de red
    await new Promise((resolve) => setTimeout(resolve, 600));

    return [
      {
        id: 1,
        titulo: '¡Envío gratis!',
        descripcion: 'En pedidos mayores a $300',
        descuento: 100,
        negocio: 'Todos los negocios',
        imagen: 'assets/promociones/envio-gratis.jpg',
        vigencia: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 días
      },
      {
        id: 2,
        titulo: 'Descuento del 25%',
        descripcion: 'En tu primer pedido',
        descuento: 25,
        negocio: 'Tacos El Güero',
        imagen: 'assets/promociones/primer-pedido.jpg',
        vigencia: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 días
      },
    ];
  }

  private addIcons() {
    addIcons({
      'person-outline': personOutline,
      'storefront-outline': storefrontOutline,
      'trending-up-outline': trendingUpOutline,
      'chevron-forward-outline': chevronForwardOutline,
      'refresh-outline': refreshOutline,
    });
  }
}
