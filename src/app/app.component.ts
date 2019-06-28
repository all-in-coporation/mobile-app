import { Component } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private navCtrl: NavController
  ) {
    this.initializeApp();
    this.authService.authenticationState.subscribe(state => {
      // alert(state);
      if (state)   {
        this.navCtrl.navigateRoot(['members', 'discover']);
        // this.navCtrl.navigateRoot(['members', 'categories']);
        // this.navCtrl.navigateRoot(['members', 'profile']);
        // this.navCtrl.navigateRoot(['register']);
      } else {
        this.navCtrl.navigateRoot(['login']);
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
