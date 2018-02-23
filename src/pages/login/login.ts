// import { HomePage } from './../home/home';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from './../../models/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController  } from 'ionic-angular';
import * as firebase from 'firebase';
import { ScanPage } from '../scan/scan';


@IonicPage()
@Component({
  selector: 'page-login', 
  templateUrl: 'login.html',
  providers: [AngularFireAuth]
})
export class LoginPage {

  user = {} as User;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public afAuth:AngularFireAuth,private alertCtrl: AlertController) {
  }

  loginEmailPassword(user:User){
  this.afAuth.auth.signInWithEmailAndPassword(user.email,user.password)
   .then(user => {
     console.log('Email: '+user.email + ' password: '+user.password); 
     this.navCtrl.push(ScanPage,{
       u:user.email
     });
     console.log(user)
   }).catch(err =>{
     console.log(err);
     let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'There is an error while entring the Login or Password',
      buttons: ['OK']
    });
    alert.present();
   })
  }

  loginFacebook(){
this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
.then(user =>{
  console.log(user);
  this.navCtrl.setRoot('HomePage');
  // this.navCtrl.push('HomePage');
}).catch(err=>{
  console.log(err);
})

  }

logOut(){
  this.afAuth.auth.signOut();
}

  


  register(){
    this.navCtrl.push('RegisterPage');
  }

}
