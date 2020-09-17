import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { LoaderComponent } from './components/loader/loader.component';
import { HttpInterceptorService } from './services/http-interceptor';
import { LoaderService } from './services/loader.service';
import { GlobalService } from './services/global.service';
import { ExcelService } from './services/excel.service';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LoaderComponent,
    NotFoundComponent,
  ],
  providers: [
    LoaderService,
    GlobalService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
    ExcelService
  ],
  exports: [
    LoaderComponent,
  ]
})
export class CoreModule { }
