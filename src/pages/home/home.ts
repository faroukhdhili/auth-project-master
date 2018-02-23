import { LoginPage } from './../login/login';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [AngularFireAuth]
})
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public afAuth:AngularFireAuth, public toast:ToastController) {
  }

  ionViewDidLoad() {
   this.afAuth.authState.subscribe(data => {
     if (data && data.email && data.uid){ 
    this.toast.create({
      message:`${data.email} is now Connected `,
       duration: 3000
    }).present();
  }else {
    this.toast.create({
      message:`Could not find Authentication details `,
       duration: 3000
    }).present();
  }

   });
  }

  logOut(){
    this.afAuth.auth.signOut()
    .then(res=>{
      this.navCtrl.setRoot(LoginPage);
    })
  }


}
