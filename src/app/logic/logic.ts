import { toast } from "react-toastify";

export const checkReceiver = (arr: [IUser, IUser], arg: string): IUser | undefined => {
    if (arg === arr[0]._id) {
      return arr[1];
    } else if (arg === arr[1]._id) {
      return arr[0];
    }
    return undefined; // Trả về undefined nếu không tìm thấy
};

export const isValidContent = (content: string): boolean => {
  return content.trim() !== "";
};

export const notifySuccess = (message: string) =>
toast.success(message, {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
});

export const notifyError = (message: string) =>
toast.error(message, {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
});