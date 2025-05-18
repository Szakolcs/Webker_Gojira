import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({eventCoalescing: true}), provideRouter(routes), provideFirebaseApp(() => initializeApp({
    projectId: "webker-gojira",
    appId: "1:807055938407:web:d226209a65eed214b055c2",
    storageBucket: "webker-gojira.firebasestorage.app",
    apiKey: "AIzaSyDASZ9KMwqT2bS5-1ONmEn9LoidGwkuhZc",
    authDomain: "webker-gojira.firebaseapp.com",
    messagingSenderId: "807055938407"
  })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
