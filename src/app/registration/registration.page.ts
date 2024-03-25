import { Component } from '@angular/core';
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
  IonicSlides,
  IonGrid,
  IonRow,
  IonCol,
  IonAvatar,
  IonIcon,
  IonButton,
  IonFooter,
  IonInput,
  ToastController,
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
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: 'registration.page.html',
  styleUrls: ['registration.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonTitle,
    IonContent,
    IonCardContent,
    IonCard,
    IonItem,
    IonLabel,
    IonFooter,
    IonInput,
    IonButton,
    FormsModule,
    IonToolbar,
    ReactiveFormsModule,
  ],
})
export class RegisterPage {
  userFormGroup!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private router: Router
  ) {
    this.userFormGroup = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]+$'),
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.userFormGroup.valid) {
      console.log(this.userFormGroup.value);
      
      this.presentToast('bottom');
      this.router.navigate(['/login']);
    }
  }

  async presentToast(position: any) {
    const toast = await this.toastController.create({
      message: 'Successfully Registered',
      duration: 1500,
      position: position,
    });

    await toast.present();
  }
}
