import { Component } from '@angular/core';
import { IonApp, IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonContent],
})
export class AppComponent {
  constructor() {}
}
