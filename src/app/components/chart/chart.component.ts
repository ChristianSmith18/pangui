import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };
  @Input() barChartLabels: Label[] = [
    '2006',
    '2007',
    '2008',
    '2009',
    '2010',
    '2011',
    '2012',
  ];
  @Input() barChartType: ChartType = 'bar';
  @Input() barChartLegend = true;

  @Input() barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40] },
    { data: [28, 48, 40, 19, 86, 27, 90] },
    { data: [21, 8, 30, 17, 62, 72, 9] },
  ];

  constructor() {}

  ngOnInit(): void {}
}
