import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TipHistoryService } from '../tip-history-service.service';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import * as tipHistoryGlobal from '../globals';
import { Chart } from 'chart.js';

@Component({
  selector: 'tc-tip-history',
  templateUrl: './tip-history.component.html',
  styleUrls: ['./tip-history.component.css']
})
export class TipHistoryComponent implements OnInit, AfterViewInit {

  chart = [];

  tipHistoryJsonString: String = JSON.stringify(tipHistoryGlobal);

  // stringify the global variable for printing purposes
  // public tipHistory = JSON.stringify(tipHistoryGlobal);



  constructor(private tipHistoryService: TipHistoryService) {
    // subscribe to home component messages
    // console.log(this.getJsonKey());
  }

  ngOnInit() {


  }

  // chart stuff
  ngAfterViewInit(): void {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: this.getJsonKey(),
        datasets: [{
          label: 'Tip Values',
          data: this.getJsonValue(),
          borderColor: '#3cba9f',
          backgroundColor: 'purple',
          fill: false,
          borderDash: [5, 5],
          pointRadius: 15,
          pointHoverRadius: 10,
        }]
      },
      options: {
        responsive: true,
        legend: {
          position: 'bottom',
        },
        hover: {
          mode: 'index'
        },
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Tip Time Stamp'
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Tip Value'
            }
          }]
        },
        title: {
          display: true,
          text: 'Your Tip History'
        }
      }
    });
  }

  public getJsonKey(): String[] {
    const tipTimeKeys: String[] = [];

    for (const key in tipHistoryGlobal.tipHistory) {
      if (tipHistoryGlobal.tipHistory.hasOwnProperty(key)) {
        for (const prop in tipHistoryGlobal.tipHistory[key]) {
          if (tipHistoryGlobal.tipHistory[key].hasOwnProperty(prop)) {
            // console.log('property %s', prop);
            if (prop === 'time') {
              const element: any = tipHistoryGlobal.tipHistory[key][prop].toString().substring(0, 24);
              console.log('element %s', element);
              tipTimeKeys.push(element);
            }
          }
        }
      }
    }

    return tipTimeKeys;
  }

  public getJsonValue(): Number[] {
    const tipValue: Number[] = [];

    for (const key in tipHistoryGlobal.tipHistory) {
      if (tipHistoryGlobal.tipHistory.hasOwnProperty(key)) {
        for (const prop in tipHistoryGlobal.tipHistory[key]) {
          if (tipHistoryGlobal.tipHistory[key].hasOwnProperty(prop)) {
            // console.log('property %s', prop);
            if (prop === 'tipAmount') {
              const element: any = tipHistoryGlobal.tipHistory[key][prop];
              console.log('element %s', element);
              tipValue.push(element);
            }
          }
        }
      }
    }

    return tipValue;
  }
}
