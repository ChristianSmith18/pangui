import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DataframeComponent } from './pages/dataframe/dataframe.component';
import { FilterComponent } from './pages/filter/filter.component';
import { StatsComponent } from './pages/stats/stats.component';

const routes: Routes = [
  { path: 'dataframe', component: DataframeComponent },
  { path: 'filter', component: FilterComponent },
  { path: 'stats', component: StatsComponent },
  { path: '**', redirectTo: 'dataframe', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
