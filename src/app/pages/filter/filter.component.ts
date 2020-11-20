import { Component, OnInit } from '@angular/core';
import { TwitterConnectionService } from 'src/app/services/twitter-connection.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  twitterElements: any[];

  constructor(private _twitterConnection: TwitterConnectionService) {
    this.twitterElements = this._twitterConnection.getData();
  }
}
