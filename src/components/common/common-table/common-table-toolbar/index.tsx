import { Close, Search } from '@mui/icons-material';
import { Button, FormControl, IconButton, InputAdornment, OutlinedInput, Toolbar, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { alpha, Box } from '@mui/system';
import { has } from 'lodash';
import React, { useEffect, useState, useMemo, useRef } from 'react';
import { SortOrder } from '../common-table.interface';
import debounce from 'lodash/debounce';

const useDebounce = (debounceTime: number, callback: () => void) => {
  const ref = useRef<(() => void) | null>(null);

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const debouncedCallback = useMemo(() => {
    const func = () => {
      ref.current?.();
    };

    return debounce(func, debounceTime);
  }, [debounceTime]);

  return debouncedCallback;
};




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
interface CommonTableToolbarProps {
  numSelected: number;
  tableTitle: string;
  filterComponent?: () => React.ReactNode;
  componentTabs?: () => React.ReactNode;
  addNewHandler?: () => void;
  searchPlaceholder?: string;
  searchHandler: (searchText: string) => void;
  searchText: string | undefined;
  pageOptions: PaginatedQuery | undefined;
  addNewText?: string;
  hideHeader: boolean;
  componentAfterRowSelected?: () => React.ReactNode;
  extraButtons?: () => React.ReactNode;
  extraTitleView?: () => React.ReactNode;
}

function CommonTableToolbar(props: CommonTableToolbarProps) {
  const {
    numSelected,
    tableTitle,
    filterComponent,
    componentTabs,
    addNewHandler,
    addNewText,
    searchPlaceholder,
    searchHandler,
    searchText: search,
    pageOptions,
    hideHeader,
    componentAfterRowSelected,
    extraButtons,
    extraTitleView
  } = props;
  const [searchText, setSearchText] = useState(search ? search : '');

  const debouncedSearch = useDebounce(500, () => {
    const value = searchText ? String(searchText).trim() : '';
    if (!has(pageOptions, 'search') && !value) {
      return;
    }

    if (pageOptions && pageOptions.search !== value) {
      searchHandler(value);
    }

    if (searchText && !value) {
      setSearchText('');
    }
  });

  useEffect(() => {
    if (pageOptions) {
      setSearchText(pageOptions.search ? pageOptions.search : '');
    }
  }, [pageOptions]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitizedValue = (e.target.value || '').replace(/^\s+/, '');
    setSearchText(sanitizedValue);
    debouncedSearch();
  };

  const handleClearSearch = () => {
    setSearchText('');
    searchHandler('');
  };

  return !hideHeader ? (
    <Toolbar
      sx={{
        pl: '16px',
        pr: '16px',
        pt: '20px',
        pb: '0px',
        flexDirection: 'column',
        alignItems: 'flex-start',
        ...(numSelected > 0 && {
          bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)
        })
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px'
        }}
      >
        {numSelected > 0 ? (
          <Typography sx={{ flex: '1 1 30%' }} color="inherit" variant="subtitle1" component="div">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography sx={{ flex: '1 1 30%' }} variant="h3" id="tableTitle" component="h1">
            {tableTitle}
          </Typography>
        )}
        {numSelected > 0 ? (
          //show Component after row is selected
          componentAfterRowSelected && componentAfterRowSelected()
        ) : (
          <Grid container direction="row" justifyContent="flex-end" gap="10px" flexBasis="1 1 auto">
            {extraTitleView && extraTitleView()}
            {/* search */}
            {searchPlaceholder && (
              <>
                <FormControl sx={{ minWidth: '20rem' }}>
                  <OutlinedInput
                    type="text"
                    value={searchText}
                    autoComplete="off"
                    inputProps={{
                      autoComplete: 'off'
                    }}
                    onChange={onChange}
                    placeholder={searchPlaceholder ? searchPlaceholder : 'Search'}
                    startAdornment={
                      <InputAdornment position="start">
                        {/* <img src = {FilterIcon} alt='Filter Icon' style={{marginRight: '5px'}}/> */}
                        <Search color="primary" />
                      </InputAdornment>
                    }
                    endAdornment={
                      searchText && searchText.length ? (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClearSearch}
                            edge="end"
                            size="large"
                          >
                            <Close />
                          </IconButton>
                        </InputAdornment>
                      ) : null
                    }
                  />
                </FormControl>
              </>
            )}
            {filterComponent && <Box sx={{ minHeight: '3.5rem' }}>{filterComponent()}</Box>}

            {extraButtons && extraButtons()}
            {addNewHandler && (
              <Button
                onClick={addNewHandler}
                variant="contained"
                disableElevation
                sx={{ minHeight: '3.5rem', background: '#7A7F69', padding: '13px 24px', borderRadius: '10px' }}
                // startIcon={<Add sx={{ '& .MuiSvgIcon-root': { fontSize: '1.5rem' } }} />}
              >
                {addNewText ? addNewText : 'Add'}
              </Button>
            )}
          </Grid>
        )}
      </Box>
      {componentTabs && <Box>{componentTabs()}</Box>}
    </Toolbar>
  ) : null;
}

export default CommonTableToolbar;
