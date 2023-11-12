export {};

declare global {
  interface IRequest {
    url: string;
    method: string;
    body?: { [key: string]: any };
    queryParams?: any;
    useCredentials?: boolean;
    headers?: any;
    nextOption?: any;
  }

  interface IBackendRes<T> {
    error?: string | string[];
    message: string;
    statusCode: number | string;
    data?: T;
  }

  interface IPost {
    _id: string;
    author: {
      _id: string;
      name: string;
      email: string;
      avatar: string;
      isActive: boolean;
    };
    content: string;
    image: string;
    likes: {
      _id: string;
      name: string;
      email: string;
      avatar: string;
      isActive: boolean;
    }[];
    comments: {
      _id: string;
      user: {
        _id: string;
        name: string;
        email: string;
        avatar: string;
        isActive: boolean;
      };
      content: string;
      createdAt: string;
    }[];
    isDeleted: boolean;
    createdAt: string;
    upDatedAt: string;
  }

  interface IUser {
    _id: string;
    email: string;
    name: string;
    avatar: string;
    cover: string;
    role: string;
    note: string;
    work: string;
    live: string;
    from: string;
    isActive: boolean;
    type: string;
    followers: string[];
    followings: string[];
    isDeleted: false;
    createdAt: string;
    updatedAt: string;
  }
  interface IChat {
    _id: string;
    chatName: string;
    isGroupChat: boolean;
    users: IUser[];
    isDeleted: false;
    createdAt: string;
    updatedAt: string;
    latestMessage: {
      _id: string;
      content: string;
      sender: IUser;
    };
  }

  interface IMessage {
    _id: string;
    content: string;
    sender: IUser;
    chat: IChat;
    isDeleted: false;
    createdAt: string;
    updatedAt: string;
  }

  interface IChatContext {
    chats: any;
    setChats: (v: any) => void;
    selectedChat: any;
    setSelectedChat: (v: any) => void;
  }

  interface IUserContext {
    onlineUsers: any;
    setOnlineUsers: (v: any) => void;
    socket: any;
    setSocket: (v: any) => void;
  }

  interface INotification {
    sender: IUser;
    message: string;
    post?: IPost;
    type: string;
    createdAt: string;
  }
}
