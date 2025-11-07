import { useEffect, useMemo, useState } from 'react';
import { DEFAULT_PAGE_OPTIONS } from '../../../constants/app.constants';
import { ApiState, PaginatedQuery } from '../../../components/common/common-table/common-table.interface';

export interface DeviceItem {
  _id: string;
  name: string;
  status: 'Active' | 'Inactive';
  createdAt: string;
}

const MOCK_DEVICES: DeviceItem[] = Array.from({ length: 42 }).map((_, idx) => ({
  _id: `dev-${idx + 1}`,
  name: `Device ${idx + 1}`,
  status: idx % 3 === 0 ? 'Inactive' : 'Active',
  createdAt: new Date(Date.now() - idx * 86400000).toISOString()
}));

export const useManageDeviceListHelper = () => {
  const [status, setStatus] = useState<ApiState>('loading');
  const [pageOptions, setPageOptions] = useState<PaginatedQuery>({ ...DEFAULT_PAGE_OPTIONS, search: '' });
  const [allDevices, setAllDevices] = useState<DeviceItem[]>([]);

  useEffect(() => {
    setStatus('loading');
    // Mock fetch delay
    const timer = setTimeout(() => {
      setAllDevices(MOCK_DEVICES);
      setStatus('succeeded');
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const filteredDevices = useMemo(() => {
    const query = (pageOptions.search ?? '').toLowerCase();
    if (!query) return allDevices;
    return allDevices.filter((d) => d.name.toLowerCase().includes(query));
  }, [allDevices, pageOptions.search]);

  const total = filteredDevices.length;

  const devices = useMemo(() => {
    const page = pageOptions.page ?? 1;
    const limit = pageOptions.limit ?? 10;
    const start = (page - 1) * limit;
    return filteredDevices.slice(start, start + limit);
  }, [filteredDevices, pageOptions.page, pageOptions.limit]);

  const handlePageOptionsChanged = (data: PaginatedQuery) => setPageOptions(data);

  // Mock actions
  const handleView = (id: string) => {
     
    alert(`View device ${id}`);
  };
  const handleEdit = (id: string) => {
     
    alert(`Edit device ${id}`);
  };
  const handleDelete = (id: string) => {
     
    alert(`Delete device ${id}`);
  };
  const handleAddNew = () => {
     
    alert('Add new device');
  };

  return {
    devices,
    status,
    total,
    pageOptions,
    handlePageOptionsChanged,
    handleView,
    handleDelete,
    handleEdit,
    handleAddNew
  };
};


