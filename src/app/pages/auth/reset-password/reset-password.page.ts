import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
})
export class ResetPasswordPage implements OnInit {
  newPassword = '';
  confirmPassword = '';
  showPassword = false;
  showConfirmPassword = false;
  userContact = '';
  recoveryMethod: 'email' | 'phone' = 'email';

  // Validaciones
  passwordStrength = {
    hasMinLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alertController: AlertController,
  ) {}

  ngOnInit() {
    // Obtener parámetros de la verificación
    this.route.queryParams.subscribe((params) => {
      this.userContact = params['contact'] || '';
      this.recoveryMethod = params['method'] || 'email';
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onPasswordChange() {
    const password = this.newPassword;

    this.passwordStrength = {
      hasMinLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
  }

  isPasswordValid(): boolean {
    return Object.values(this.passwordStrength).every((valid) => valid);
  }

  isFormValid(): boolean {
    return (
      this.isPasswordValid() &&
      this.newPassword === this.confirmPassword &&
      this.confirmPassword !== ''
    );
  }

  getPasswordStrengthColor(): string {
    const validCount = Object.values(this.passwordStrength).filter(
      (valid) => valid,
    ).length;

    if (validCount <= 2) return 'danger';
    if (validCount <= 4) return 'warning';
    return 'success';
  }

  getPasswordStrengthText(): string {
    const validCount = Object.values(this.passwordStrength).filter(
      (valid) => valid,
    ).length;

    if (validCount <= 2) return 'Débil';
    if (validCount <= 4) return 'Buena';
    return 'Fuerte';
  }

  getPasswordStrengthProgress(): number {
    return (
      Object.values(this.passwordStrength).filter((valid) => valid).length / 5
    );
  }

  async resetPassword() {
    if (!this.isFormValid()) {
      const alert = await this.alertController.create({
        header: 'Error en la contraseña',
        message:
          'Por favor, verifica que la contraseña cumple todos los requisitos y que ambas contraseñas coinciden.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    console.log('Estableciendo nueva contraseña para:', this.userContact);

    // Simular actualización de contraseña
    const alert = await this.alertController.create({
      header: '¡Contraseña actualizada!',
      message:
        'Tu contraseña ha sido cambiada exitosamente. Ahora puedes iniciar sesión con tu nueva contraseña.',
      buttons: ['Continuar'],
    });
    await alert.present();

    // Redirigir al login
    this.router.navigate(['/auth/login']);
  }

  goToLogin() {
    this.router.navigate(['/auth/login']);
  }
}
