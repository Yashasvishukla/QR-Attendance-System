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
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';
import { HttpClientModule } from '@angular/common/http';

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
    HttpClientModule,
  ],
  providers: [AuthService, CookieService],
})
export class LoginPage implements OnInit {
  isLogin: boolean = false;
  userFormGroup!: FormGroup;
  constructor(
    private router: Router,
    private authService: AuthService,
    private toastController: ToastController,
    private formBuilder: FormBuilder
  ) {
    this.userFormGroup = this.formBuilder.group({
      username: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  ngOnInit(): void {
    if (this.authService.loggedInUser() === false) {
      console.log('Not Authenticated');
    }
    /*
      TODO:  Valiate the token
      If token is valid then navigate to home page
      else nativate to login page
    */
    this.router.navigate(['/tabs/home']);
  }

  login(user: any) {
    // Implement your login logic here
    // This might involve sending login credentials to your backend API
    this.authService.login(user).subscribe(
      (response) => {
        this.presentToast('bottom', 'Successfully Logged In');
        this.router.navigate(['/tabs/home']);
      },
      (error) => {
        this.presentToast('bottom', 'Something went wrong. Please try again.');
      }
    );
  }

  async presentToast(position: any, message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: position,
    });

    await toast.present();
  }

  onSubmit() {
    console.log(this.userFormGroup.value);
    if (this.userFormGroup.valid) {
      this.login(this.userFormGroup.value);
    }
  }
}
