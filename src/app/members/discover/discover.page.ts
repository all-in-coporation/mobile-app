import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../services/auth/auth.service';
import { DataService } from '../../services/data/data.service';
import { User } from '../../models/User';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {

  moonIcon = 'assets/img/moon-new.png';
  user = new User();
  showMenu = false;

  constructor(
    private navCtrl: NavController,
    private dataService: DataService,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.dataService.getCurrentUser().then((data: any) => {
      this.user = data;
    });
  }

  goToProfile() {
    this.navCtrl.navigateForward(['members', 'profile']);
  }

  logout() {
    this.authService.logout();
  }
}
