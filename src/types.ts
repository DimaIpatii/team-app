export interface IUsersResponse {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface IPostsResponse {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface IBuffer {
  current: {
    [key: number]: IPostsResponse[];
  };
}

export type PostsReturn = [
  IPostsResponse[],
  (userId: number) => Promise<void>,
  boolean,
  string
];

export type IUserData = {
  user: IUsersResponse | Record<string, never>;
  posts: IPostsResponse[];
};

export interface IUserComponentProps {
  user: IUsersResponse;
  userSrc: string;
  viewPort: number;
  getPosts: (userId: number) => void;
  setShowInfo: (userId: number) => void;
}

export interface IPostComponentProps {
  userPost: IUserData;
  viewport: number;
  spinner?: boolean;
  postsErrorMsg?: string;
  clousePost?: () => void;
}

export interface IPopupComponentProps {
  userData: IUserData;
  imgSrc: string;
  postsErrorMsg: string;
}
