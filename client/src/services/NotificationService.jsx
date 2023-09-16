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

  async markNotificationRead(id) {
    return this.httpClient.put(`/notifications/${id}`, { body: { status: true } });
  }
}

export default new NotificationService();
