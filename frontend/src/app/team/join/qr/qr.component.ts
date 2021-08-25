import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {environment} from "../../../../environments/environment";

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
export class QRComponent implements OnInit, AfterViewInit {
  @ViewChild('video', {static: false}) videoHtml?: ElementRef<HTMLVideoElement>;

  cameras?: CameraDevice[];
  qrCodeReader?: any;

  constructor() {

  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.qrCodeReader = new Html5Qrcode("reader");

    Html5Qrcode.getCameras().then((devices: CameraDevice[]) => {
      this.cameras = devices;
      if (this.cameras && this.cameras.length) {
        const cameraId = this.cameras[0].id;
        const fps = 10;
        const qrbox = 250;
        const aspectRatio = 1;
        console.log(this.qrCodeReader);
        this.qrCodeReader.start(
          { facingMode: "environment" },
          { fps, qrbox, aspectRatio },
          this.qrReadSuccess
        ).catch((err: any) => {
            if (!environment.production) console.error(err);
          })
      }
    }).catch((err: any) => {
      if (!environment.production) console.error(err);
    })
  }

  qrReadSuccess(decodedText: any, decodedResult: any) {
    console.log(decodedText, decodedResult);
  }

  getGCD(a: number, b: number): number {
    if (a == b)
      return a;
    return this.getGCD(b, a % b);
  }
}
