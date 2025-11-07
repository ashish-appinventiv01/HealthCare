export interface CommonTableColumn<T> {
  title: string;
  id: string;
  sorting?: boolean;
  resolve?: (row: T) => number | string | Date | boolean;
  templateBy?: string;
}
export interface CommonTableOptions {
  selection?: boolean;
  pagination: boolean;
  tableTitle: string;
  showIndex?: boolean;
  searchPlaceholder?: string;
  hideHeader?: boolean;
}

export interface CommonTableConfig<T = unknown> {
  options: CommonTableOptions;
  columns: CommonTableColumn<T>[];
}
export const enum SortOrder {
  ASC = 'asc',
  DESC = 'desc'
}
export interface PaginatedQuery {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: SortOrder;
  // filter?: Record<string, unknown>;
  filter?: Record<string, unknown>;
  [key: string]: unknown;
}

export type ApiState = 'idle' | 'loading' | 'succeeded' | 'failed';