import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { NgxSpinnerService } from 'ngx-spinner';
import { Data } from 'src/app/services/api-response.interface';
import { TwitterConnectionService } from 'src/app/services/twitter-connection.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit {
  public chartType = 'pie';
  public chartLabels: Label[] = [];
  public chartData: ChartDataSets[] = [];

  constructor(
    private _twitter: TwitterConnectionService,
    private spinner: NgxSpinnerService
  ) {
    this.spinner.show();

    const dataStoraged = localStorage.getItem('twitterQuery');
    if (dataStoraged) {
      const dataSaved = JSON.parse(
        decodeURIComponent(escape(window.atob(dataStoraged)))
      ) as Data;
      this.dataProcess(dataSaved);
      this.spinner.hide();
    }
  }

  ngOnInit(): void {}

  dataProcess(response: Data): void {
    this.chartLabels = [];
    this.chartData = [];

    const repeatedWords = this._twitter.repeatedWords(response, 20);
    const data: number[] = [];
    for (const obj of repeatedWords) {
      this.chartLabels.push(obj.word);
      data.push(obj.repeat);
    }
    this.chartData = [{ data, label: 'Búsquedas' }];
  }
}
