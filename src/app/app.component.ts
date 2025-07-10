import { Component } from '@angular/core';
import { IonApp, IonContent, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonContent, IonButton],
})
export class AppComponent {
  constructor() {}
}
