import { Component } from '@angular/core';
import { json2csvAsync } from 'json-2-csv';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  menuState = false;

  downloadAsCsv(): void {
    const array = JSON.parse(
      decodeURIComponent(
        escape(window.atob(localStorage.getItem('twitterParseQuery')))
      )
    );
    json2csvAsync(array)
      .then((csv) => {
        this.createFile(`twitterQuery_${Date.now()}.csv`, csv);
      })
      .catch((err) => {
        console.log('Ha ocurrido un error:\n', err);
      });
  }

  createFile(filename: string, text: string | number | boolean): void {
    const element = document.createElement('a');
    element.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' + encodeURIComponent(text)
    );
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }
}
