import request from '../utils/request';

export function login(formData) {
  return request('/api/users/login', {
    method: 'POST',
    body: JSON.stringify({ user: formData })
  })
}

export function register(formData) {
  return request('/api/users', {
    method: 'POST',
    body: JSON.stringify({ user: formData })
  })
}

export function getCurrentUser() {
  return request('/api/user', {
    method: 'GET'
  })
}

export function updateUserInfo(formData) {
  return request('/api/user', {
    method: 'PUT',
    body: JSON.stringify({ user: formData })
  })
}