import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { refreshOutline } from 'ionicons/icons';

export interface VerificationMethod {
  type: 'email' | 'sms';
  label: string;
  icon: string;
  description: string;
  contact: string;
}

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.page.html',
  styleUrls: ['./verify-account.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
})
export class VerifyAccountPage implements OnInit {
  selectedMethod: 'email' | 'sms' = 'email';
  verificationCode = '';
  userEmail = 'usuario@ejemplo.com'; // Esto vendría del registro
  userPhone = '+52 555 123 4567'; // Esto vendría del registro
  isCodeSent = false;
  countdown = 0;
  private countdownInterval: any;

  // Nuevas propiedades para modo recuperación
  mode: 'register' | 'recovery' = 'register';
  recoveryContact = '';
  recoveryMethod: 'email' | 'phone' = 'email';

  verificationMethods: VerificationMethod[] = [
    {
      type: 'email',
      label: 'Correo electrónico',
      icon: 'mail-outline',
      description: 'Te enviaremos un código de 6 dígitos',
      contact: this.userEmail,
    },
    {
      type: 'sms',
      label: 'Mensaje de texto',
      icon: 'phone-portrait-outline',
      description: 'Recibirás un SMS con el código',
      contact: this.userPhone,
    },
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alertController: AlertController,
  ) {
    this.addIcons();
  }

  ngOnInit() {
    // Obtener parámetros de la URL
    this.route.queryParams.subscribe((params) => {
      this.mode = params['mode'] || 'register';

      if (this.mode === 'recovery') {
        this.recoveryMethod = params['method'] || 'email';
        this.recoveryContact = params['contact'] || '';
        this.selectedMethod = this.recoveryMethod === 'email' ? 'email' : 'sms';

        // Actualizar los métodos de verificación para modo recuperación
        this.updateVerificationMethodsForRecovery();
      }
    });
  }

  updateVerificationMethodsForRecovery() {
    // En modo recuperación, solo mostramos el método seleccionado
    if (this.recoveryMethod === 'email') {
      this.verificationMethods = [
        {
          type: 'email',
          label: 'Correo electrónico',
          icon: 'mail-outline',
          description: 'Te enviaremos un código de recuperación',
          contact: this.recoveryContact,
        },
      ];
    } else {
      this.verificationMethods = [
        {
          type: 'sms',
          label: 'Mensaje de texto',
          icon: 'phone-portrait-outline',
          description: 'Recibirás un SMS con el código',
          contact: this.recoveryContact,
        },
      ];
    }
  }

  selectMethod(method: 'email' | 'sms') {
    this.selectedMethod = method;
    this.isCodeSent = false;
    this.verificationCode = '';
  }

  async sendVerificationCode() {
    console.log(`Enviando código por ${this.selectedMethod}...`);

    // Mensaje diferente según el modo
    const message =
      this.mode === 'recovery'
        ? `Se ha enviado un código de recuperación a tu ${this.selectedMethod === 'email' ? 'correo electrónico' : 'teléfono'}.`
        : `Se ha enviado un código de verificación a tu ${this.selectedMethod === 'email' ? 'correo electrónico' : 'teléfono'}.`;

    const alert = await this.alertController.create({
      header: 'Código enviado',
      message: message,
      buttons: ['OK'],
    });
    await alert.present();

    this.isCodeSent = true;
    this.startCountdown();
  }

  async verifyCode() {
    if (this.verificationCode.length !== 6) {
      const alert = await this.alertController.create({
        header: 'Código incompleto',
        message: 'Por favor, ingresa el código de 6 dígitos.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    console.log('Verificando código:', this.verificationCode);

    if (this.mode === 'recovery') {
      // Modo recuperación: redirigir a reset-password
      const alert = await this.alertController.create({
        header: '¡Código verificado!',
        message: 'Ahora puedes establecer tu nueva contraseña.',
        buttons: ['Continuar'],
      });
      await alert.present();

      // Redirigir a reset-password con parámetros
      this.router.navigate(['/auth/reset-password'], {
        queryParams: {
          contact: this.recoveryContact,
          method: this.recoveryMethod,
        },
      });
    } else {
      // Modo registro: redirigir a login
      const alert = await this.alertController.create({
        header: '¡Cuenta verificada!',
        message:
          'Tu cuenta ha sido verificada exitosamente. Ahora puedes iniciar sesión.',
        buttons: ['Continuar'],
      });
      await alert.present();

      this.router.navigate(['/auth/login']);
    }
  }

  async resendCode() {
    if (this.countdown > 0) return;

    const message =
      this.mode === 'recovery'
        ? 'Se ha enviado un nuevo código de recuperación.'
        : 'Se ha enviado un nuevo código de verificación.';

    const alert = await this.alertController.create({
      header: 'Código reenviado',
      message: message,
      buttons: ['OK'],
    });
    await alert.present();

    this.startCountdown();
  }

  private startCountdown() {
    this.countdown = 60;
    this.countdownInterval = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        clearInterval(this.countdownInterval);
      }
    }, 1000);
  }

  goBack() {
    if (this.mode === 'recovery') {
      this.router.navigate(['/auth/forgot-password']);
    } else {
      this.router.navigate(['/auth/login']);
    }
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  onCodeInput(event: any) {
    // Solo permitir números y máximo 6 dígitos
    let value = event.target.value.replace(/[^0-9]/g, '');
    if (value.length > 6) {
      value = value.substring(0, 6);
    }
    this.verificationCode = value;
    event.target.value = value;
  }

  // Getters para el template
  get pageTitle() {
    return this.mode === 'recovery'
      ? 'Recuperar Contraseña'
      : 'Verificar Cuenta';
  }

  get pageSubtitle() {
    return this.mode === 'recovery'
      ? 'Ingresa el código que te enviamos para recuperar tu contraseña'
      : 'Confirma tu identidad para activar tu cuenta';
  }

  get primaryColor() {
    return this.mode === 'recovery' ? 'warning' : 'primary';
  }

  get iconName() {
    return this.mode === 'recovery'
      ? 'key-outline'
      : 'shield-checkmark-outline';
  }

  private addIcons() {
    addIcons({
      'refresh-outline': refreshOutline,
    });
  }
}
