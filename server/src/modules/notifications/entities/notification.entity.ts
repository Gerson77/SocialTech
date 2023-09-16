import { randomUUID } from "crypto";

type INotification = {
  action: string;
  status: boolean
  userId: string
  savedAt: number

  idFriend: string;
  firstName: string;
  userPicturePath: string;

  idPost: string | null;
  postPicturePath: string | null;

  contentComment: string | null;
};

export class Notification {
  id: string;
  action: string;
  status: boolean
  userId: string
  savedAt: number

  idFriend: string;
  firstName: string;
  userPicturePath: string;

  idPost: string | null;
  postPicturePath: string | null;

  contentComment: string | null;

  private constructor(props: INotification) {
    this.id = randomUUID();
    this.action = props.action;
    this.status = false
    this.userId = props.userId
    this.savedAt = props.savedAt

    this.idFriend = props.idFriend;
    this.firstName = props.firstName;
    this.userPicturePath = props.userPicturePath;

    this.idPost = props.idPost;
    this.postPicturePath = props.postPicturePath;

    this.contentComment = props.contentComment;
  }

  static async createNotification(data: INotification) {
    const notification = new Notification(data);
    return notification;
  }
}
