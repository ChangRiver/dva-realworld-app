import request from '../utils/request';
const encode = encodeURIComponent;
const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`;
const omitSlug = article => Object.assign({}, article, {slug: undefined})

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

export function favorite(slug) {
  return request(`/api/articles/${slug}/favorite`, {
    method: 'POST'
  })
}

export function unfavorite(slug) {
  return request(`/api/articles/${slug}/favorite`, {
    method: 'DELETE'
  })
}

export function articleDetail(slug) {
  return request(`/api/articles/${slug}`, {
    method: 'GET'
  })
}

export function articleComments(slug) {
  return request(`/api/articles/${slug}/comments`, {
    method: 'GET'
  })
}

export function create(article) {
  return request(`/api/articles`, {
    method: 'POST',
    body: JSON.stringify({ article: article })
  })
}

export function byAuthor(author, page) {
  return request(`/api/articles?author=${encode(author)}&${limit(10, page)}`, {
    method: 'GET'
  })
}

export function favoritedBy(author, page) {
  return request(`/api/articles?favorited=${encode(author)}&${limit(10, page)}`, {
    method: 'GET'
  })
}

export function del(slug) {
  return request(`/api/articles/${slug}`, {
    method: 'DELETE'
  })
}

export function update(article) {
  return request(`/api/articles/${article.slug}`, {
    method: 'PUT',
    body: JSON.stringify({ article: omitSlug(article) })
  })
}