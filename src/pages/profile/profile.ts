import { Component } from '@angular/core';
import { MenuController, NavController, NavParams } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { File } from '@ionic-native/file';
import { AlertController } from 'ionic-angular';

import {SkillsPage} from '../skills/skills';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  role:string = "Teach";
  HTTPResponse:string;
  token:string;
  user:User = new User();
  skills:string[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private menuCtrl: MenuController,
              private alertCtrl: AlertController,
              private http: HTTP,
              private file:File) {
    this.menuCtrl.enable(true);

    this.loadUser();
  }

  loadUser():void{
    this.file.readAsText(this.file.externalApplicationStorageDirectory,"token.txt")
    .then(token => {
      this.http.post("http://1c7f7118.ngrok.io/api/user",{ token: token },{
        'Content-type': 'application/json',
        'Accept': "application/json",
      })
      .then(response => {
        
        let data = JSON.parse(response.data);
        this.user.id = data.id;
        this.user.name = data.name;
        this.user.mobile = data.mobile;
        this.user.email = data.email;
        this.user.role = data.role;

        this.http.get("http://1c7f7118.ngrok.io/api/skills",{ id: this.user.id },{
          'Content-type': 'application/json',
          'Accept': "application/json",
        })
        .then(response => {
          this.skills = response.data.split(',');
          
        })
        .catch(error => window.alert("error in skills is : " + JSON.stringify(error)));
        
      })
      .catch((error)=>window.alert(JSON.stringify(error)));
    })
    .catch(error => console.log(error));
  }

  editItems():void{
    this.navCtrl.push(SkillsPage,{user_id: this.user.id ,skills:this.skills});
  }
}

export class User{
  id:number;
  name:string;
  email:string;
  mobile:string;
  role:string;
}
