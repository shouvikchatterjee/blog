import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { GlobalService } from '../../../core/services/global.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    private router: Router,
    private globalService: GlobalService
  ) { }

  /**
   * Logout current user
   */
  onLogout() {
    this.globalService.removeUserInfo();
    this.router.navigate(['/auth']);
  }
}
