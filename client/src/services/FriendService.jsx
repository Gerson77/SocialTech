import HttpClient from './HttpClient';

class FriendService {
  constructor() {
    this.httpClient = new HttpClient(`${import.meta.env.VITE_NODE_API_URL}`);
  }

  async getByFriend(id) {
    return this.httpClient.get(`/users/${id}`);
  }

  async getListFriends(id) {
    return this.httpClient.get(`/users/${id}/friends`);
  }

  async addFriend(id, friendId) {
    return this.httpClient.patch(`/users/${id}/${friendId}`);
  }

  async removedFriend(id, friendId) {
    return this.httpClient.put(`/users/${id}/${friendId}`);
  }
}

export default new FriendService();
