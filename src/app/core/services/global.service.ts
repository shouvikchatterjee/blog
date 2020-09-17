import { Injectable } from '@angular/core';

@Injectable()
export class GlobalService {

    constructor() { }

    /**
     * Get User
     */
    getUserInfo() {
        return JSON.parse(localStorage.getItem('user'));
    }

    /**
     * Set User
     */
    setUserInfo(id, role) {
        localStorage.setItem('user', JSON.stringify({ id, role }));
    }

    /**
     * Remove User
     */
    removeUserInfo() {
        localStorage.removeItem('user');
    }
}
