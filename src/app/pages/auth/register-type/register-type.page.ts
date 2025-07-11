import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonIcon,
  IonCard,
  IonCardContent,
  IonButton,
  IonTitle,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-register-type',
  templateUrl: './register-type.page.html',
  styleUrls: ['./register-type.page.scss'],
  standalone: true,
  imports: [
    IonTitle,
    CommonModule,
    FormsModule,
    IonContent,
    IonIcon,
    IonCard,
    IonCardContent,
    IonButton,
  ],
})
export class RegisterTypePage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  onSelectClientRegister() {
    this.router.navigate(['/auth/register-cliente']);
  }

  onSelectBusinessRegister() {
    this.router.navigate(['/auth/register-negocio']);
  }

  onLogin() {
    this.router.navigate(['/auth/login']);
  }
}
