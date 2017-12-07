import request from '../utils/request';

const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`;
export function all(page) {
  return request(`/api/articles?${limit(10, page)}`, {
    method: 'GET'
  })
}

export function getTags() {
  return request('/api/tags', {
    method: 'GET'
  })
}