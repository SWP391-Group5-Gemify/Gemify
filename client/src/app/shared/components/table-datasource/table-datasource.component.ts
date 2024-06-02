import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  input,
  Output,
  output,
  ViewChild,
} from '@angular/core';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-datasource',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    CommonModule,
  ],
  templateUrl: './table-datasource.component.html',
  styleUrl: './table-datasource.component.scss',
})
export class TableDatasourceComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Input() columnsToDisplay: string[] = [];
  @Input() dataSource: any;
  @Input() pageSize: number = 5;
  @Input() pageIndex: number = 0;
  @Input() count: number = 0;

  @Output() onPageChangeFromChild: EventEmitter<PageEvent> = new EventEmitter();
  @Output() onFilterFromChild: EventEmitter<Event> = new EventEmitter();
  @Output() onUpdateFromChild: EventEmitter<Event> = new EventEmitter();

  /**
   * Render
   */
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Emit filter event
  applyFilter(event: Event): void {
    this.onFilterFromChild.emit(event);
  }

  // Emit pagination event
  pageEvent(event: PageEvent): void {
    this.onPageChangeFromChild.emit(event);
  }

  // // Update Object
  // updateObject(event: Event): void {
  //   this.onUpdateFromChild.emit(event);
  // }
}
