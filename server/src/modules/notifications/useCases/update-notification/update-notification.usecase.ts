import { INotificationRepository } from "../../repositories/notification.repository";

export class UpdateNotificationUseCase {
  constructor(private notificationRepository: INotificationRepository) {}

  async execute(id: string, userId: string, status: boolean) {
    const notification = await this.notificationRepository.findByNotificationId(
      id
    );

    if (!notification) {
      throw new Error("Notification does not exists");
    }

    if (status) await this.notificationRepository.updateStatusNotification(id);
    
    const notifications = await this.notificationRepository.findByAllNotificationUser(userId)

    return notifications
  }
}
