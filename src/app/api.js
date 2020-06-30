import axios from 'axios';


class API {
  async login(username, password) {
    // mock auth
    localStorage.setItem('token', JSON.stringify(username, password));
  }

  async logout() {
    localStorage.removeItem('token');
  }

  async getContent(contentId) {
    return axios.get('/cms/content/' + contentId, {headers: this.authToken});
  }

  async updateContent(contentId, etag, content) {
    return axios.put('/cms/content/' + contentId, content, {headers: {...this.authToken, 'If-Match': etag}});
  }

  search(params) {
    if (!this.authToken)
      return this.login('username', 'password').then(() => this.search(params))
    return axios.get('/cms/search', {params, headers: this.authToken})
  }

  get authToken() {
    let token = localStorage.getItem('token');
    if (!token) return null;
    token = JSON.parse(token);
    token = token.token;
    return {'X-Auth-Token': token};
  }
}

export default new API();
