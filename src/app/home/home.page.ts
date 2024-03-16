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
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
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
  ],
})
export class HomePage {
  constructor() {}
  courses = [
    {
      image: 'https://ionicframework.com/docs/img/demos/card-media.png',
      name: 'Maths',
      description:
        "Maths is the study of numbers, shapes and patterns. The word comes from the Greek word 'μάθημα' (máthema), meaning 'science, knowledge, or learning', and is sometimes shortened to 'math' in English.",
    },
    {
      image: 'https://ionicframework.com/docs/img/demos/card-media.png',
      name: 'English',
      description:
        "English is a subject that teaches students to read and understand the English language. It is a subject that is taught in primary and secondary schools, and is compulsory in most schools. It is also a subject that is taught in some universities.",
    },
    {
      image: 'https://ionicframework.com/docs/img/demos/card-media.png',
      name: 'Science',
      description:
        "Science is the subject of study that is concerned with the physical and natural world. It is a systematic enterprise that builds and organizes knowledge in the form of testable explanations and predictions about the universe.",
    },
  ];


  testimonials = [
    {
      image: 'https://ionicframework.com/docs/img/demos/card-media.png',
      name: 'Yashasvi Shukla',
      message:
       "I would like to thank the team at PV Institute for their support and guidance. I have been able to improve my grades and I am now more confident in my studies. I would recommend Edukate to anyone who is looking for a tutor.",
    },
    {
      image: 'https://ionicframework.com/docs/img/demos/card-media.png',
      name: 'Yashasvi Shukla',
      message:
       "I would like to thank the team at PV Institute for their support and guidance. I have been able to improve my grades and I am now more confident in my studies. I would recommend Edukate to anyone who is looking for a tutor.",
    }
  ];
}
