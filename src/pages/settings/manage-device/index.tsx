import { Button } from '@mui/material';
import CommonTable from '../../../components/common/common-table';
import { useManageDeviceListHelper, DeviceItem } from './manage-device-list.helper';
import { ManageDeviceListSource } from './manage-device-list.model';
import ManageDeviceMenuItem from './menu-item';

const ManageDeviceList = () => {
  const source = new ManageDeviceListSource();
  const {
    devices,
    status,
    total,
    pageOptions,
    handlePageOptionsChanged,
    handleView,
    handleDelete,
    handleEdit,
    handleAddNew
  } = useManageDeviceListHelper();

  return (
    <CommonTable
      config={source}
      rows={devices}
      total={total}
      pageOptions={pageOptions}
      status={status}
      handlePageOptionsChanged={handlePageOptionsChanged}
      addNewHandler={handleAddNew}
      addNewText={"Add Device"}
    >
      {{
        createdAt: (item: DeviceItem) => (item.createdAt ? new Date(item.createdAt).toLocaleDateString() : '-'),
        status: (item: DeviceItem) => (item.status ?? '-'),
        actions: (item: DeviceItem) => (
          <ManageDeviceMenuItem
            id={item._id}
            handleView={handleView}
            handleDelete={() => handleDelete(item._id)}
            handleEdit={() => handleEdit(item._id)}
          />
        ),
        extraButtons: () => (
          <Button variant="contained" color="primary" onClick={handleAddNew} sx={{ minWidth: '4rem' }}>
            Add Device
          </Button>
        )
      }}
    </CommonTable>
  );
};

export default ManageDeviceList;


