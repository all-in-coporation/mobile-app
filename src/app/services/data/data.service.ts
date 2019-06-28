import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/User';
import { environment } from '../../../environments/environment';
import { AuthService } from '../auth/auth.service';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Authorization': this.authService.JWT
    })
  };

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private storage: Storage
  ) {}

  /**
   * This method returns logged user
   *
   * @return Observable<User>
   */
  getCurrentUser(): Promise<User> {
    const self = this;

    return new Promise<User>(function(solve, reject)  {
      self.storage.get('current_user').then((user: User) => {
        if (user && user._id === self.authService.user.UserId) {
          solve(user);
        } else {
          self.http.get(environment.backConnectorURL + '/users/' + self.authService.user.UserId, self.httpOptions).subscribe((u: any) => {
            let profilePic = 'assets/img/empty-profile.png';
            if (u.instagram) {
              profilePic = u.instagram.profile._json.data.profile_picture;
            }
            if (u.facebook) {
              profilePic = u.facebook.profile.photos[0].value;
            }
            if (u.google) {
              profilePic = u.google.profile.photos[0].value;
            }
            u.profilePic = profilePic;
            self.storage.set('current_user', u).then(() => {
              solve(u[0]);
            });
          });
        }
      });
    });
  }

  /**
   * This method allow to return an array of Users filtered by the property
   * and values passed as filter. The follwing example will return all users
   * with a name that contains the string 'Pab': `{name: 'Pab'}`
   *
   * @param filter Object
   *
   * @return Observable<Array<User>>
   */
  getUserBy(filter: Object = {}): Observable<Array<User>> {
    this.httpOptions['params'] = new HttpParams(filter);

    return this.http.get<Array<User>>(environment.backConnectorURL + '/users', this.httpOptions);
  }

  /**
   * This method allow to return an array of Users filtered by the property
   * and values passed as filter. The follwing example will return all users
   * with a name that contains the string 'Pab': `{name: 'Pab'}`
   *
   * @param filter Object
   *
   * @return Observable<Array<User>>
   */
  getActivities(filter: Object = []) {
    this.httpOptions['params'] = new HttpParams(filter);

    return this.http.get(environment.backConnectorURL + '/activities').toPromise();
  }
}
