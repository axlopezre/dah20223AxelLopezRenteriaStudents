import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { empty } from 'rxjs';
import { FireserviceService } from '../services/fireservice.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public email: any;
  public password: any;
  constructor(public router: Router,
    public fireService: FireserviceService, private tc: ToastController) { }

  ngOnInit() {
    
  }

  async toast(message: string) {
    let toast = await this.tc.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }


  login() {
    
    this.fireService.loginWithEmail({ email: this.email, password: this.password }).then(res => {
      console.log(res);
      if (res.user.uid) {
        this.fireService.getDetails({ uid: res.user.uid }).subscribe(res => {
          this.router.navigateByUrl('home');
          console.log(res);
          alert('Welcome ' + res['name']);
        }, err => {
          console.log(err);
        });
      }
    }, err => {
      this.router.navigateByUrl('login');
      this.toast(err.message + " " + "Usuario no encontrado ó contraseña incorrecta");
      console.log(err);  
    })
  }


  signup() {
    this.router.navigateByUrl('signup');
  }

}
