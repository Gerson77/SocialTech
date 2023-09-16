import { UserPrismaRepository } from "../../../users/repositories/prisma/user.prisma.repository"
import { PostPrismaRepository } from "../../repositories/prisma/post.prisma.repository"
import { EditPostController } from "./edit-post.controller"

const postPrismaRepository = new PostPrismaRepository()
const userPrismaRepository = new UserPrismaRepository()
const editPostController = new EditPostController(postPrismaRepository, userPrismaRepository)


export { editPostController }