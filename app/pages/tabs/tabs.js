import {Page, NavParams, Modal} from 'ionic-angular';
import {SchedulePage} from '../schedule/schedule';
import {SpeakerListPage} from '../speaker-list/speaker-list';
import {MapPage} from '../map/map';
import {AboutPage} from '../about/about';
import {LoginModal} from '../login/login';
import {UserData} from '../../providers/user-data';

@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  static get parameters() {
    return [[NavParams],[UserData]];
  }

  constructor(navParams, userData) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
    this.userData = userData;

    if(!this.userData.isLoggedIn) {
        let modal = Modal.create(LoginModal);
        // without the setTimeout function, the modal wont work properly when closing with fresh cache.
        setTimeout( () => {
          this.nav.present(modal);
        });
    }

    // set the root pages for each tab
    this.tab1Root = SchedulePage;
    this.tab2Root = SpeakerListPage;
    this.tab3Root = MapPage;
    this.tab4Root = AboutPage;
  }
}
