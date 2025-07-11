import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
})
export class ForgotPasswordPage {
  recoveryMethod: 'email' | 'phone' = 'email';
  emailOrPhone = '';
  isValidInput = false;

  constructor(
    private router: Router,
    private alertController: AlertController,
  ) {}

  selectMethod(method: 'email' | 'phone') {
    this.recoveryMethod = method;
    this.emailOrPhone = '';
    this.isValidInput = false;
  }

  onInputChange(event: any) {
    const value = event.target.value;
    this.emailOrPhone = value;

    if (this.recoveryMethod === 'email') {
      // Validación básica de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.isValidInput = emailRegex.test(value);
    } else {
      // Validación básica de teléfono (números y ciertos caracteres)
      const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
      this.isValidInput = phoneRegex.test(value);
    }
  }

  async sendRecoveryCode() {
    if (!this.isValidInput) {
      const alert = await this.alertController.create({
        header: 'Datos inválidos',
        message: `Por favor, ingresa un ${this.recoveryMethod === 'email' ? 'correo electrónico' : 'número de teléfono'} válido.`,
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    console.log(
      `Enviando código de recuperación por ${this.recoveryMethod} a:`,
      this.emailOrPhone,
    );

    // Simular búsqueda de usuario
    const alert = await this.alertController.create({
      header: 'Código enviado',
      message: `Se ha enviado un código de recuperación a tu ${this.recoveryMethod === 'email' ? 'correo electrónico' : 'teléfono'}.`,
      buttons: ['Continuar'],
    });
    await alert.present();

    // Navegar a verificación en modo recuperación
    this.router.navigate(['/auth/verify-account'], {
      queryParams: {
        mode: 'recovery',
        method: this.recoveryMethod,
        contact: this.emailOrPhone,
      },
    });
  }

  goBack() {
    this.router.navigate(['/auth/login']);
  }

  goToLogin() {
    this.router.navigate(['/auth/login']);
  }
}
