import { Request, Response } from "express";
import { IUserRepository } from "../../../users/repositories/user.repository";
import { IPostRepository } from "../../repositories/post.repository";
import { DeletePostUseCase } from "./delete-post.usecase";

export class DeletePostController {
    constructor(private postRepository: IPostRepository, private userRepository: IUserRepository){}

    async handle(request: Request, response: Response) {
        try {
            const { userId, postId} = request.params
            const deletePost = new DeletePostUseCase(this.postRepository, this.userRepository)
            const result = await deletePost.execute(userId, postId)
            return response.json(result)
        }catch (err: any) {
            return response.status(400).json(err.message)
        }
    }
}