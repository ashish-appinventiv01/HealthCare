import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import {
  Box,
  Checkbox,
  IconButton,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Tooltip,
  useTheme
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { difference } from 'lodash';
import { Fragment } from 'react';
import { fadeIn } from '../../../animations/fadeIn';
import { DEFAULT_PAGE_OPTIONS } from '../../../constants/app.constants';
import { ApiState, PaginatedQuery } from './common-table.interface';
import { SortOrder } from './common-table.interface';
import CommonTableHead from './common-table-header';
import CommonTableToolbar from './common-table-toolbar';
import { CommonTableColumn, CommonTableConfig } from './common-table.interface';


interface CommonTableProps<T = unknown> {
  config: CommonTableConfig<T>;
  rows: Array<T>;
  total: number;
  children: Record<string, (row: T) => React.ReactNode>;
  pageOptions?: PaginatedQuery;
  status: ApiState;
  handlePageOptionsChanged?: (data: PaginatedQuery) => void;
  addNewHandler?: () => void;
  addNewText?: string;
  handleRowSelectionChange?: (rows: T[]) => void;
  selectedRows?: T[];
}

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

export default function CommonTable<T extends { _id: string } = { _id: string }>(props: CommonTableProps<T>) {
  const {
    config,
    rows,
    total,
    children,
    pageOptions,
    status,
    handlePageOptionsChanged,
    handleRowSelectionChange,
    selectedRows = []
  } = props;

  const handleRequestSort = (_event: React.MouseEvent<unknown>, property: string) => {
    if (pageOptions && handlePageOptionsChanged) {
      const isAsc = pageOptions.orderBy === property && pageOptions.order === SortOrder.ASC;

      handlePageOptionsChanged({
        ...pageOptions,
        page: 1,
        orderBy: property,
        order: isAsc ? SortOrder.DESC : SortOrder.ASC
      });
    }
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    let selectedEntities: T[] = [];

    if (event.target.checked) {
      const uniqueRows = difference(rows, selectedRows);
      selectedEntities = [...selectedRows, ...uniqueRows];
    } else {
      selectedEntities = selectedRows.filter((selectedRow) => !rows.find((row) => row._id === selectedRow._id));
    }

    if (handleRowSelectionChange) {
      handleRowSelectionChange(selectedEntities);
    }
  };

  const handleOnRowSelected = (isChecked: boolean, selectedRow: T) => {
    let selectedEntities: T[] = [];
    if (isChecked) {
      selectedEntities = [selectedRow, ...selectedRows];
    } else {
      selectedEntities = selectedRows.filter((row: T) => row._id !== selectedRow._id);
    }

    if (handleRowSelectionChange) {
      handleRowSelectionChange(selectedEntities);
    }
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    if (pageOptions && handlePageOptionsChanged) {
      handlePageOptionsChanged({
        ...pageOptions,
        page: newPage
      });
    }
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (pageOptions && handlePageOptionsChanged) {
      handlePageOptionsChanged({
        ...pageOptions,
        page: 1,
        limit: parseInt(event.target.value, 10)
      });
    }
  };

  const isSelected = (id: string) => {
    if (selectedRows && selectedRows.length) {
      const row = selectedRows.filter((row) => row._id === id);
      return row.length ? true : false;
    }
    return false;
  };

  const isAllSelected = () => {
    let isAllSelected = false;
    if (selectedRows && selectedRows.length) {
      for (let index = 0; index < rows.length; index++) {
        if (!selectedRows.some((entity: T) => entity._id === rows[index]._id)) {
          isAllSelected = false;
          break;
        } else {
          isAllSelected = true;
        }
      }
    }
    return isAllSelected;
  };

  const renderLoading = () => {
    return (
      <Paper sx={{ display: 'flex', flexDirection: 'column', padding: '16px' }}>
        <Skeleton
          height={100}
          width={'100%'}
          variant="rectangular"
          animation="wave"
          sx={{ borderRadius: '8px', marginTop: '16px' }}
        />
        <Skeleton
          height={300}
          width={'100%'}
          variant="rectangular"
          animation="wave"
          sx={{ borderRadius: '8px', marginTop: '16px' }}
        />
      </Paper>
    );
  };
  const renderTable = () => {
    function TablePaginationActions(props: TablePaginationActionsProps) {
      const theme = useTheme();
      const { count, page, rowsPerPage, onPageChange } = props;

      const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, 0);
      };

      const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page - 1);
      };

      const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page + 1);
      };

      const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
      };

      return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
          <Tooltip title="First page">
            <span>
              <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Previous page">
            <span>
              <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Nex page">
            <span>
              <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
              >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Last page">
            <span>
              <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
              >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
              </IconButton>
            </span>
          </Tooltip>
        </Box>
      );
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', padding: '16px' }}>
        <TableContainer sx={{ marginBottom: '30px' }}>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <CommonTableHead
              columns={config.columns}
              isChecked={isAllSelected()}
              order={pageOptions?.order ?? SortOrder.ASC}
              orderBy={pageOptions?.orderBy ?? ''}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              showIndex={!!config.options.showIndex}
              selection={!!config.options.selection}
            />
            <TableBody>
              {rows.map((row, index) => {
                const isItemSelected = isSelected(row._id);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    // hover
                    onClick={() =>
                      config.options.selection && handleOnRowSelected
                        ? isItemSelected
                          ? handleOnRowSelected(false, row)
                          : handleOnRowSelected(true, row)
                        : null
                    }
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row._id}
                    selected={isItemSelected}
                    sx={() =>
                      config.options.selection
                        ? {
                            cursor: 'pointer'
                          }
                        : {}
                    }
                  >
                    {config.options.selection ? (
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId
                          }}
                        />
                      </TableCell>
                    ) : null}
                    {config.options.showIndex && pageOptions ? (
                      <TableCell style={{ width: '20px' }} align="left">
                        {index + 1 + ((pageOptions?.page ?? 0) - 1) * (pageOptions?.limit ?? 0)}
                      </TableCell>
                    ) : (
                      <TableCell style={{ width: '20px' }} align="left">
                        {index + 1}
                      </TableCell>
                    )}

                    {config.columns.map((column: CommonTableColumn<T>, idx: number) => (
                      <TableCell key={idx} align="left">
                        {column.resolve ? column.resolve(row) : children[column.templateBy!](row)}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        {config.options.pagination && pageOptions && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={total}
            rowsPerPage={pageOptions.limit ?? 0}
            page={(pageOptions.page ?? 1) - 1}
            onPageChange={(event, newPage) => handleChangePage(event, newPage + 1)}
            onRowsPerPageChange={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
            sx={(theme) => ({
              '& .MuiTablePagination-toolbar': {
                backgroundColor: theme.palette.background.paper,
                borderRadius: '8px',
                padding: '0px',
                minHeight: '50px'
              }
            })}
          />
        )}
      </div>
    );
  };

  const renderNoData = () => {
    return (
      <>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
          <CommonTableHead
            columns={config.columns}
            isChecked={false}
            order={null!}
            orderBy={null!}
            onSelectAllClick={() => {
              return;
            }}
            onRequestSort={() => {
              return;
            }}
            showIndex={!!config.options.showIndex}
            selection={false}
          />
        </Table>
        <Paper
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            minHeight: '400px'
          }}
        >
          <img
            height="100px"
            width="100px"
            style={{ filter: 'invert(48%) sepia(9%) saturate(816%) hue-rotate(176deg) brightness(91%) contrast(83%)' }}
            src={"/images/error.svg"}
            alt=""
          />
          <Typography variant="h4" sx={(theme) => ({ color: theme.palette.grey[500] })}>
            No Records Found
          </Typography>
        </Paper>
      </>
    );
  };

  return (
    <motion.div transition={{ duration: 0.2 }} variants={fadeIn} initial="hidden" animate="visible">
      <Fragment>
        <Box sx={{ width: '100%' }}>
          <Paper sx={{ width: '100%', mb: 2, background: 'none' }}>
            {/* <CommonTableToolbar
              searchText={pageOptions && pageOptions.search}
              numSelected={selectedRows && selectedRows.length ? selectedRows.length : 0}
              tableTitle={config.options.tableTitle}
              filterComponent={children.filterComponent}
              componentTabs={children.componentTabs}
              componentAfterRowSelected={children.componentAfterRowSelected}
              addNewHandler={addNewHandler}
              searchPlaceholder={config.options.searchPlaceholder}
              searchHandler={handleSearch}
              pageOptions={pageOptions}
              addNewText={addNewText}
              hideHeader={!!config.options.hideHeader}
              extraButtons={children.extraButtons}
              extraTitleView={children.extraTitleView}
            /> */}
            <>{status === 'loading' && renderLoading()}</>
            <>{status === 'succeeded' && total ? renderTable() : null}</>
            <>{status !== 'loading' && status !== 'idle' && !total ? renderNoData() : null}</>
          </Paper>
        </Box>
      </Fragment>
    </motion.div>
  );
}
