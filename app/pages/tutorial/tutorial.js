import {Page, NavController, MenuController} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
import {SignupPage} from '../signup/signup';


@Page({
  templateUrl: 'build/pages/tutorial/tutorial.html'
})
export class TutorialPage {
  static get parameters() {
    return [[NavController], [MenuController]];
  }

  constructor(nav, menu) {
    this.nav = nav;
    this.menu = menu;
    this.showSkip = true;

    this.slides = [
      {
        title: "Siedeln mit <b>Marc</b>",
        description: "sheeet harter stuff.",
        image: "img/ica-slidebox-img-1.png",
      },
      {
        title: "SSIO hören",
        description: "Alle meine Fans sind maskuline Jungs",
        image: "img/ica-slidebox-img-2.png",
      },
      {
        title: " What is Ionic Platform?",
        description: "The <b>Ionic Platform</b> is a cloud platform for managing and scaling Ionic apps with integrated services like push notifications, native builds, user auth, and live updating.",
        image: "img/ica-slidebox-img-3.png",
      }
    ];
  }

  startApp() {
    this.nav.push(TabsPage);
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd;
  }

  onPageDidEnter() {
    // the left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  onPageDidLeave() {
    // enable the left menu when leaving the tutorial page
    this.menu.enable(true);
  }

}
