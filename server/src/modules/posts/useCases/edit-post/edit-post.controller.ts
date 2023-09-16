import { Request, Response } from "express";
import { IPostRepository } from "../../repositories/post.repository";
import { EditPostUseCase } from "./edit-post.usecase";
import { IUserRepository } from "../../../users/repositories/user.repository";

export class EditPostController {
    constructor(
        private postRepository: IPostRepository,
        private userRepository: IUserRepository
      ) {}

  async handle(request: Request, response: Response) {
    try {
      const { userId, postId } = request.params;
      const data = request.body
      const picturePath = request.file?.filename;
      const editPostUseCase = new EditPostUseCase(
        this.postRepository,
        this.userRepository
      );

      const postEdited = {
        postId,
        userId,
        description: data.description,
        picturePath: data.picturePath,
      };

      const result = await editPostUseCase.execute(postEdited, picturePath);
      return response.json(result);
    } catch (err: any) {
      return response.status(400).json(err.message);
    }
  }
}
