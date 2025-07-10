import { Component } from '@angular/core';
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

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onLogin() {
    console.log('Iniciando sesión...');
    // Aquí iría la lógica de autenticación
  }

  onRegister() {
    console.log('Navegando a registro...');
    // Aquí iría la navegación al registro
  }

  onForgotPassword() {
    console.log('Navegando a recuperar contraseña...');
    // Aquí iría la navegación a recuperar contraseña
  }

  onGoogleLogin() {
    console.log('Iniciando sesión con Google...');
    // Aquí iría la lógica de autenticación con Google
  }

  onFacebookLogin() {
    console.log('Iniciando sesión con Facebook...');
    // Aquí iría la lógica de autenticación con Facebook
  }

  onTermsAndConditions() {
    console.log('Abriendo términos y condiciones...');
    // Aquí iría la navegación a términos y condiciones
  }
}
