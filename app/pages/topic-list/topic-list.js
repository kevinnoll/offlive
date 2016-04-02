import {NavController, Page, ActionSheet, Modal} from 'ionic-angular';
import {ConferenceData} from '../../providers/conference-data';
import {LoginModal} from '../login/login';
import {UserData} from '../../providers/user-data';

@Page({
  templateUrl: 'build/pages/topic-list/topic-list.html'
})
export class TopicListPage {
  static get parameters() {
    return [[NavController], [ConferenceData], [UserData]];
  }

  constructor(nav, confData, userData) {
    this.nav = nav;
    this.confData = confData;
    this.userData = userData;
    this.slides = [
      {
        title: "Siedeln bei <b>Marc</b>?",
        description: "Suche nen Buddy zum Siedler von Catan spielen",
        image: "img/ica-slidebox-img-1.png",
      },
      {
        title: "SSIO",
        description: "<b>Ionic Framework</b> is an open source SDK that enables developers to build high quality mobile apps with web technologies like HTML, CSS, and JavaScript.",
        image: "img/ica-slidebox-img-2.png",
      },
      {
        title: "Drogen kaufen im Park?",
        description: "Ich hab alles da, diggah!",
        image: "img/ica-slidebox-img-3.png",
      }
    ];
    
    if(!this.userData.isLoggedIn) {
        let modal = Modal.create(LoginModal);
        
        // without the setTimeout function, the modal wont work properly when closing with fresh cache.
        setTimeout( () => {
          this.nav.present(modal);
        });
    }

  }

  goToSessionDetail(session) {
    //this.nav.push(SessionDetailPage, session);
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd;
  }
}
