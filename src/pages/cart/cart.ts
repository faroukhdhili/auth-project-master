import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as WavesAPI from 'waves-api' ;
import { HttpClient } from "@angular/common/http";
import { ScanPage } from '../scan/scan';
import * as firebase from 'firebase';
import { User } from './../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from './../login/login';
/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
  providers: [AngularFireAuth]
})
export class CartPage {
  
  user= {} as User;
  
  email:String;
  Waves = WavesAPI.create(WavesAPI.TESTNET_CONFIG);
  transferData:{};
  transfer:string;
   anotherSeed = this.Waves.Seed.fromExistingPhrase('attend tip visual pen spin absorb wool hope injury soup unknown learn power mechanic inner');
clientadress:String="";
products=[];
topay:number=0;
info={prod:[],
  email:this.email};
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private httpClient:HttpClient, public afAuth:AngularFireAuth,) {
     this.info =navParams.data.x;
    this.products = this.info.prod;
      this.email=this.info.email;

      
    for(var item of this.products){

this.topay=item.price*item.qty+this.topay;
   
    }

    console.log("amount to pay : "+this.topay)
   
      console.log("the email is here ! : "+this.email);
  
  }

  

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }
  


  bezahlen(){
    this.transferData = {
   
       // An arbitrary address; mine, in this example
       recipient: this.clientadress,
   
       // ID of a token, or WAVES
       assetId: 'WAVES',
       
       // The real amount is the given number divided by 10^(precision of the token)
       amount: 100000000,
   
       // The same rules for these two fields
       feeAssetId: 'WAVES',
       fee: 100000,
   
       // 140 bytes of data (it's allowed to use Uint8Array here) 
       attachment: '',
       
       timestamp: Date.now()
   
   };
   
   this.transfer=this.Waves.API.Node.v1.assets.transfer(this.transferData, this.anotherSeed.keyPair).then((responseData) => {
       console.log(responseData);
   });
 }
 

 buyp(barcode,quantity){
  

  this.httpClient.post('https://faroukapi.herokuapp.com/orders/'+barcode+'/'+quantity, {
   
    
   
  })
    .subscribe(
      res => {
        
        console.log(res);
      },
      err => {
        console.log("Error occured");
      }
    );

}






purchase(){

for(var item of this.products)
{
 this.buyp(item.br,item.qty);


}


}

returnpage(){
  this.navCtrl.push(ScanPage);

  
}




logOut(){
  this.afAuth.auth.signOut()
  .then(res=>{
    this.navCtrl.setRoot(LoginPage);
  })
}


}
