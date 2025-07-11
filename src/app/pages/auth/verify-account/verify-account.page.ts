import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

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
export class VerifyAccountPage {
  selectedMethod: 'email' | 'sms' = 'email';
  verificationCode = '';
  userEmail = 'usuario@ejemplo.com'; // Esto vendría del registro
  userPhone = '+52 555 123 4567'; // Esto vendría del registro
  isCodeSent = false;
  countdown = 0;
  private countdownInterval: any;

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
    private alertController: AlertController,
  ) {}

  selectMethod(method: 'email' | 'sms') {
    this.selectedMethod = method;
    this.isCodeSent = false;
    this.verificationCode = '';
  }

  async sendVerificationCode() {
    console.log(`Enviando código por ${this.selectedMethod}...`);

    // Simular envío de código
    const alert = await this.alertController.create({
      header: 'Código enviado',
      message: `Se ha enviado un código de verificación a tu ${this.selectedMethod === 'email' ? 'correo electrónico' : 'teléfono'}.`,
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

    // Simular verificación exitosa
    const alert = await this.alertController.create({
      header: '¡Cuenta verificada!',
      message:
        'Tu cuenta ha sido verificada exitosamente. Ahora puedes iniciar sesión.',
      buttons: ['Continuar'],
    });
    await alert.present();

    // Redirigir al login después de verificación exitosa
    this.router.navigate(['/auth/login']);
  }

  async resendCode() {
    if (this.countdown > 0) return;

    const alert = await this.alertController.create({
      header: 'Código reenviado',
      message: 'Se ha enviado un nuevo código de verificación.',
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
    this.router.navigate(['/auth/login']);
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
}
