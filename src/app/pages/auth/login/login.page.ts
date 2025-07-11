import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
})
export class LoginPage {
  showPassword = false;
  rememberMe = false;

  constructor(
    private router: Router,
    private alertController: AlertController,
  ) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onLogin() {
    console.log('Iniciando sesión...');
    // Aquí iría la lógica de autenticación
  }

  onRegister() {
    console.log('Navegando a registro...');
    this.router.navigate(['/auth/register']);
  }

  onForgotPassword() {
    console.log('Navegando a recuperar contraseña...');
    this.router.navigate(['/auth/forgot-password']);
  }

  async onGoogleLogin() {
    console.log('Iniciando sesión con Google...');
    const alert = await this.alertController.create({
      header: 'Iniciar sesión con Google',
      message: 'Esta funcionalidad estará disponible próximamente.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async onFacebookLogin() {
    console.log('Iniciando sesión con Facebook...');
    const alert = await this.alertController.create({
      header: 'Iniciar sesión con Facebook',
      message: 'Esta funcionalidad estará disponible próximamente.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async onTermsAndConditions() {
    console.log('Abriendo términos y condiciones...');
    const alert = await this.alertController.create({
      header: 'Términos y Condiciones',
      message: 'Los términos y condiciones estarán disponibles próximamente.',
      buttons: ['OK'],
    });
    await alert.present();
  }
}
