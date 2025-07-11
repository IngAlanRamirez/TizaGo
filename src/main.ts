import { bootstrapApplication } from '@angular/platform-browser';
import {
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
  PreloadAllModules,
} from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  restaurantOutline,
  mailOutline,
  lockClosedOutline,
  logInOutline,
  personAddOutline,
  logoGoogle,
  logoFacebook,
  eyeOutline,
  eyeOffOutline,
  personOutline,
  callOutline,
  locationOutline,
  businessOutline,
  mapOutline,
  storefrontOutline,
  storefront,
  pricetag,
  pricetagOutline,
  timeOutline,
  checkmarkCircleOutline,
  checkmarkOutline,
  arrowBackOutline,
  arrowForwardOutline,
  chevronForwardOutline,
} from 'ionicons/icons';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

// Registrar iconos globalmente
addIcons({
  restaurant: restaurantOutline,
  'mail-outline': mailOutline,
  'lock-closed-outline': lockClosedOutline,
  'log-in-outline': logInOutline,
  'person-add-outline': personAddOutline,
  'logo-google': logoGoogle,
  'logo-facebook': logoFacebook,
  'eye-outline': eyeOutline,
  'eye-off-outline': eyeOffOutline,
  'person-outline': personOutline,
  'call-outline': callOutline,
  'location-outline': locationOutline,
  'business-outline': businessOutline,
  'map-outline': mapOutline,
  'storefront-outline': storefrontOutline,
  storefront: storefront,
  pricetag: pricetag,
  'pricetag-outline': pricetagOutline,
  'time-outline': timeOutline,
  'checkmark-circle-outline': checkmarkCircleOutline,
  'checkmark-outline': checkmarkOutline,
  'arrow-back-outline': arrowBackOutline,
  'arrow-forward-outline': arrowForwardOutline,
  'chevron-forward-outline': chevronForwardOutline,
});

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});
