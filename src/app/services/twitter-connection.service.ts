import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse, Data } from './api-response.interface';

interface TwitRequest {
  query: string;
  latitude: number;
  longitude: number;
}

@Injectable({
  providedIn: 'root',
})
export class TwitterConnectionService {
  constructor(private http: HttpClient) {}

  public getTwits(twitRequest: TwitRequest): Observable<Data> {
    return this.http.post<Data>(environment.apiUrl, twitRequest);
  }

  // For stats
  public repeatedWords(
    resp: Data,
    length = 20
  ): { word: string; repeat: number }[] {
    const obj: { word: string; repeat: number }[] = [];
    const myArray = resp.data;
    let mergeArray = this.mergeArrays(myArray);
    for (let i = 0; i < length; i++) {
      const countWord = this.countWords(mergeArray);

      obj.push({
        word: countWord,
        repeat: this.countRepeat(countWord, mergeArray),
      });

      mergeArray = mergeArray.filter((word) => word !== countWord);
    }
    return obj;
  }

  private mergeArrays(data: ApiResponse[]): string[] {
    let array: string[] = [];
    for (const item of data) {
      for (const token of item.TweetTokenization) {
        array.push(token);
      }
    }
    array = array.sort();
    return array;
  }

  private countWords(array: string[]): string {
    return array
      .sort(
        (a, b) =>
          array.filter((v) => v === a).length -
          array.filter((v) => v === b).length
      )
      .pop();
  }

  private countRepeat(text: string, array: string[]): number {
    let count = 0;
    for (const item of array) {
      if (item === text) {
        count++;
      }
    }
    return count;
  }
}
