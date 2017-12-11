import request from '../utils/request';

export function create(slug, comment) {
  return request(`/api/articles/${slug}/comments`, {
    method: 'POST',
    body: JSON.stringify({ comment: comment })
  })
}