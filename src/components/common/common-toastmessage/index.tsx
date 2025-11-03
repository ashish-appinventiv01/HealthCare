import { toast, TypeOptions } from 'react-toastify';

class ToastService {
  showToast(message = 'OOPS! something went wrong', type: TypeOptions = 'error', toastId = '') {
    toast(message, {
      type,
      theme: 'colored',
      pauseOnHover: false,
      position: 'top-right',
      pauseOnFocusLoss: false,
      ...(toastId.length > 0 && { toastId })
    });
  }
}

export const toastService = new ToastService();
