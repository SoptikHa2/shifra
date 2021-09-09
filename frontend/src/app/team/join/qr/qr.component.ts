import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {Router} from "@angular/router";
import {filter} from "rxjs/operators";

declare class Html5Qrcode {
  static getCameras(): Promise<Array<CameraDevice>> // Returns a Promise
  constructor(elementId: string, config?: any | undefined);

  start(
    cameraIdOrConfig: any,
    configuration: any | undefined,
    qrCodeSuccessCallback: any | undefined,
    qrCodeErrorCallback: any | undefined,
  ): Promise<null>;

  stop(): Promise<void>;

  scanFile(
    imageFile: File,
    /* default=true */ showImage: boolean | undefined): Promise<string>;

  clear(): void;  // Returns void
}

declare type CameraDevice = {
  id: string;
  label: string;
}

@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.scss']
})
export class QRComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('video', {static: false}) videoHtml?: ElementRef<HTMLVideoElement>;

  cameras?: CameraDevice[];
  qrCodeReader?: any;

  constructor(
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.qrCodeReader = new Html5Qrcode("reader");
    const fps = 10;
    const qrbox = 250;
    const aspectRatio = 1;
    this.qrCodeReader.start(
      {facingMode: "environment"},
      {fps, qrbox, aspectRatio},
      (text: any) => {
        this.router.navigate(['/team/join/code'], {queryParams: {code: text.split('=').pop()}})
          .then()
          .catch(err => {
            if (!environment.production) console.error(err);
          })
      }).then(console.error)
      .catch((err: any) => {
        if (!environment.production) console.error(err);
      })
  }

  ngOnDestroy() {
    if (this.qrCodeReader) this.qrCodeReader.stop()
      .then()
      .catch((err: any) => {
        if (!environment.production) console.error(err);
      })
  }
}
