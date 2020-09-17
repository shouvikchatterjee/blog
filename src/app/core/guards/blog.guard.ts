import { Injectable } from '@angular/core';
import { CanLoad, Router, UrlTree } from '@angular/router';

import { GlobalService } from '../services/global.service';

@Injectable({
    providedIn: 'root'
})
export class BlogGuard implements CanLoad {

    constructor(
        private globalService: GlobalService,
        private router: Router
    ) { }

    canLoad(): boolean | UrlTree {

        const role = this.globalService.getUserInfo() ?
            this.globalService.getUserInfo().role : null;

        if (role === 'user') {
            return true;
        } else {
            return this.router.parseUrl('/auth');
        }
    }
}