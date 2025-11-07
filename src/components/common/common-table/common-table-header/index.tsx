import { Checkbox, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';

import { CommonTableColumn } from '../common-table.interface';
import { SortOrder } from '../common-table.interface';

interface CommonTableHeadProps<T = unknown> {
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: SortOrder;
  orderBy: string;
  columns: CommonTableColumn<T>[];
  showIndex?: boolean;
  selection?: boolean;
  isChecked: boolean;
}

function CommonTableHead<T = unknown>(props: CommonTableHeadProps<T>) {
  const { onSelectAllClick, order, orderBy, onRequestSort, columns, showIndex, selection, isChecked } = props;
  const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  const getOrder = (order: SortOrder) => {
    return order === SortOrder.ASC ? 'asc' : 'desc';
  };

  return (
    <TableHead sx={{ bgcolor: '#E9E4CE', whiteSpace: 'pre' }}>
      <TableRow>
        {selection ? (
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              checked={isChecked}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all desserts'
              }}
            />
          </TableCell>
        ) : null}
        {showIndex ? <TableCell sx={{ color: '#000', fontWeight: '600' }}>S.NO</TableCell> : null}

        {columns.map((headCell) => (
          <TableCell
            sx={{ color: '#000', fontWeight: '600' }}
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? getOrder(order) : false}
          >
            {headCell.sorting ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? getOrder(order) : 'asc'}
                onClick={createSortHandler(headCell.id)}
                hideSortIcon={false}
                sx={{
                  '& .MuiTableSortLabel-icon': {
                    opacity: orderBy === headCell.id ? 1 : 0.2
                  }
                }}
              >
                {headCell.title}
                {/* {orderBy === headCell.id ? (
                  <Box component="span" >
                    {order === OrderBy.DESC ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null} */}
              </TableSortLabel>
            ) : (
              headCell.title
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default CommonTableHead;
