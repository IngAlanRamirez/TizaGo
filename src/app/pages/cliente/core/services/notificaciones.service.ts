import { Injectable, signal, computed } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// Interfaces
export interface Notificacion {
  id: string;
  tipo: 'pedido' | 'promocion' | 'sistema';
  titulo: string;
  mensaje: string;
  fecha: Date;
  leida: boolean;
  importante: boolean;
  accion?: {
    texto: string;
    url: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class NotificacionesService {
  // Signals para estado reactivo - Angular 20
  private readonly _notificaciones = signal<Notificacion[]>([]);
  private readonly _isLoading = signal<boolean>(false);

  // Computed signals
  readonly notificaciones = this._notificaciones.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();

  readonly unreadCount = computed(
    () => this._notificaciones().filter((n) => !n.leida).length,
  );

  readonly importantCount = computed(
    () => this._notificaciones().filter((n) => n.importante && !n.leida).length,
  );

  readonly notificacionesRecientes = computed(() =>
    this._notificaciones()
      .sort((a, b) => b.fecha.getTime() - a.fecha.getTime())
      .slice(0, 5),
  );

  // BehaviorSubject para compatibilidad
  private readonly _notificacionesSubject = new BehaviorSubject<Notificacion[]>(
    [],
  );
  readonly notificaciones$ = this._notificacionesSubject.asObservable();

  private readonly STORAGE_KEY = 'tizago-notificaciones';

  constructor() {
    this.loadFromStorage();
    this.initializeMockData();
  }

  /**
   * Inicializar el servicio
   */
  initialize(): void {
    this.loadFromStorage();
  }

  /**
   * Agregar nueva notificación
   */
  agregarNotificacion(
    notificacion: Omit<Notificacion, 'id' | 'fecha' | 'leida'>,
  ): void {
    const nuevaNotificacion: Notificacion = {
      ...notificacion,
      id: this.generateId(),
      fecha: new Date(),
      leida: false,
    };

    const currentNotificaciones = this._notificaciones();
    const newNotificaciones = [nuevaNotificacion, ...currentNotificaciones];

    this._notificaciones.set(newNotificaciones);
    this._notificacionesSubject.next(newNotificaciones);
    this.saveToStorage();
  }

  /**
   * Marcar notificación como leída
   */
  marcarComoLeida(notificacionId: string): void {
    const currentNotificaciones = this._notificaciones();
    const newNotificaciones = currentNotificaciones.map((n) =>
      n.id === notificacionId ? { ...n, leida: true } : n,
    );

    this._notificaciones.set(newNotificaciones);
    this._notificacionesSubject.next(newNotificaciones);
    this.saveToStorage();
  }

  /**
   * Marcar todas como leídas
   */
  marcarTodasComoLeidas(): void {
    const currentNotificaciones = this._notificaciones();
    const newNotificaciones = currentNotificaciones.map((n) => ({
      ...n,
      leida: true,
    }));

    this._notificaciones.set(newNotificaciones);
    this._notificacionesSubject.next(newNotificaciones);
    this.saveToStorage();
  }

  /**
   * Eliminar notificación
   */
  eliminarNotificacion(notificacionId: string): void {
    const currentNotificaciones = this._notificaciones();
    const newNotificaciones = currentNotificaciones.filter(
      (n) => n.id !== notificacionId,
    );

    this._notificaciones.set(newNotificaciones);
    this._notificacionesSubject.next(newNotificaciones);
    this.saveToStorage();
  }

  /**
   * Limpiar todas las notificaciones
   */
  limpiarNotificaciones(): void {
    this._notificaciones.set([]);
    this._notificacionesSubject.next([]);
    this.saveToStorage();
  }

  /**
   * Obtener notificaciones por tipo
   */
  getNotificacionesByTipo(tipo: Notificacion['tipo']): Notificacion[] {
    return this._notificaciones().filter((n) => n.tipo === tipo);
  }

  /**
   * Simular notificación de pedido
   */
  simularNotificacionPedido(pedidoId: string): void {
    this.agregarNotificacion({
      tipo: 'pedido',
      titulo: '🍕 Pedido confirmado',
      mensaje: `Tu pedido #${pedidoId} está siendo preparado`,
      importante: true,
      accion: {
        texto: 'Ver pedido',
        url: `/cliente/orders/${pedidoId}`,
      },
    });
  }

  /**
   * Simular notificación de promoción
   */
  simularNotificacionPromocion(): void {
    this.agregarNotificacion({
      tipo: 'promocion',
      titulo: '🎉 ¡Oferta especial!',
      mensaje: 'Descuento del 20% en tu restaurante favorito',
      importante: false,
      accion: {
        texto: 'Ver ofertas',
        url: '/cliente/businesses',
      },
    });
  }

  // Métodos privados
  private generateId(): string {
    return `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private saveToStorage(): void {
    try {
      const dataToSave = this._notificaciones().map((n) => ({
        ...n,
        fecha: n.fecha.toISOString(),
      }));
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (error) {
      console.error('Error saving notifications to localStorage:', error);
    }
  }

  private loadFromStorage(): void {
    try {
      const savedData = localStorage.getItem(this.STORAGE_KEY);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        const notificaciones = parsedData.map((n: any) => ({
          ...n,
          fecha: new Date(n.fecha),
        }));
        this._notificaciones.set(notificaciones);
        this._notificacionesSubject.next(notificaciones);
      }
    } catch (error) {
      console.error('Error loading notifications from localStorage:', error);
    }
  }

  private initializeMockData(): void {
    // Solo inicializar datos mock si no hay notificaciones guardadas
    if (this._notificaciones().length === 0) {
      const mockNotificaciones: Notificacion[] = [
        {
          id: 'mock1',
          tipo: 'pedido',
          titulo: '🍕 Pedido entregado',
          mensaje: 'Tu pedido de Pizza Italiana ha sido entregado',
          fecha: new Date(Date.now() - 3600000), // 1 hora atrás
          leida: false,
          importante: true,
          accion: {
            texto: 'Calificar pedido',
            url: '/cliente/orders/mock1',
          },
        },
        {
          id: 'mock2',
          tipo: 'promocion',
          titulo: '🎉 Nueva promoción',
          mensaje: '¡Descuento del 15% en Tacos El Güero!',
          fecha: new Date(Date.now() - 7200000), // 2 horas atrás
          leida: false,
          importante: false,
          accion: {
            texto: 'Ver promoción',
            url: '/cliente/businesses/1',
          },
        },
      ];

      this._notificaciones.set(mockNotificaciones);
      this._notificacionesSubject.next(mockNotificaciones);
    }
  }
}
