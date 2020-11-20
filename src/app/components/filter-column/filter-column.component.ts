import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatSelectionList } from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Condition {
  sentence: string;
  use: boolean;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-filter-column',
  templateUrl: './filter-column.component.html',
  styleUrls: ['./filter-column.component.scss'],
})
export class FilterColumnComponent implements AfterViewInit {
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('myFilters') myFilters: MatSelectionList;
  @Input() data: any[];
  filteredData: any[];
  @Output() filteredDataEvent = new EventEmitter<any[]>();
  filters: Condition[] = [];

  constructor(private _snackBar: MatSnackBar) {}

  ngAfterViewInit(): void {
    this.myFilters.selectedOptions.changed.subscribe(() => {
      this.filters.map((filter) => {
        if (filter.use) {
          if (this.filteredData && this.filteredData.length > 0) {
            console.log('CON DATA');
            this.filteredData = this.filteredData.filter((item) =>
              eval(this.applyFormat(filter.sentence))
            );
          } else {
            console.log('SIN DATA');
            this.filteredData = this.data.filter((item) => {
              console.log(this.applyFormat(filter.sentence));
              return eval(this.applyFormat(filter.sentence));
            });
          }
          console.log(this.filteredData);
        }
      });
      // PENDIENTE EL FILTRO DE BUSQUEDA PERSONALIZADO
      // NO FILTRA BIEN, LA PRIMERA CONDICIÓN SI, DE LA SEGUNDA EN ADELANTE NO
    });
  }

  private applyFormat(sentence: string): string {
    const keys = this.getColumns(this.data[0]);
    // tslint:disable-next-line: forin
    for (const key of keys) {
      sentence = sentence.replace(key, `item.${key}`);
    }
    return sentence;
  }

  // Methods for filters
  private getColumns(obj: object): string[] {
    const columns = [];
    if (typeof obj === 'object') {
      // tslint:disable-next-line: forin
      for (const key in obj) {
        columns.push(key.toLowerCase());
      }
    }
    return columns;
  }

  private validateExpression(
    exp: string
  ): { success: boolean; conditions: number } {
    try {
      const keys = this.getColumns(this.data[0]);
      // tslint:disable-next-line: one-variable-per-declaration
      let count = 0,
        variable = '';
      for (const key of keys) {
        if (exp.toLocaleLowerCase().includes(key)) {
          variable = key;
          count++;
        }
      }

      const matchConditions =
        exp.split(/ < | > | >= | <= | == | === /).length - 1;
      if (count !== 1 || matchConditions > 2 || matchConditions < 1) {
        return { success: false, conditions: 0 };
      }

      // tslint:disable-next-line: no-eval
      eval(`const ${variable} = null;` + exp);

      return { success: true, conditions: matchConditions };
    } catch (error) {
      return { success: false, conditions: 0 };
    }
  }

  public applyFilter(): void {
    const sentence: string = this.searchInput.nativeElement.value;
    const myExp = this.validateExpression(sentence);
    if (myExp.success) {
      this.filters.push({ sentence, use: true });
      this.searchInput.nativeElement.value = null;
    } else {
      this.openSnackBar();
    }
  }

  private openSnackBar(): void {
    this._snackBar.open('Debe ser una condición válida!!', 'Entendido', {
      duration: 2500,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }
}
