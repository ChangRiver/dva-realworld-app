import request from '../utils/request';
const encode = encodeURIComponent;
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

export function feed(page) {
  return request(`/api/articles/feed?${limit(10, page)}`, {
    method: 'GET'
  })
}

export function byTag(tag, page) {
  return request(`/api/articles?tag=${encode(tag)}&${limit(10, page)}`, {
    method: 'GET'
  })
}