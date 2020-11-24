import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse, Data } from './api-response.interface';

interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

interface TwitRequest {
  query: string;
  latitude: number;
  longitude: number;
}

@Injectable({
  providedIn: 'root',
})
export class TwitterConnectionService {
  ELEMENT_DATA: PeriodicElement[] = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  ];

  constructor(private http: HttpClient) {}

  public getData(): PeriodicElement[] {
    return this.ELEMENT_DATA;
  }

  public getTwits(twitRequest: TwitRequest): Observable<Data> {
    return this.http.post<Data>(environment.apiUrl, twitRequest);
  }

  // For stats
  public repeatedWords(resp: Data, length = 20): { word: string; repeat: number }[] {
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

  private  mergeArrays(data: ApiResponse[]): string[] {
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
