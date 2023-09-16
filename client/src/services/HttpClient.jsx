import APIError from '../errors/APIError';

class HttpClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  get(path, options) {
    return this.makeRequest(path, { method: 'GET', headers: options?.headers });
  }

  post(path, options) {
    return this.makeRequest(path, {
      method: 'POST',
      body: options?.body,
      headers: options?.headers,
    });
  }

  put(path, options) {
    return this.makeRequest(path, {
      method: 'PUT',
      body: options?.body,
      headers: options?.headers,
    });
  }

  patch(path, options) {
    return this.makeRequest(path, {
      method: 'PATCH',
      body: options?.body,
      headers: options?.headers,
    });
  }

  delete(path, options) {
    return this.makeRequest(path, { method: 'DELETE', headers: options?.headers });
  }

  async makeRequest(path, options) {
    const headers = new Headers();

    if (options.body) {
      headers.append('Content-Type', 'application/json');
    }

    if (options.body?.picturePath) {
      const formData = new FormData();

      Object.entries(options.body).forEach(([name, value]) => {
        formData.append(name, value);
      });

      formData.append('picturePath', options.body.picturePath.name);

      const response = await fetch(
        `${this.baseURL}${path}`,
        {
          method: options.method,
          body: formData,
        },
      );

      let responseBody = null;

      const contentType = response.headers.get('Content-Type');

      if (contentType.includes('application/json')) {
        responseBody = await response.json();
      }

      if (response.ok) {
        return responseBody;
      }
    }

    if (options.headers) {
      Object.entries(options.headers).forEach(([name, value]) => {
        headers.append(name, value);
      });
    }

    const response = await fetch(`${this.baseURL}${path}`, {
      method: options.method,
      body: JSON.stringify(options.body),
      headers,
    });

    let responseBody = null;
    const contentType = response.headers.get('Content-Type');

    if (contentType.includes('application/json')) {
      responseBody = await response.json();
    }

    if (response.ok) {
      return responseBody;
    }

    throw new APIError(response, responseBody);
  }
}

export default HttpClient;
