import HttpClient from './HttpClient';

class UserService {
  constructor() {
    this.httpClient = new HttpClient(`${import.meta.env.VITE_NODE_API_URL}`);
  }

  async getUser(id) {
    return this.httpClient.get(`/users/${id}`);
  }

  async login(user) {
    return this.httpClient.post('/login', { body: user });
  }

  async register(user) {
    return this.httpClient.post('/user', { body: user });
  }
}

export default new UserService();
