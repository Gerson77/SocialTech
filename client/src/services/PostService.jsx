import HttpClient from './HttpClient';

class PostService {
  constructor() {
    this.httpClient = new HttpClient(`${import.meta.env.VITE_NODE_API_URL}`);
  }

  async listPosts() {
    return this.httpClient.get('/posts');
  }

  async addNewPost(formData) {
    return this.httpClient.post('/post', { body: formData });
  }

  async getSinglePost(id) {
    return this.httpClient.get(`/post/${id}`);
  }

  async getByPostUser(id) {
    return this.httpClient.get(`/posts/${id}/posts`);
  }

  async editPost(userId, postId, formData) {
    return this.httpClient.put(`/post/edit/${userId}/${postId}`, { body: formData });
  }

  async removePost(userId, postId) {
    return this.httpClient.delete(`/post/delete/${userId}/${postId}`);
  }

  // Like
  async patchLike(postId, userId) {
    return this.httpClient.patch(`/post/${postId}/${userId}/like`);
  }

  async removeLike(postId, userId) {
    return this.httpClient.put(`/post/${postId}/${userId}/like`);
  }
}

export default new PostService();
