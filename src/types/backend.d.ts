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
    };
    content: string;
    image: string;
    likes: {
      _id: string;
      name: string;
      email: string;
      avatar: string;
    }[];
    comments: {
      _id: string;
      user: {
        _id: string;
        name: string;
        email: string;
        avatar: string;
      };
        content: string;
        createdAt: string;
    }[];
    isDeleted: boolean;
    createdAt: string;
    upDatedAt: string;
  }
}
