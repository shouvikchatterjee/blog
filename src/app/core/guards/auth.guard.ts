import { Injectable } from '@angular/core';
import { CanLoad, Router, UrlTree } from '@angular/router';

import { GlobalService } from '../services/global.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanLoad {

    constructor(
        private globalService: GlobalService,
        private router: Router
    ) { }

    canLoad(): boolean | UrlTree {

        const user = this.globalService.getUserInfo();

        if (user) {
            return (user.role === 'admin') ?
                this.router.parseUrl('/admin') : this.router.parseUrl('/blog');
        } else {
            return true;
        }
    }
}