import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Landing } from './pages/landing/landing';
import { Blog } from './pages/blog/blog';
import { Admin } from './pages/admin/admin';
import { Login } from './pages/auth/login/login';
import { Layout } from './pages/layout/layout';

const routes: Routes = [
  { path: '',
    component: Layout,
    children: [
      { path: '', component: Landing },
      { path: 'blog', component: Blog },
      { path: 'admin', component: Admin }
    ]
   },
  // { path: 'blog', component: Blog },
  // { path: 'admin', component: Admin },
  // { path: '**', redirectTo: '' , pathMatch: 'full' },
  { path: 'login', component: Login}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
