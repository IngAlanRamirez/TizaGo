import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
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
  IonItem,
  IonLabel,
  IonInput,
  AlertController,
  ToastController,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  personOutline,
  mailOutline,
  callOutline,
  logOutOutline,
  createOutline,
  saveOutline,
  closeOutline,
  locationOutline,
  businessOutline,
  mapOutline,
} from 'ionicons/icons';

interface Usuario {
  nombre: string;
  email: string;
  telefono: string;
  direccion: {
    calle: string;
    colonia: string;
    ciudad: string;
    estado: string;
    codigoPostal: string;
  };
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardContent,
    IonButton,
    IonIcon,
    IonSkeletonText,
    IonItem,
    IonLabel,
    IonInput,
  ],
})
export class ProfilePage implements OnInit {
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly alertController = inject(AlertController);
  private readonly toastController = inject(ToastController);

  // Signals para estado reactivo
  private readonly _isLoading = signal<boolean>(true);
  private readonly _editMode = signal<boolean>(false);
  readonly isLoading = this._isLoading.asReadonly();
  readonly editMode = this._editMode.asReadonly();

  // Datos del usuario con signals (incluyendo dirección)
  readonly usuario = signal<Usuario>({
    nombre: 'Juan Pérez',
    email: 'juan@example.com',
    telefono: '+52 55 1234 5678',
    direccion: {
      calle: 'Av. Insurgentes Sur 1234',
      colonia: 'Del Valle',
      ciudad: 'Ciudad de México',
      estado: 'CDMX',
      codigoPostal: '03100',
    },
  });

  // Formulario reactivo
  editForm: FormGroup;

  constructor() {
    this.addIcons();
    this.editForm = this.createForm();
  }

  ngOnInit() {
    // Simular carga de datos
    setTimeout(() => {
      this._isLoading.set(false);
      this.loadUserData();
    }, 1000);
  }

  /**
   * Crear formulario reactivo con validaciones
   */
  private createForm(): FormGroup {
    return this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.minLength(10)]],
      direccion: this.fb.group({
        calle: ['', [Validators.required]],
        colonia: ['', [Validators.required]],
        ciudad: ['', [Validators.required]],
        estado: ['', [Validators.required]],
        codigoPostal: [
          '',
          [Validators.required, Validators.pattern(/^\d{5}$/)],
        ],
      }),
    });
  }

  /**
   * Cargar datos del usuario en el formulario
   */
  private loadUserData(): void {
    const userData = this.usuario();
    this.editForm.patchValue(userData);
  }

  /**
   * Habilitar modo de edición
   */
  enableEdit(): void {
    this._editMode.set(true);
    this.loadUserData(); // Recargar datos actuales
  }

  /**
   * Cancelar edición
   */
  cancelEdit(): void {
    this._editMode.set(false);
    this.loadUserData(); // Restaurar datos originales
  }

  /**
   * Guardar cambios
   */
  async saveChanges(): Promise<void> {
    if (this.editForm.invalid) {
      await this.showValidationErrors();
      return;
    }

    try {
      // Simular guardado
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Actualizar datos locales
      this.usuario.set(this.editForm.value);
      this._editMode.set(false);

      await this.showSuccessToast('Perfil actualizado correctamente');
    } catch (error) {
      await this.showErrorToast('Error al actualizar el perfil');
    }
  }

  /**
   * Mostrar errores de validación
   */
  private async showValidationErrors(): Promise<void> {
    const errors: string[] = [];

    if (this.editForm.get('nombre')?.invalid) {
      errors.push('El nombre es requerido (mínimo 2 caracteres)');
    }
    if (this.editForm.get('email')?.invalid) {
      errors.push('El email debe tener un formato válido');
    }
    if (this.editForm.get('telefono')?.invalid) {
      errors.push('El teléfono es requerido (mínimo 10 caracteres)');
    }
    if (this.editForm.get('direccion.calle')?.invalid) {
      errors.push('La calle es requerida');
    }
    if (this.editForm.get('direccion.colonia')?.invalid) {
      errors.push('La colonia es requerida');
    }
    if (this.editForm.get('direccion.ciudad')?.invalid) {
      errors.push('La ciudad es requerida');
    }
    if (this.editForm.get('direccion.estado')?.invalid) {
      errors.push('El estado es requerido');
    }
    if (this.editForm.get('direccion.codigoPostal')?.invalid) {
      errors.push('El código postal debe tener 5 dígitos');
    }

    const alert = await this.alertController.create({
      header: 'Errores de validación',
      message: errors.join('<br>'),
      buttons: ['OK'],
    });

    await alert.present();
  }

  /**
   * Mostrar toast de éxito
   */
  private async showSuccessToast(message: string): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color: 'success',
      position: 'top',
    });
    await toast.present();
  }

  /**
   * Mostrar toast de error
   */
  private async showErrorToast(message: string): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color: 'danger',
      position: 'top',
    });
    await toast.present();
  }

  /**
   * Cerrar sesión
   */
  async cerrarSesion(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Cerrar sesión',
      message: '¿Estás seguro de que quieres cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Cerrar sesión',
          handler: () => {
            console.log('Cerrando sesión...');
            this.router.navigate(['/auth/login']);
          },
        },
      ],
    });

    await alert.present();
  }

  /**
   * Registrar iconos
   */
  private addIcons(): void {
    addIcons({
      'person-outline': personOutline,
      'mail-outline': mailOutline,
      'call-outline': callOutline,
      'log-out-outline': logOutOutline,
      'create-outline': createOutline,
      'save-outline': saveOutline,
      'close-outline': closeOutline,
      'location-outline': locationOutline,
      'business-outline': businessOutline,
      'map-outline': mapOutline,
    });
  }
}
