import { Component } from '@angular/core';
import { 
         AlertController,
         LoadingController,
         NavController, 
       } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import {LoginPage} from '../login/login';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  isValidated:boolean;
  name:string;
  email:string;
  password:string;
  password_confirmation:string;
  mobile:number;
  role:string;
  errors :string[] = [];

  latitude:number;
  longitude:number;

  constructor(public navCtrl: NavController,
              private http: HTTP,
              public loadingCtrl: LoadingController,
              private alertCtrl: AlertController) {
    this.isValidated = false;
  }

  validate():boolean{
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    this.errors = [];
    if(!re.test(this.email))
    {
      this.errors.push("Invalid Email");
    }
    if(this.password.length < 8)
    {
      this.errors.push("Password too short(8)");
    }
    if(this.name.length < 5)
    {
      this.errors.push("Name too short(5)");
    }
    if(this.mobile == null || (this.mobile < 7000000000 && this.mobile > 9999999999))
    {
      this.errors.push("Mobile number invalid");
    }

    return (!this.errors.length)?true:false;
  }


  register():void{
    
    if(this.validate())
    {
        let user:User = new User();
        user.email = this.email;
        user.password = this.password;
        user.password_confirmation = this.password_confirmation;
        user.name = this.name;
        user.mobile = this.mobile;
        user.role = this.role;

        let loader = this.loadingCtrl.create({
          content: "Registering user...",
          duration: 3000
        });
        loader.present();


        this.http.post("http://1c7f7118.ngrok.io/api/register",user,{
          'Content-type': 'application/json',
          'Accept': "application/json",
        })
        .then(response => {
          this.showAlert("Registration successful","Login to continue")
        })
        .catch(error => window.alert("error : " + JSON.stringify(error)));
    }    
  }  

  showAlert(title,message):void{
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: '',
          handler: () => {
            alert.dismiss();
            this.navCtrl.push(LoginPage);
            return false;
          }
        }
      ]
    });
    alert.present();
  }
}

export class User
{
  name:string;
  email:string;
  password:string;
  password_confirmation:string;
  mobile:number;
  role:string;
}