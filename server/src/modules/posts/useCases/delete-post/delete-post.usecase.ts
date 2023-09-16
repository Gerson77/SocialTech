import { IUserRepository } from "../../../users/repositories/user.repository";
import { IPostRepository } from "../../repositories/post.repository";

export class DeletePostUseCase {
    constructor(private postRepository: IPostRepository, private userRepository: IUserRepository) {}

    async execute(userId: string, postId: string) {
        const post = await this.postRepository.findById(postId)

        if(!post) {
            throw new Error('Post does not exists')
        }

        const user = await this.userRepository.findById(userId)

        if(!user) {
            throw new Error('User not found')
        }

        if(post.userId === userId) {
            await this.postRepository.deleteByPost(postId)
        
            return { message: 'Post deleted' }
        }
    
        return false
    }
}