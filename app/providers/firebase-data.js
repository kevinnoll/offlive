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
        debugger;
        this.http = http;
        this.userData = userData;
        this.firebaseRef = new Firebase("https://hakkaton.firebaseio.com/geofire");
        this.geoFire = new GeoFire(this.firebaseRef);
        this.geoQuery = this.geoFire.query( { center: [0,0], radius: 100 } );
        this.center;
    }
    
    getGeoRef() {
        return this.geoFire;
    }
  
    getCenterForMap() {
        return { lat: this.center[0], lng: this.center[1] };
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

    createTopic() {
      debugger;
        this.geoFire.set("topic" + Math.floor(Math.random()*100), this.center);
    }
    
    destroyRoom(key) {
        this.geoFire.remove(key);
    }
}