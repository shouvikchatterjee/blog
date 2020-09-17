import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from './loader.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

    count = 0;

    constructor(
        private loaderService: LoaderService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {       

        this.loaderService.show();
        this.count++;

        return new Observable((observer) => {

            const subscription = next.handle(req)
                .subscribe((e) => {
                    if (e instanceof HttpResponse) {
                        this.count--;
                        if (this.count === 0) {
                            this.loaderService.hide();
                        }
                        observer.next(e);
                    }
                }, (err) => {
                    this.loaderService.hide();
                    observer.error(err);
                }, () => {
                    observer.complete();
                });

            return () => {
                subscription.unsubscribe();
            };
        });
    }
}
