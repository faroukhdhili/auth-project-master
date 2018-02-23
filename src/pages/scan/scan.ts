import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from "@angular/common/http";
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { CartPage } from '../cart/cart';
import * as firebase from 'firebase';
import { User } from './../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from './../login/login';
/**
 * Generated class for the ScanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html',
  providers: [AngularFireAuth]

})
export class ScanPage {
 
 email:String;
  quantity:number=1;
  barcode:String='';
Product={
    name:String,
    price:Number, 
    image:String,
    br:this.barcode,
    qty:this.quantity
};

products=[];
  data={ };
  info={prod:this.products,
    email:this.email};
  preis:String='';

  imagep:any='';
  name:String='';  
   index:number=0;
lastproduct={};
  constructor(public navCtrl: NavController, public navParams: NavParams ,public barcodeScanner:BarcodeScanner,
    private httpClient:HttpClient, public afAuth:AngularFireAuth,) {
      
      this.email= navParams.data.u;
      



      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScanPage');
  }
  
  






scantest (){

 console.log("the barcode is : "+this.barcode);  
  this.httpClient.get('https://faroukapi.herokuapp.com/products/'+this.barcode)
  .subscribe(
  
    (result:any)=>{
   
      this.Product={
        name:result.name,
        price:result.preis,
        image:result.image,
        br:this.barcode,
        qty:this.quantity
          };
          if (this.products.length==0){
            this.index=0;
          }
          console.log("the index is :"+this.index)
     this.products[this.index]=this.Product;
    this.lastproduct=this.products[this.index];
    this.info.prod[this.index]=this.products[this.index];
     this.index++;
    // Success! Barcode data is here
   }, (err) => {
     console.log(err);
   });














}






Scan(){


 

  this.barcodeScanner.scan().then((barcodeData) => {



    this.barcode=barcodeData.text;



  
   
    console.log("aaaaaaaaaa");
  this.httpClient.get('https://faroukapi.herokuapp.com/products/'+this.barcode)
  .subscribe(
  
    (result:any)=>{
  console.log(result.preis);
  if (this.index<0){
    this.index++;
  }
 
  this.Product={
    name:result.name,
    price:result.preis,
    image:result.image,
    br:this.barcode,
    qty:this.quantity
      };
 console.log("the index is :"+this.index);
 if (this.products.length==0){
  this.index=0;
}
      this.products[this.index]=this.Product;
      this.lastproduct=this.products[this.index];
       this.index++;




    }
  )

    
    // Success! Barcode data is here
   }, (err) => {
     console.log(err);
   });






}



private fieldArray: Array<any> = [];
private newAttribute: any = {};

addFieldValue() {

  this.fieldArray=this.products;
    this.fieldArray.push(this.newAttribute)
    
    this.newAttribute = {};
    
}

deleteFieldValue(s) {
  console.log("item number will be deleted :"+s)

    this.products.splice(s,1);
    this.index--;

console.log('last version of table ');
    for(var item of this.products){

      console.log("sss",item);
    }
   
}



addqty(element)
{

  this.products[element].qty++;
}
reduceqty(element)
{
  if(this.products[element].qty>1){
    this.products[element].qty--;
    this.info.prod[element].qty--;
  }
  
}


nextpage2(){

  console.log("aaaw     "+this.info.email)
  this.navCtrl.push(CartPage,{
    x: this.info
  }
  );
}
logOut(){
  this.afAuth.auth.signOut()
  .then(res=>{
    this.navCtrl.setRoot(LoginPage);
  })
}


}