import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomTableComponent } from './custom-table/custom-table.component';


const routes: Routes = [
  { path: 'customtable', component: CustomTableComponent},
  { path: '',   redirectTo: '/customtable', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
