import {NavController, Page, ActionSheet} from 'ionic-angular';
import {ConferenceData} from '../../providers/conference-data';
import {SpeakerDetailPage} from '../speaker-detail/speaker-detail';
import {SessionDetailPage} from '../session-detail/session-detail';


@Page({
  templateUrl: 'build/pages/topic-list/topic-list.html'
})
export class TopicListPage {
  static get parameters() {
    return [[NavController], [ConferenceData]];
  }

  constructor(nav, confData) {
    this.nav = nav;
    this.confData = confData;
    this.speakers = [];
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
    confData.getSpeakers().then(speakers => {
      this.speakers = speakers;
    });
  }

  goToSessionDetail(session) {
    this.nav.push(SessionDetailPage, session);
  }

  goToSpeakerDetail(speakerName) {
    this.nav.push(SpeakerDetailPage, speakerName);
  }

  goToSpeakerTwitter(speaker) {
    window.open(`https://twitter.com/${speaker.twitter}`);
  }

 onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd;
  }


  openSpeakerShare(speaker) {
    let actionSheet = ActionSheet.create({
      title: 'Share ' + speaker.name,
      buttons: [
        {
          text: 'Copy Link',
          handler: () => {
            console.log("Copy link clicked on https://twitter.com/" + speaker.twitter);
            if (window.cordova && window.cordova.plugins.clipboard) {
              window.cordova.plugins.clipboard.copy("https://twitter.com/" + speaker.twitter);
            }
          }
        },
        {
          text: 'Share via ...',
          handler: () => {
            console.log("Share via clicked");
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log("Cancel clicked");
          }
        },
      ]
    });

    this.nav.present(actionSheet);
  }
}
