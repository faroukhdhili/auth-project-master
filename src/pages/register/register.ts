import { User } from './../../models/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers: [AngularFireAuth]
})
export class RegisterPage {

  user = {} as User;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public afAuth:AngularFireAuth,public toast:ToastController) {
  }

// register(){
//   this.afAuth.auth.createUserWithEmailAndPassword('annous14@gmail.com','12345678');
// }

async register(user:User){
  try{
const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email ,user.password);
console.log(result);
this.toast.create({
  message:`registration succeeded `,
   duration: 3000
}).present();
}
catch (err){
  console.error(err);
}
}

}
