import { UserPrismaRepository } from "../../../users/repositories/prisma/user.prisma.repository";
import { PostPrismaRepository } from "../../repositories/prisma/post.prisma.repository";
import { DeletePostController } from "./delete-post.controller";

const userPrismaRepository = new UserPrismaRepository()
const postPrismaRepository = new PostPrismaRepository()
const deletePostController = new DeletePostController(postPrismaRepository, userPrismaRepository)

export { deletePostController }