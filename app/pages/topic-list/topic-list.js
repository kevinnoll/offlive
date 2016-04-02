import {NavController, Page, ActionSheet} from 'ionic-angular';
import {ConferenceData} from '../../providers/conference-data';

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
  }

  goToSessionDetail(session) {
    this.nav.push(SessionDetailPage, session);
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd;
  }
}
