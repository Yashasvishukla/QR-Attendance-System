import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonList,
  IonItem,
  IonLabel,
  IonButton, IonCardContent, IonCard, IonFooter } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { NgxKjuaComponent } from 'ngx-kjua';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { max } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: 'user.page.html',
  styleUrls: ['user.page.scss'],
  standalone: true,
  imports: [IonCardContent, 
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
    IonFooter
  ],
})
export class UserPage {
  userFormGroup: FormGroup;
  constructor(private formBuilder: FormBuilder) {
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
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.userFormGroup.valid) {
      console.log(this.userFormGroup.value);
      // Handle form submission, e.g., send data to a server
    }
  }
}
