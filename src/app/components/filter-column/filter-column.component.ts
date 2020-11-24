import { OnChanges, SimpleChanges } from '@angular/core';
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
import { MatListOption, MatSelectionList } from '@angular/material/list';
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
export class FilterColumnComponent implements AfterViewInit, OnChanges {
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('myFilters') myFilters: MatSelectionList;
  @Input() data: any[];
  filteredData: any[] = [];
  @Output() filteredDataEvent = new EventEmitter<{
    data: any[];
    isValid: boolean;
  }>();
  filters: Condition[] = [];

  constructor(private _snackBar: MatSnackBar) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.data) {
      this.filteredData = [...this.data];
    }
    console.log(this.filteredData);
  }

  ngAfterViewInit(): void {
    this.myFilters.selectedOptions.changed.subscribe(() => {
      // console.log(this.myFilters.selectedOptions.selected);
      if (
        this.myFilters.selectedOptions.selected.length !== this.filters.length
      ) {
        this.filteredData = [...this.data];
      }
      setTimeout(() => {
        this.myFilters.selectedOptions.selected.map(
          (filterOptions: MatListOption) => {
            if (this.myFilters.selectedOptions.selected.length > 0) {
              const text = filterOptions._text.nativeElement.innerText;
              this.filteredData = this.filteredData.filter((item) => {
                return eval(this.applyFormat(text));
              });
            }
          }
        );

        if (this.myFilters.selectedOptions.selected.length === 0) {
          this.filteredData = [...this.data];
          this.filteredDataEvent.emit({ data: [...this.data], isValid: false });
        } else {
          this.filteredDataEvent.emit({
            data: this.filteredData,
            isValid: true,
          });
        }
      }, 0);
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
