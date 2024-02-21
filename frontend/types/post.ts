import {ReactElement} from 'react';
import {UserNewApi} from '@/types/auth';

export type Post = {
  title: string,
  description: string,
  tags?: string[],
  isOpen: boolean,
  createdDate: string,
  comments?: PostCommentType[], // temporary, will change to Comment type
  reactions?: ReactionType[],
  creator: string // should be user
}

export type PostNewApi = {
  id: string | number,
  title: string,
  content: string,
  creationDate: string,
  photoPath: string,
  posterId: {
    id: string | number,
  }
}

export type ReactionType = {
  label: string,
  icon: string,
  number: number
}

export type ReactionNewApi = {
  id: string | number,
  reactionType: string,
  entityType: string,
  entityId: string | number,
  account: UserNewApi,
}

export type PostCommentType = {
  content: string,
  creator: string,
  createdDate: string,
  reactions?: ReactionType[],
}

export type CommentNewApi = {
  id: string | number,
  content: string,
  creationDate: string,
  commenterId: {
    id: string | number,
  }
}
