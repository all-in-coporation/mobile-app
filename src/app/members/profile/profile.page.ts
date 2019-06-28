import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from '../../services/data/data.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user: User;

  constructor (
    public translate: TranslateService,
    public data: DataService,
    private navCtrl: NavController
  ) {}

  ngOnInit () {
    this.data.getCurrentUser().then(user => {
      this.user = user;
    });
  }

  goToProfile() {
    this.navCtrl.navigateForward(['/profile', 'pablo-picatto']);
  }
}
