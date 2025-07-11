import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonButton,
  IonIcon,
  IonSkeletonText,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  personOutline,
  mailOutline,
  callOutline,
  logOutOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardContent,
    IonButton,
    IonIcon,
    IonSkeletonText,
  ],
})
export class ProfilePage implements OnInit {
  private readonly router = inject(Router);

  // Signals para estado reactivo
  private readonly _isLoading = signal<boolean>(true);
  readonly isLoading = this._isLoading.asReadonly();

  // Datos del usuario con signals
  readonly usuario = signal({
    nombre: 'Juan Pérez',
    email: 'juan@example.com',
    telefono: '+52 55 1234 5678',
  });

  constructor() {
    this.addIcons();
  }

  ngOnInit() {
    // Simular carga de datos
    setTimeout(() => {
      this._isLoading.set(false);
    }, 1000);
  }

  cerrarSesion() {
    // Simular cierre de sesión
    console.log('Cerrando sesión...');
    this.router.navigate(['/auth/login']);
  }

  private addIcons() {
    addIcons({
      'person-outline': personOutline,
      'mail-outline': mailOutline,
      'call-outline': callOutline,
      'log-out-outline': logOutOutline,
    });
  }
}
