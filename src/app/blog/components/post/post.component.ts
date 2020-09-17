import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {

  @Input() data;
  @Input() action;
  @Input() edit = false;
  @Output() save = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  constructor() { }

  /**
   * Edit post
   */
  onEdit() {
    this.edit = !this.edit;
  }

  /**
   * Save post
   */
  onSave() {
    this.edit = false;
    this.save.emit(this.data);
  }

  /**
   * Delete post
   */
  onDelete() {
    this.delete.emit(this.data.id);
  }

}
