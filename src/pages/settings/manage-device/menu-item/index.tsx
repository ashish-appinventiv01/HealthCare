import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Divider, IconButton, ListItemText, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';

interface MenuItemProps {
  id: string;
  handleView: (id: string) => void;
  handleDelete: (id: string) => void;
  handleEdit: (id: string) => void;
}

const ManageDeviceMenuItem = ({ id, handleView, handleDelete, handleEdit }: MenuItemProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? 'long-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={(event: React.MouseEvent<HTMLElement>) => handleClick(event)}
          sx={(theme) => ({
            backgroundColor: theme.palette.secondary.light,
            borderRadius: '6px',
            '&:hover': {
              backgroundColor: theme.palette.secondary.light
            }
          })}
        >
          <MoreVertIcon />
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id={'actions-menu' + id}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 1px 2px rgba(0,0,0,0.2))',
            mt: 1.5,
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => handleView(id)}>
          <ListItemText>View</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => handleEdit(id)}>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => handleDelete(id)}>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ManageDeviceMenuItem;


