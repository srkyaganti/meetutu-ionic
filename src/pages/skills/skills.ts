import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';

@Component({
  selector: 'page-skills',
  templateUrl: 'skills.html',
})
export class SkillsPage {
  
  searchText:string;
  skills:string[] = [];
  matchedSkills:string[] = [];
  selectedSkills:string[] = [];
  user_id:number;
  
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private http: HTTP,
              private loadingCtrl: LoadingController,) {

    this.http.get("http://1c7f7118.ngrok.io/api/allSkills",{},{
      'Content-type': 'application/json',
      'Accept': "application/json",
    })
    .then(response => {
      this.skills = response.data.split(',');
    })
    .catch(error => window.alert("Skills error : " + JSON.stringify(error)));
    this.selectedSkills = [];
    this.selectedSkills = this.navParams.get("skills");
    this.user_id = this.navParams.get("user_id");
  }

  search():void{
    if(this.searchText != "")
    {
      this.matchedSkills = [];
      for(let i = 0; i < this.skills.length; i++)
      {
        if(this.skills[i].indexOf(this.searchText) != -1 && this.selectedSkills.indexOf(this.skills[i]) == -1)
        {
          this.matchedSkills.push(this.skills[i]);
        }
      }
    }
  }
  
  save():void{

    let loader = this.loadingCtrl.create({
      content: "Saving...",
      duration: 3000
    });
    loader.present()


    this.http.get("http://1c7f7118.ngrok.io/api/saveSkills",{skills: this.selectedSkills,user_id: this.user_id},{
      'Content-type': 'application/json',
      'Accept': "application/json",
    })
    .then(response => {
      loader.dismiss();
      window.alert(response.data);
    })
    .catch(error => window.alert("Skills error : " + JSON.stringify(error)));
  }

  removeSkill(skill):void{
    this.selectedSkills.splice(this.selectedSkills.indexOf(skill),1);
    this.search();
  }
  
  addSkill(skill) {
    this.selectedSkills.push(skill);
    this.matchedSkills.splice(this.matchedSkills.indexOf(skill), 1);
  }
}
