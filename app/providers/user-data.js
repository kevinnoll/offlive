import {Injectable} from 'angular2/core';
import {Storage, LocalStorage, Events} from 'ionic-angular';


@Injectable()
export class UserData {
  static get parameters(){
    return [[Events]];
  }

  constructor(events) {
    this._favorites = [];
    this.storage = new Storage(LocalStorage);
    this.events = events;
    this.HAS_LOGGED_IN = 'hasLoggedIn';
    
    this.authRef = new Firebase("https://hakkaton.firebaseio.com");
    this.authRef.onAuth((user) => this.welcomeUser(user));
  }

  hasFavorite(sessionName) {
    return (this._favorites.indexOf(sessionName) > -1);
  }
  
  getAuthRef() {
      return this.authRef;
  }
  
  welcomeUser(user) {
      if (user) {
        if (user.provider === 'twitter') {
          this.userIsLoggedInWithTwitter(user);  
        } else if (user.provider === 'password') {
          this.userIsLoggedInWithPassword(user);
        } else if (user.provider === 'facebook') {
          this.userIsLoggedInWithFacebook(user);
        }

        this.loginDone(); 
        console.log("u are now logged in with " + user.provider + " , have phun!");
      } 
  }
  
  userIsLoggedInWithFacebook(user) {
    debugger;
  }

  addFavorite(sessionName) {
    this._favorites.push(sessionName);
  }

  removeFavorite(sessionName) {
    let index = this._favorites.indexOf(sessionName)
    if (index > -1) {
      this._favorites.splice(index, 1);
    }
  }

  login(username, password) {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.events.publish('user:login');
  }

  signup(username, password) {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.events.publish('user:signup');
  }

  logout() {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.events.publish('user:logout');
  }

  // return a promise
  hasLoggedIn() {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value;
    });
  }
}
