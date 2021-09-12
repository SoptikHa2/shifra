import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit {
  seconds?: number;
  minutes?: number;
  hours?: number;
  days?: number;


  constructor() {
    const endDate = new Date('2021-10-2');
    const endTime = Math.floor(endDate.getTime() / 1000);
    let actTime, interval;

    const fnc = () => {
      actTime = Math.floor(Date.now() / 1000);
      interval = endTime - actTime;

      this.days = Math.floor(interval / (60 * 60 * 24));
      this.hours = Math.floor((interval / (60 * 60)) % 24);
      this.minutes = Math.floor((interval / 60) % 60);
      this.seconds = Math.floor(interval % 60);
    };
    fnc();
    setInterval(fnc, 1000);
  }

  ngOnInit(): void {
  }


  pad(num: number, size: number) {
    let s = num+"";
    while (s.length < size) s = " " + s;
    return s;
  }
}
