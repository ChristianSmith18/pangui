import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TwitterConnectionService } from 'src/app/services/twitter-connection.service';

@Component({
  selector: 'app-config-stats',
  templateUrl: './config-stats.component.html',
  styleUrls: ['./config-stats.component.scss'],
})
export class ConfigStatsComponent implements OnInit {
  @Output() buttonClick = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  onClick(type: 'bar' | 'pie' | 'doughnut' | 'polarArea'): void {
    this.buttonClick.emit(type);
  }
}
