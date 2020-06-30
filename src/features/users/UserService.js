import api from '../../app/api';
import {get, map} from 'lodash';

class UserService {

  async search(searchText, page, rowsPerPage) {
    let filterQuery = null;
    if (searchText) {
      filterQuery = {};
      filterQuery.name_s = searchText;
      filterQuery.cpf_s = searchText;
      filterQuery.email_s = searchText;
    }
    const params = {q: "*:*", start: page * rowsPerPage, rows: rowsPerPage};
    if (searchText) {
      params.fq = `name_s:*${searchText}* OR cpf_s:*${searchText}* OR email_s:*${searchText}*`;
    }

    return await api.search(params).then(async ({data}) => {
      console.log(data)
      const entries = await Promise.allSettled(map(data, async ({id}) => {        
        // Required because entries is a list of ids only
        return await this.getUser(id).then(result => ({id, ...result})).catch(e => {
          console.error(e);
          return {};
        });
      })).then(users => map(users, 'value'));
      return {
        entries,
        totalAmount: get(data, 'response.numFound', 0)
      };
    });
  }

  async getUser(contentId) {
    return api.getContent(contentId).then(({data, headers}) => {
      const {etag} = headers;
      return {...data, etag};
    });
  }

  async updateUser(userData) {
    const {id, etag, aspects} = userData;
    return api.updateContent(id, etag, {aspects});
  }
}

export default new UserService();
