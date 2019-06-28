import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }, {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule',
  }, {
    path: 'profile',
    loadChildren: './profile/profile.module#ProfilePageModule',
  }, {
    path: 'discover',
    loadChildren: './discover/discover.module#DiscoverPageModule'
  }, {
    path: 'categories',
    loadChildren: './categories/categories.module#CategoriesPageModule'
  },
  { path: 'activity-detail', loadChildren: './activity-detail/activity-detail.module#ActivityDetailPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MemberRoutingModule { }
