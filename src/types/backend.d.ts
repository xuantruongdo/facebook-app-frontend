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
    isActive: boolean,
    type: string;
    followers: string[];
    followings: string[];
    isDeleted: false,
    createdAt: string;
    updatedAt: string;
  }
}
