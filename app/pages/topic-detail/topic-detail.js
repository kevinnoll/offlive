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
    this.topic = navParams.data;
    this.messagesRef = new Firebase("https://hakkaton.firebaseio.com/topics/"+this.topic.name+"/chat");
    this.chats = [];
    this.messagesRef.on("child_added", snapshot => {
        let room = snapshot.val();
        this.chats.push(room);
    }, errorObject => {
        console.log("The firebase-read in conference-data.js failed: " + errorObject.code);
    });
  }
  
  sendMessage(message) {
      this.messagesRef.push({
          author: this.topic.topicUser,
          message: message
      })
  }
  
  
}
