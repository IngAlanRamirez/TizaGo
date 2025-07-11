import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-cliente',
  templateUrl: './register-cliente.page.html',
  styleUrls: ['./register-cliente.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
})
export class RegisterClientePage {
  currentStep = 1;
  totalSteps = 3;

  constructor(
    private router: Router,
    private alertController: AlertController,
  ) {}

  // Datos del formulario
  formData = {
    nombre: '',
    email: '',
    telefono: '',
    password: '',
    confirmPassword: '',
    direccion: {
      calle: '',
      colonia: '',
      ciudad: '',
      estado: '',
      codigoPostal: '',
    },
    acceptTerms: false,
  };

  showPassword = false;
  showConfirmPassword = false;

  get progressPercentage() {
    return (this.currentStep / this.totalSteps) * 100;
  }

  nextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  async onSubmit() {
    console.log('Crear cuenta cliente:', this.formData);

    // Simular registro exitoso
    const alert = await this.alertController.create({
      header: '¡Registro exitoso!',
      message:
        'Tu cuenta ha sido creada. Ahora necesitas verificar tu identidad.',
      buttons: ['Continuar'],
    });
    await alert.present();

    // Redirigir a verificación de cuenta
    this.router.navigate(['/auth/verify-account']);
  }

  onLogin() {
    console.log('Navegando a login...');
    this.router.navigate(['/auth/login']);
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
