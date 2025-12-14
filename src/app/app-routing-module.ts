import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Landing } from './pages/landing/landing';
import { Blog } from './pages/blog/blog';
import { Admin } from './pages/admin/admin';
import { Login } from './pages/auth/login/login';
import { Layout } from './pages/layout/layout';
import { ManageBlog } from './pages/admin/manage-blog/manage-blog';
import { Invite } from './pages/admin/invite/invite';

const routes: Routes = [
  { path: '',
    component: Layout,
    children: [
      { path: '', component: Landing },
      { path: 'blog', component: Blog },
    ]
   },
  { path: 'admin', component: Admin, 
    children: [
      { path: '', component: ManageBlog },
      { path: 'invite', component: Invite },
    ]
  },
  { path: 'login', component: Login}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
