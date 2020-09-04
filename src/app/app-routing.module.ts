import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BookComponent } from './book/book.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: '', component: AppComponent, children: [
      { path: '', component: ListComponent },
      { path: 'book/:id', component: BookComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
