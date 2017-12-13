import request from '../utils/request';

export function follow(username) {
  return request(`/api/profiles/${username}/follow`, {
    method: 'POST'
  })
}

export function unfollow(username) {
  return request(`/api/profiles/${username}/follow`, {
    method: 'DELETE'
  })
}

export function get(username) {
  return request(`/api/profiles/${username}`, {
    method: 'GET'
  })
}