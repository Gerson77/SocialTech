import HttpClient from './HttpClient';

class NotificationService {
  constructor() {
    this.httpClient = new HttpClient(`${import.meta.env.VITE_NODE_API_URL}`);
  }

  async getAllNotifications(id) {
    return this.httpClient.get(`/notifications/${id}`);
  }

  async addNotification(id, formData) {
    return this.httpClient.post(`/notifications/${id}`, { body: formData });
  }

  async markNotificationRead(userId, id) {
    // /notifications/:userId/notification/:id
    // return this.httpClient.put(`/notifications/${id}`, { body: { status: true } });
    return this.httpClient.put(`/notifications/${userId}/notification/${id}`, { body: { status: true } });
  }
}

export default new NotificationService();
