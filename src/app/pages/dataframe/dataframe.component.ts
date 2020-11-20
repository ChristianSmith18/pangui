import { Component, OnInit } from '@angular/core';
import { TwitterConnectionService } from 'src/app/services/twitter-connection.service';

@Component({
  selector: 'app-dataframe',
  templateUrl: './dataframe.component.html',
  styleUrls: ['./dataframe.component.scss'],
})
export class DataframeComponent implements OnInit {
  twitterElements: any[];

  constructor(private _twitterConnection: TwitterConnectionService) {
    this.twitterElements = this._twitterConnection.getData();
  }

  ngOnInit(): void {}
}
