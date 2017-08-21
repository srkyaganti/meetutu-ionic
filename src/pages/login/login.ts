import { Component } from '@angular/core';
import {
        LoadingController,
        NavController,
       } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { File } from '@ionic-native/file';

import { ProfilePage } from '../profile/profile';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  email:string;
  password:string;
  constructor(public navCtrl: NavController,
              private http: HTTP,
              public loadingCtrl: LoadingController,
              private file: File) { }

  signIn():void{

    let user:User = new User();
    
    user.email = this.email;
    user.password = this.password;

    let loader = this.loadingCtrl.create({
      content: "Logging in...",
      duration: 3000
    });
    loader.present()
    .then(() => {
      
      this.http.post("http://1c7f7118.ngrok.io/api/login",user,{
        'Content-type': 'application/json',
        'Accept': "application/json",
      })
      .then(token => {
        loader.dismiss();

        if(token.data == "")
        {
          this.email = "";
          this.password = "";
          window.alert("Invalid credentials");
        }
        else
        {
          this.file.writeExistingFile(this.file.externalApplicationStorageDirectory,"token.txt",token.data)
          .then(()=>this.navCtrl.setRoot(ProfilePage));
        }
      })
      .catch(error => window.alert("error : " + JSON.stringify(error)));

    })

    
  }

}

export class User
{
  email:string;
  password:string;  
}
