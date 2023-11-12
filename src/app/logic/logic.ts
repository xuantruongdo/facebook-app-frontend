export const checkReceiver = (arr: [IUser, IUser], arg: string): IUser | undefined => {
    if (arg === arr[0]._id) {
      return arr[1];
    } else if (arg === arr[1]._id) {
      return arr[0];
    }
    return undefined; // Trả về undefined nếu không tìm thấy
};