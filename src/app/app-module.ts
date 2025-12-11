import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Landing } from './pages/landing/landing';
import { Header } from './shared/header/header';
import { Footer } from './shared/footer/footer';

// Angular Material Modules
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Blog } from './pages/blog/blog';
import { Admin } from './pages/admin/admin';
import { MatIconModule } from '@angular/material/icon';
import { CreateBlog } from './pages/admin/components/create-blog/create-blog';
import { Loader } from './shared/loader/loader';
import { LoaderInterceptor } from './core/interceptor/loader.interceptor';
import { ConfirmDialog } from './shared/confirm-dialog/confirm-dialog';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    App,
    Landing,
    Header,
    Footer,
    Blog,
    Admin,
    CreateBlog,
    ConfirmDialog,
    // Loader
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatIconModule,
    MatSelectModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    }
  ],
  bootstrap: [App]
})
export class AppModule { }
