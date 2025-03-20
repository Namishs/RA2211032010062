export interface User {
  id: string;
  username: string;
  postCount: number;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  content: string;
  createdAt: string;
}

export interface Post {
  id: string;
  userId: string;
  content: string;
  createdAt: string;
  commentCount: number;
}