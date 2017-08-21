import { Component } from '@angular/core';
import { MenuController, NavController } from 'ionic-angular';
import { Diagnostic } from '@ionic-native/diagnostic';
import { AlertController, Platform } from 'ionic-angular';
import { File } from '@ionic-native/file';

import { RegisterPage } from '../register/register';
import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';
import { AboutPage } from '../about/about';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
    private diagnostic: Diagnostic,
    private alertCtrl: AlertController,
    private platform: Platform,
    private menuCtrl: MenuController,
    private file: File) {

      this.initializeApp();
    this.menuCtrl.enable(false);
  }


  initializeApp() {
    this.platform.ready().then(() => {
      
      this.diagnostic.isLocationEnabled()
      .then((locationStatus)=>{
        if(!locationStatus)
          this.showLocationAlert('Location required!','Please turn on location to continue');
      });

      this.trySilentLogin();

    });    
  }

  about():void{
    this.navCtrl.push(AboutPage);
  }
  
  trySilentLogin():void{
    this.file.checkFile(this.file.externalApplicationStorageDirectory,"token.txt")
    .then((fileExists)=>{
      if(fileExists)
      {
        this.file.readAsText(this.file.externalApplicationStorageDirectory,"token.txt")
        .then(token => this.navCtrl.setRoot(ProfilePage,{token:token}))
        .catch(error => console.log(error));
      }
    })  
    .catch(error=>{});
  }

  signIn():void{
    this.navCtrl.push(LoginPage);
  }

  signUp():void{
    this.navCtrl.push(RegisterPage);
  }

  showLocationAlert(title,message):void{
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: 'Turn on',
          handler: () => {
            alert.dismiss();
            this.diagnostic.switchToLocationSettings();
            return false;
          }
        }
      ]
    });
    alert.present();
  }
}
