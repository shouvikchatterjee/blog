import { Component, OnInit } from '@angular/core';

import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  public show = false;

  constructor(
    private loaderService: LoaderService) { }

  ngOnInit() {
    this.loaderService.loaderState.subscribe(
      state => {
        this.show = state.show;
      });
  }
}
