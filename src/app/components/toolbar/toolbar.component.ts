import { Component, EventEmitter, OnInit, Output } from '@angular/core';

interface NavRoute {
  name: string;
  route: string;
}

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  @Output() menuClick = new EventEmitter<boolean>();
  public menuState = false;
  routes: NavRoute[] = [
    { name: 'Marco de Datos', route: 'dataframe' },
    { name: 'Filtros', route: 'filter' },
    { name: 'Estadísticas', route: 'stats' },
  ];

  constructor() {}

  public menuEvent(): void {
    this.menuState = !this.menuState;
    this.menuClick.emit(this.menuState);
  }
}
