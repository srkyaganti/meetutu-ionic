import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { HTTP } from '@ionic-native/http';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  latitude:number;
  longitude:number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              // private http: HTTP,
              private geolocation: Geolocation) {
                this.getLocation();
                
                // this.geolocation.getCurrentPosition({enableHighAccuracy:true})
                // .then((resp) => {
                //   this.latitude = resp.coords.latitude;
                //   this.longitude = resp.coords.longitude;
                //   window.alert(this.latitude + this.longitude);
                //   // // this.showAlert();
                //   // this.http.get("http://1c7f7118.ngrok.io/api/getUsers",{ latitude: this.latitude, longitude: this.longitude },{
                //   //   'Content-type': 'application/json',
                //   //   'Accept': "application/json",
                //   // })
                //   // .then(response => {
                    
            
                    
                //   // })
                //   // .catch(error => window.alert("error : " + JSON.stringify(error)));
                  
                // })
                // .catch((error)=>window.alert(JSON.stringify(error)));          
  }

  getLocation():void{
    this.geolocation.getCurrentPosition()
    .then((resp)=>{
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      window.alert(this.latitude + this.longitude);
    })
    .catch(error => window.alert("error : " + error.code));
  }
}
