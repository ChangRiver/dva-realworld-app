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