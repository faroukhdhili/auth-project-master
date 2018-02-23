// import { HomePage } from './../pages/home/home';
// import { RegisterPage } from './../pages/register/register';
import { LoginPage } from './../pages/login/login';
import { ScanPage } from '../pages/scan/scan';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';
import { AngularFireAuthModule  } from "angularFire2/auth";
import { MyApp } from './app.component';

import { HttpClientModule } from "@angular/common/http";
import { HttpClient } from "@angular/common/http";
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { CartPage } from '../pages/cart/cart';

const firebaseConfig: FirebaseAppConfig ={
  apiKey: 'AIzaSyDwB3aLol35Z_0Ed8v6Kz5OgA14aoIWMCE',
  authDomain: 'userauthhrw.firebaseapp.com',
  databaseURL: 'https://userauthhrw.firebaseio.com',
  projectId: 'userauthhrw',
  storageBucket: '',
  messagingSenderId: '438748756935'

}



@NgModule({
  declarations: [
  MyApp,
    LoginPage,
    ScanPage,
    CartPage
  ],
    
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    HttpClientModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    ScanPage,
    CartPage
   
  ],
  providers: [
    HttpClient,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BarcodeScanner
  ]
})
export class AppModule {}
