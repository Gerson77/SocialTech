import HttpClient from './HttpClient';

class CommentService {
  constructor() {
    this.httpClient = new HttpClient(`${import.meta.env.VITE_NODE_API_URL}`);
  }

  async listComments(id) {
    return this.httpClient.get(`/posts/comments/${id}`);
  }

  async addComments(postId, formData) {
    return this.httpClient.post(`/post/${postId}`, { body: formData });
  }

  async removeComments(postId, commentId) {
    return this.httpClient.delete(`/post/${postId}/comments/${commentId}`);
  }
}

export default new CommentService();
