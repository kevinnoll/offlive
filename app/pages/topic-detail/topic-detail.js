import {NavController, NavParams, Page, ActionSheet, Modal} from 'ionic-angular';
import {UserData} from '../../providers/user-data';
import {FirebaseData} from '../../providers/firebase-data'; 

@Page({
  templateUrl: 'build/pages/topic-detail/topic-detail.html'
})
export class TopicDetailPage {
  static get parameters() {
    return [[NavController], [NavParams], [UserData], [FirebaseData]];
  }

  constructor(nav, navParams, userData, firebaseData) {
    this.nav = nav;
    this.userData = userData;
    this.firebaseData = firebaseData;
    this.topic = navParams.topic;
  }
  
}
