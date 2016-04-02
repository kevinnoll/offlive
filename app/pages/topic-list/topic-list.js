import {NavController, Page, ActionSheet, Modal} from 'ionic-angular';
import {ChangeDetectorRef, ChangeDetectionStrategy} from 'angular2/core';
import {ConferenceData} from '../../providers/conference-data';
import {LoginModal} from '../login/login';
import {UserData} from '../../providers/user-data';
import {FirebaseData} from '../../providers/firebase-data'; 
import {TopicCreatePage} from '../topic-create/topic-create';

@Page({
  templateUrl: 'build/pages/topic-list/topic-list.html'
})
export class TopicListPage {
  static get parameters() {
    return [[NavController], [ConferenceData], [UserData], [FirebaseData], [ChangeDetectorRef]];
  }

  constructor(nav, confData, userData, firebaseData, ref) {
    this.nav = nav;
    this.confData = confData;
    this.ref = ref;
    this.userData = userData;
    this.firebaseData = firebaseData;
    this.slides = [
      {
        title: "Siedeln bei <b>Marc</b>?",
        description: "Suche nen Buddy zum Siedler von Catan spielen",
        image: "img/ica-slidebox-img-1.png",
      }
    ];
    
    if(!this.userData.isLoggedIn) {
        let modal = Modal.create(LoginModal);
        
        // without the setTimeout function, the modal wont work properly when closing with fresh cache.
        setTimeout( () => {
          this.nav.present(modal);
        });
    } 
    this.getDataFromGeoFire();
  }
  
  getDataFromGeoFire() {
    this.firebaseData.getGeoQuery().then(geoQuery => {
        geoQuery.on('key_entered', (k,l,d) => this.addSlide(k,l,d) );
        geoQuery.on('key_exited', (k,l,d) => this.removeSlide(k,l,d) );
    });   
  }
  
  addSlide(key,location,distance) {
      let topicRoomRef = new Firebase("https://hakkaton.firebaseio.com/topics/"+key+"/data");
      // Attach an asynchronous callback to read the data at our posts reference
      topicRoomRef.on("value", (snapshot) => {
        let topicName = snapshot.val().name,
            topicDesc = snapshot.val().desc,
            topicUser = snapshot.val().username;
        let distanceInMeters = Math.round(distance*1000);
        this.slides.push({ name: key, lat: location[0], lon : location[1], distanceInMeters, topicName, topicDesc, topicUser});
        this.slides.sort(function(a,b){
          return a.distanceInMeters - b.distanceInMeters;
        })
        this.ref.markForCheck();

      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
      
  }
  
  removeSlide(key,location,distance) {
      this.rooms.splice(this.rooms.findIndex(r => r.name === key),1);
      this.ref.markForCheck();
  }
  
  openCreateTopicPage() {
    this.nav.push(TopicCreatePage);
  }

  goToSessionDetail(session) {
    //this.nav.push(SessionDetailPage, session);
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd;
  }
}
