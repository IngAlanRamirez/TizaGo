import { Component } from '@angular/core';
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

  onSubmit() {
    console.log('Crear cuenta cliente:', this.formData);
    // Aquí iría la lógica de registro
  }

  onLogin() {
    console.log('Navegando a login...');
    // Aquí iría la navegación al login
  }

  onTermsAndConditions() {
    console.log('Abriendo términos y condiciones...');
    // Aquí iría la navegación a términos y condiciones
  }
}
