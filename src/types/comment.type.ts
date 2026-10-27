import type {User} from './user.type.js';

export type Comment = {
  text: string;
  postDate: string;
  rating: number;
  author: User;
};