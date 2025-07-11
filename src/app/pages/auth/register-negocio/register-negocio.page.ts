import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-negocio',
  templateUrl: './register-negocio.page.html',
  styleUrls: ['./register-negocio.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
})
export class RegisterNegocioPage {
  currentStep = 1;
  totalSteps = 4;

  // Datos del formulario
  formData = {
    nombreNegocio: '',
    representante: '',
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
    tipoNegocio: '',
    categoria: '',
    horarioApertura: '',
    horarioCierre: '',
    acceptTerms: false,
  };

  showPassword = false;
  showConfirmPassword = false;

  tiposNegocio = [
    'Restaurante',
    'Cafetería',
    'Panadería',
    'Farmacia',
    'Tienda de conveniencia',
    'Supermercado',
    'Otro',
  ];

  categorias = [
    'Comida rápida',
    'Comida mexicana',
    'Comida italiana',
    'Comida china',
    'Postres',
    'Bebidas',
    'Medicamentos',
    'Abarrotes',
    'Otro',
  ];

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
    console.log('Crear cuenta negocio:', this.formData);
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
