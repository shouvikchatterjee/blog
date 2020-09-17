import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class LoaderService {

    private loaderSubject = new Subject<any>();
    public loaderState = this.loaderSubject.asObservable();

    constructor() { }

    /**
     * Show loader
     */
    show() {
        this.loaderSubject.next({ show: true });
    }

    /**
     * Hide Loader
     */
    hide() {
        this.loaderSubject.next({ show: false });
    }

}
