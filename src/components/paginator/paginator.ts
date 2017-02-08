import { Component, EventEmitter } from '@angular/core';

@Component({
  selector: 'paginator',
  templateUrl: 'paginator.html',
  inputs: ['items', 'pageSize'],
  outputs: ['paginate'],
})
export class PaginatorComponent {
  items: any[];
  pageSize: number;
  currentPage: number;

  paginate = new EventEmitter(true);

  constructor() {

  }

  ngOnInit() {
    this.resetPagination();
  }

  ngOnChanges(changes: any) {
    let items = changes['items'];
    if (items && items['currentValue'] != items['previousValue']) {
      this.resetPagination();
    }
  }

  resetPagination() {
    this.currentPage = 1;
    this.startPagination();
  }

  get lastPage(): number {
    return Math.ceil(this.items.length / this.pageSize);
  }

  get paginationOffset(): number {
    return (this.currentPage - 1) * this.pageSize;
  }

  startPagination() {
    let objects = this.getPaginateItems();

    this.paginate.emit(objects);
  }

  getPaginateItems() {
    let offset = this.paginationOffset;

    let paginated = this.items.slice(offset, offset + this.pageSize);
    return paginated;
  }

  nextPage() {
    this.currentPage += 1;
    this.startPagination();
  }

  prevPage() {
    this.currentPage -= 1;
    this.startPagination();
  }
}
