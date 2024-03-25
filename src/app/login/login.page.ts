import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonList,
  IonLabel,
  IonItem,
  IonThumbnail,
  IonGrid,
  IonRow,
  IonCol,
  IonAvatar,
  IonIcon,
  IonButton,
  IonInput,
  IonFooter,
  ToastController,
  IonButtons,
  IonBackButton,
  IonText,
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
  standalone: true,
  imports: [
    IonBackButton,
    IonButtons,
    CommonModule,
    IonCardHeader,
    IonCard,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ExploreContainerComponent,
    IonCard,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonList,
    IonLabel,
    IonItem,
    IonThumbnail,
    IonGrid,
    IonRow,
    IonCol,
    IonAvatar,
    IonIcon,
    IonButton,
    IonInput,
    FormsModule,
    IonFooter,
    RouterModule,
    IonFooter,
    IonText,
    ReactiveFormsModule,
  ],
  providers: [CookieService],
})
export class LoginPage implements OnInit {
  isLogin: boolean = false;
  userFormGroup!: FormGroup;
  constructor(
    private router: Router,
    private cookieService: CookieService,
    private toastController: ToastController,
    private formBuilder: FormBuilder 
  ) {


    this.userFormGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  ngOnInit(): void {
    if (this.cookieService.get('token') == '') {
      console.log('Not Authenticated');
    }
    /*
      TODO:  Valiate the token
      If token is valid then navigate to home page
      else nativate to login page
    */
    this.router.navigate(['/tabs/home']);
  }

  login() {
    // Implement your login logic here
    // This might involve sending login credentials to your backend API
  
    this.setCookie();
    this.presentToast('bottom');

    this.router.navigate(['/tabs/home']);
  }

  setCookie() {
    let token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    this.cookieService.set('token', token, 30, '/', '', true, 'Strict'); // Adjust values as needed
  }

  async presentToast(position: any) {
    const toast = await this.toastController.create({
      message: 'Successfully logged in!',
      duration: 1500,
      position: position,
    });

    await toast.present();
  }

  onSubmit()
  {
    if (this.userFormGroup.valid) {
      console.log(this.userFormGroup.value);
    }
  }
}
