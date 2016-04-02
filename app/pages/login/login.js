import {IonicApp, Page, NavController, ViewController, Modal, Events} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
import {SignupPage} from '../signup/signup';
import {UserData} from '../../providers/user-data';


@Page({
  templateUrl: 'build/pages/login/login.html'
})
export class LoginModal {
  static get parameters() {
    return [[NavController], [UserData], [ViewController], [Events]];
  }

  constructor(nav, userData, viewCtrl, events) {
    this.nav = nav;
    this.userData = userData;
    this.events = events;
    this.viewCtrl = viewCtrl;

    this.login = {};
    this.submitted = false;
    
    this.listenToLoginEvents();
  }
  
  close() {
    this.viewCtrl.dismiss();
  }

  onLogin(form) {
    this.submitted = true;

    if (form.valid) {
      this.userData.login();
      this.nav.push(TabsPage);
    }
  }

  logonWithFacebook(form) {
      //this.userData.authWithTwitter();
  }
  
  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.close();
    });
  }

  onSignup() {
    this.nav.push(SignupPage);
  }
}
