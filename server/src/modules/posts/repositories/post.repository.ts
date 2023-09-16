import { Post } from "../entities/post.entity";

export type PostEdit = {
  postId: string
  userId: string
  description: string
  picturePath: string | undefined
}

export interface IPostRepository {
  savePost(data: Post): Promise<Post>;
  getAllPosts(): Promise<Post[]>;
  getUserPosts(userId: string): Promise<Post[] | null>;
  findById(id: string): Promise<Post | null>;
  
  editByPost(data: PostEdit): Promise<Post | null>
  deleteByPost(postId: string): Promise<Post | null>

  updateLikeList(id: string, frienId: string): Promise<Post>;
  removeLikeList(
    id: string,
    idFriend: string,
    listFriends: string[]
  ): Promise<Post | null>;

  // Comments
  addComments(id: string, idComment: string): Promise<Post>;
  deleteCommentPost(id: string, idComment: string, listComments: string[]): Promise<Post | null>
}
