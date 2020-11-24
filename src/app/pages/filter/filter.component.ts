import { Component, OnInit } from '@angular/core';
import {
  ApiResponse,
  ParseData,
} from 'src/app/services/api-response.interface';
import { TwitterConnectionService } from 'src/app/services/twitter-connection.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  twitterElements: ParseData[];
  allDataCopy = [];

  constructor(private _twitterConnection: TwitterConnectionService) {
    this._twitterConnection
      .getTwits({
        query: 'retiro afp',
        latitude: -33.4976093,
        longitude: -70.6713199,
      })
      .subscribe((resp) => {
        const values: ApiResponse[] = resp.data;
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
            } as ParseData)
        );

        this.twitterElements = newParseArray;
        this.allDataCopy = [...this.twitterElements];
      });
  }

  updateValues(event: any): void {
    if (event.isValid as boolean) {
      this.twitterElements = event.data;
    } else {
      this.twitterElements = this.allDataCopy;
    }
  }
}
