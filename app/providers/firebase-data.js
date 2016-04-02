import {Injectable, Inject} from 'angular2/core';
import {Http} from 'angular2/http';
import {UserData} from './user-data';

var Firebase = require("firebase");
var GeoFire = require("geofire");


@Injectable()
export class FirebaseData {
    static get parameters(){
      return [[Http], [UserData]];
    }
    
    constructor(http, userData) {
        // inject the Http provider and set to this instance
        this.http = http;
        this.userData = userData;
        this.firebaseRef = new Firebase("https://hakkaton.firebaseio.com/geofire");
        this.dataRef = new Firebase("https://hakkaton.firebaseio.com/");
        this.geoFire = new GeoFire(this.firebaseRef);
        this.geoQuery = this.geoFire.query( { center: [0,0], radius: 100 } );
        this.center;
        /*let options = { timeout: 10000, enableHighAccuracy: false };
        navigator.geolocation.getCurrentPosition(position => {
          this.center = [ position.coords.latitude, position.coords.longitude ];
          this.geoQuery.updateCriteria( { center: this.center } );
        }, null, options);*/
    }
    
    getGeoRef() {
        return this.geoFire;
    }
  
    getCenterForMap() {
        return { lat: this.center[0], lng: this.center[1] };
    }
    
    getCenter() {
      return this.center;
    }

    getGeoQuery() {
        return new Promise(resolve => {
            let options = { timeout: 10000, enableHighAccuracy: false };
            navigator.geolocation.getCurrentPosition(position => {
                this.center = [ position.coords.latitude, position.coords.longitude ];
                this.geoQuery.updateCriteria( { center: this.center } );
                resolve(this.geoQuery);
            }, null, options);
        });
    }

    createTopic(data) {
      let id = Math.floor(Math.random()*100),
        sId = "topic"+id;
      data["uid"] = this.userData.getUID();
      data["username"] = this.userData.getUsername();
      this.dataRef.child("topics/"+sId+"/data").set(data);
      this.geoFire.set(sId, this.center);
      this.events.publish('topic:added');
    }
    
    destroyRoom(key) {
        this.geoFire.remove(key);
    }
}