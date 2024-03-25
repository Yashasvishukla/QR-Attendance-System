import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonCardContent,
  IonCard,
  IonFooter,
  IonIcon,
  IonButtons,
  IonModal,
  ActionSheetController,
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { NgxKjuaComponent } from 'ngx-kjua';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Geolocation } from '@capacitor/geolocation';
import { environment } from 'src/environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-school',
  templateUrl: 'school.page.html',
  styleUrls: ['school.page.scss'],
  standalone: true,
  imports: [
    IonCardContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ExploreContainerComponent,
    NgxKjuaComponent,
    IonInput,
    IonList,
    IonItem,
    ReactiveFormsModule,
    IonLabel,
    IonButton,
    IonCard,
    IonFooter,
    IonIcon,
    CommonModule,
    IonButtons,
    IonModal,
  ],
})
export class SchoolPage {
  userFormGroup: FormGroup;
  qrLink!: string;
  showQRCode = false;
  presentingElement = undefined;
  constructor(
    private formBuilder: FormBuilder,
    private actionSheetCtrl: ActionSheetController
  ) {
    this.userFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]+$'),
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
    });

    this.showQRCode = false;
  }

  get latitude() {
    return this.userFormGroup.get('latitude')?.value;
  }
  get longitude() {
    return this.userFormGroup.get('longitude')?.value;
  }

  get school() 
  {
    return this.userFormGroup.get('name')?.value;
  }

  get address() {
    return this.userFormGroup.get('address')?.value;
  }

  get phoneNumber() {
    return this.userFormGroup.get('phoneNumber')?.value;
  }

  generateQRCode() {
    let baseUrl = environment.baseUrl;
    let queryParamsBase64 = btoa(
      `?latitude=${this.latitude}&longitude=${this.longitude}`
    );
    baseUrl += queryParamsBase64;
    console.log(baseUrl);
    this.qrLink = baseUrl;
    this.showQRCode = true;
  }

  onSubmit() {
    if (this.userFormGroup.valid) {
      console.log(this.userFormGroup.value);
      // Handle form submission, e.g., send data to a server
    }
  }

  async currentPosition() {
    // Verify permissions on mobile device
    Geolocation.requestPermissions()
      .then((result) => {
        if (result) {
          alert('Woo Hoo!');
        }
      })
      .catch((err) => {
        console.log(err);
      });

    const coordinates = await Geolocation.getCurrentPosition();

    // set latitude and longitude
    let latitude = this.userFormGroup.get('latitude');
    latitude?.setValue(coordinates.coords.latitude);

    let longitude = this.userFormGroup.get('longitude');
    longitude?.setValue(coordinates.coords.longitude);
  }

  canDismiss = async () => {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Are you sure?',
      buttons: [
        {
          text: 'Yes',
          role: 'confirm',
        },
        {
          text: 'No',
          role: 'cancel',
        },
      ],
    });

    actionSheet.present();

    const { role } = await actionSheet.onWillDismiss();

    return role === 'confirm';
  };
}
