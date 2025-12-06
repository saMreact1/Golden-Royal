import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Landing } from './pages/landing/landing';
import { Blog } from './pages/blog/blog';
import { Admin } from './pages/admin/admin';

const routes: Routes = [
  { path: '', component: Landing },
  { path: 'blog', component: Blog },
  { path: 'admin', component: Admin }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
