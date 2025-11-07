import { CommonTableColumn, CommonTableConfig, CommonTableOptions } from '../../../components/common/common-table/common-table.interface';
import { DeviceItem } from './manage-device-list.helper';

export class ManageDeviceListSource implements CommonTableConfig {
  columns: CommonTableColumn<DeviceItem>[] = [
    {
      id: 'name',
      title: 'Device Name',
      sorting: false,
      resolve: (item) => item.name
    },
    {
      id: 'status',
      title: 'Status',
      templateBy: 'status',
      sorting: false
    },
    {
      id: 'createdAt',
      title: 'Added On',
      templateBy: 'createdAt',
      sorting: true
    },
    {
      id: 'actions',
      title: 'Actions',
      templateBy: 'actions'
    }
  ];

  options: CommonTableOptions = {
    pagination: true,
    tableTitle: 'Manage Devices',
    showIndex: true,
    selection: false,
    searchPlaceholder: 'Search by device name'
  };
}


