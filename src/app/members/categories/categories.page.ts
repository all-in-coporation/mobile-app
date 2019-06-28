import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  activities = [];

  constructor(public data: DataService) {}

  ngOnInit() {
    this.data.getActivities().then(a => {
      this.activities = a['data'];

    }).catch(e =>{
      alert(e);
      console.error(e);
    });
  }
}
