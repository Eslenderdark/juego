import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { IonContent, IonToolbar, IonTitle, IonButton } from '@ionic/angular/standalone'


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [IonContent, IonToolbar, IonTitle, IonButton]

})
export class LoginPage {
  constructor(private auth: AuthService, @Inject(DOCUMENT) public document: Document) { }

  public user: any;
  public usuario: any;

  async ngOnInit() {
    this.auth.user$.subscribe((data) => {
      this.user = data;
      console.log(this.user);
      this.usuario = {
        name: this.user.given_name,
        email: this.user.email,
        foto: this.user.picture,
      };
    });
  }
  

  
  login() {
    this.auth.loginWithRedirect({
      appState: {
        target: '/home'
      }
    });
  }

  logout() {
    this.auth.logout({
      logoutParams: {
        returnTo: this.document.location.origin
      }
    });
  }
}
