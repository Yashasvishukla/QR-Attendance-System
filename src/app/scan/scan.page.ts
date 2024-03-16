import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonFab,
  IonFabButton,
  IonButton,
  IonRow,
  IonAlert,
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { CommonModule } from '@angular/common';

import { ZXingScannerComponent, ZXingScannerModule } from '@zxing/ngx-scanner';
import { BarcodeFormat } from '@zxing/library';
import {
  BehaviorSubject,
  Observable,
  distinctUntilChanged,
  map,
  scan,
  shareReplay,
  startWith,
} from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scan',
  templateUrl: 'scan.page.html',
  styleUrls: ['scan.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonFabButton,
    IonFab,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ExploreContainerComponent,
    ZXingScannerModule,
    IonRow,
    IonButton,
    IonAlert
  ],
})
export class ScanPage implements OnInit, OnDestroy {

  constructor(private route: Router) {
   
  }
 

  @ViewChild('scanner') scanner!: ZXingScannerComponent;
  allowedFormats = [BarcodeFormat.QR_CODE];

  devices$ = new BehaviorSubject<MediaDeviceInfo[]>([]);

  selectedDevice$: Observable<MediaDeviceInfo> = this.devices$.pipe(
    map((device) => device[0]),
    distinctUntilChanged(),
    shareReplay(1)
  );

  enable$ = this.devices$.pipe(map(Boolean));

  toggleCamera$ = new BehaviorSubject<boolean>(true);

  startCamera$ = this.toggleCamera$.pipe(
    // TODO - Fix this
    scan((acc) => acc, true),
    startWith(true)
  );

  scanSuccess$ = new BehaviorSubject<string>('');
  hasPermission = false;
  showScanner = true;
  isAlertOpen: boolean = false;
  alertButtons = [
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        this.route.navigate(['/']);
      },
    },
  ];

  ngOnInit(): void {
    this.scanSuccess$.subscribe((result) => {
      this.sendToServer(result);
    });
  }
  scanError(error: Error) {
    console.error(error);
  }




  sendToServer(result: string) {
    if (this.hasPermission) {
      this.isAlertOpen = true;
      console.log('Sending to server: ', result);
    }
  }

  onPermissionResponse(response: boolean) {
    this.hasPermission = response;
  }

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

  ngOnDestroy() {
    console.log(this.scanner);
  }
}
