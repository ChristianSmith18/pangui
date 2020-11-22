import { Component, OnInit } from '@angular/core';
import { TwitterConnectionService } from 'src/app/services/twitter-connection.service';

@Component({
  selector: 'app-config-stats',
  templateUrl: './config-stats.component.html',
  styleUrls: ['./config-stats.component.scss'],
})
export class ConfigStatsComponent implements OnInit {
  data: { name: string; type: string }[];

  constructor(private _twitterConnection: TwitterConnectionService) {
    const data = this._twitterConnection.getData();
    this.data = this.getColumns(data[0]);
  }

  ngOnInit(): void {}

  // Methods for filters
  private getColumns(obj: object): { name: string; type: string }[] {
    const columns: { name: string; type: string }[] = [];
    if (typeof obj === 'object') {
      // tslint:disable-next-line: forin
      for (const key in obj) {
        columns.push({ name: key.toLowerCase(), type: typeof obj[`${key}`] });
      }
    }
    return columns;
  }
}
