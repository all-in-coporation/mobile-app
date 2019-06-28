import { Platform, AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';
import { environment } from '../../../environments/environment';
import { tap, catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

const TOKEN_KEY = 'access_token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = environment.backConnectorURL;
  jwtUser = null;
  user = null;
  authenticationState = new BehaviorSubject(false);
  JWT: string;

  constructor(
    private http: HttpClient,
    private helper: JwtHelperService,
    private storage: Storage,
    private plt: Platform,
    private alertController: AlertController,
    private cookie: CookieService
  ) {
    this.checkToken();
    this.plt.ready().then(() => {
      this.storage.get(TOKEN_KEY).then(data => {
        if (this.cookie.check('all-in-night-jwt') && !data) {
          this.storage.set(TOKEN_KEY, this.cookie.get('all-in-night-jwt')).then(() => {
            this.checkToken();
          });
        }
      });
    });
  }

  checkToken() {
    this.storage.get(TOKEN_KEY).then(token => {
      this.JWT = token;
      if (token) {
        const decoded = this.helper.decodeToken(token);
        const isExpired = this.helper.isTokenExpired(token);

        if (!isExpired) {
          this.jwtUser = decoded;
          this.authenticationState.next(true);
        } else {
          this.storage.remove(TOKEN_KEY);
        }
      }
    });
  }

  register(credentials) {
    return this.http.post(`${this.url}/api/register`, credentials).pipe(
      catchError(e => {
        this.showAlert(e.error.msg);
        throw new Error(e);
      })
    );
  }

  login(credentials) {

    return this.http.post(`${this.url}/auth/${credentials.type}`, credentials)
      .pipe(
        tap(res => {
          console.log(res);
          if (['all-in-night-jwt']) {
            console.warn(res['all-in-night-jwt']);
            this.storage.set(TOKEN_KEY, res['all-in-night-jwt']).then(() => {
            });
            this.jwtUser = this.helper.decodeToken(res['all-in-night-jwt']);
            this.authenticationState.next(true);
          } else {

          }
        }),
        catchError(e => {
          console.error(e);
          this.showAlert(e.error.text);
          throw e;
        })
      );
  }

  logout() {
    this.storage.remove(TOKEN_KEY).then(() => {
      this.storage.remove('current_user');
      this.cookie.delete('all-in-night-jwt');
      this.authenticationState.next(false);
    });
  }

  isAuthenticated() {
    // return this.authenticationState.value;
    return true;
  }

  showAlert(msg) {
    const alert = this.alertController.create({
      message: msg,
      header: 'Error',
      buttons: ['OK']
    });
    alert.then(alertMsg => alertMsg.present());
  }
}
