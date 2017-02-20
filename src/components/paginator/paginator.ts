import { Component, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'paginator',
  templateUrl: 'paginator.html',
  inputs: ['items', 'pageSize'],
  outputs: ['paginate', 'currentPageChange'],
})
export class PaginatorComponent {
  items: any[];
  pageSize: number;
  _currentPage: number;

  paginate = new EventEmitter(true);
  currentPageChange = new EventEmitter(true);

  constructor() {

  }

  ngOnInit() {
    this.resetPagination();
  }

  ngOnChanges(changes: any) {
    let items = changes['items'];
    if (items && items['currentValue'] != items['previousValue']) {
      this.startPagination();
    }
  }

  @Input()
  get currentPage() {
    return this._currentPage;
  }

  set currentPage(value) {
    this._currentPage = value;
    this.currentPageChange.emit(this._currentPage);
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
