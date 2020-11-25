import { _isNumberValue } from '@angular/cdk/coercion';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  ApiResponse,
  ParseData,
} from 'src/app/services/api-response.interface';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements AfterViewInit, OnChanges {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() dataElements: ParseData[] = [];

  displayedColumns: string[] = [
    'name',
    'location',
    'followers',
    'tweet',
    'favorites',
    'retweets',
    'language',
  ];
  dataSource: MatTableDataSource<any>;

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  constructor(private spinner: NgxSpinnerService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.spinner.show();
    this.dataSource = new MatTableDataSource(changes.dataElements.currentValue);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.spinner.hide();
  }

  ngAfterViewInit(): void {
    this.dataSource = new MatTableDataSource(this.dataElements);
    this.paginator._intl.itemsPerPageLabel = 'Items por página';
    this.paginator._intl.nextPageLabel = 'Página siguiente';
    this.paginator._intl.previousPageLabel = 'Página anterior';
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
