import { Component, OnInit } from '@angular/core';
import {
  ApiResponse,
  Data,
  ParseData,
} from 'src/app/services/api-response.interface';
import { TwitterConnectionService } from 'src/app/services/twitter-connection.service';

@Component({
  selector: 'app-dataframe',
  templateUrl: './dataframe.component.html',
  styleUrls: ['./dataframe.component.scss'],
})
export class DataframeComponent implements OnInit {
  twitterElements: ParseData[];

  constructor(private _twitterConnection: TwitterConnectionService) {
    const dataStoraged = localStorage.getItem('twitterQuery');
    if (dataStoraged) {
      const dataSaved = JSON.parse(
        decodeURIComponent(escape(window.atob(dataStoraged)))
      ) as Data;
      this.dataProcess(dataSaved);
    }

    console.log(
      JSON.parse(
        decodeURIComponent(
          escape(window.atob(localStorage.getItem('twitterParseQuery')))
        )
      )
    );
  }

  ngOnInit(): void {}

  dataProcess(response: Data): void {
    const values: ApiResponse[] = response.data;
    const newParseArray: ParseData[] = values?.map(
      (data) =>
        ({
          id: data.id,
          name: data.TweetInfo.user.name,
          location: data.TweetInfo.user.location,
          followers: data.TweetInfo.user.followers_count,
          tweet: data.TweetInfo.text,
          retweets: data.TweetInfo.retweet_count,
          language: data.TweetInfo.lang,
          tweetTokenization: data.TweetTokenization,
        } as ParseData)
    );
    this.twitterElements = newParseArray;
    localStorage.setItem(
      'twitterParseQuery',
      btoa(unescape(encodeURIComponent(JSON.stringify(this.twitterElements))))
    );
  }
}
