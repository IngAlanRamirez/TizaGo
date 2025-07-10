import { Component } from '@angular/core';
import {
  IonApp,
  IonContent,
  IonRouterOutlet,
  IonButton,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonContent, IonRouterOutlet, IonButton],
})
export class AppComponent {
  constructor() {}
}
