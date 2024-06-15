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
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-generic-table-data-source',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    CommonModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  templateUrl: './generic-table-data-source.component.html',
  styleUrl: './generic-table-data-source.component.scss',
})
export class GenericTableDataSourceComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Input() columnsToDisplay: string[] = [];
  @Input() dataSource: any;
  @Input() pageSize: number = 5;
  @Input() pageIndex: number = 0;
  @Input() count: number = 0;

  @Output() onPageChangeFromChild: EventEmitter<PageEvent> = new EventEmitter();
  @Output() onFilterFromChild: EventEmitter<Event> = new EventEmitter();
  @Output() onEditFromChild: EventEmitter<any> = new EventEmitter();
  @Output() onDisableFromChild: EventEmitter<any> = new EventEmitter();

  /**
   * Render @ViewChild element after paginator and sort
   * have been initialized
   */
  ngAfterViewInit(): void {
    // this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Emit the event for parent to handle the searching filter logic
   * @param event
   */
  applyFilter(event: Event): void {
    this.onFilterFromChild.emit(event);
  }

  /**
   * Emit the event for parent to handle page changing logic
   * @param event
   */
  pageEvent(event: PageEvent): void {
    this.onPageChangeFromChild.emit(event);
  }

  /**
   * Edit the current data source based on updated data
   * @param object
   */
  editObject(object: any): void {
    this.onEditFromChild.emit(object);
  }

  /**
   * Disable object from the current data source
   * @param object
   */
  deleteObject(object: any): void {
    this.onDisableFromChild.emit(object);
  }
}
