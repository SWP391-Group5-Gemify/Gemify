export interface PaginationModel<T> {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: T[];
}
