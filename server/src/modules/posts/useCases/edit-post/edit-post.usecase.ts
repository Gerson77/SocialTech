import { IUserRepository } from "../../../users/repositories/user.repository";
import { IPostRepository } from "../../repositories/post.repository";

type PostRequest = {
  postId: string;
  userId: string;
  description: string;
  picturePath: string;
};

export class EditPostUseCase {
  constructor(
    private postRepository: IPostRepository,
    private userRepository: IUserRepository
  ) {}

  async execute(data: PostRequest, picturePath?: string) {
    const post = await this.postRepository.findById(data.postId);

    if (!post) {
      throw new Error("Post does not exists");
    }

    const user = await this.userRepository.findById(data.userId);

    if (!user) {
      throw new Error("Post does not belong to this user");
    }

    const editedPost = await this.postRepository.editByPost({
      postId: data.postId,
      userId: data.userId,
      description: data.description,
      picturePath: picturePath,
    });

    return editedPost;
  }
}
