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

    const dataStoraged = localStorage.getItem('statsData');
    if (dataStoraged) {
      const dataSaved = JSON.parse(
        decodeURIComponent(escape(window.atob(dataStoraged)))
      ) as Data;
      this.dataProcess(dataSaved);
      this.spinner.hide();
    }

    this._twitter
      .getTwits({
        query: 'retiro afp',
        latitude: -33.4976093,
        longitude: -70.6713199,
      })
      .subscribe((resp) => {
        console.log(resp);
        this.dataProcess(resp);

        this.spinner.hide();
        localStorage.setItem(
          'statsData',
          btoa(unescape(encodeURIComponent(JSON.stringify(resp))))
        );
      });
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
