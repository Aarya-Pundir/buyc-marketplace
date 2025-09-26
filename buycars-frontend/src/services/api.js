// src/services/api.js
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

function getToken() {
  return localStorage.getItem('token');
}

function authHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request(path, opts = {}) {
  const url = `${API_BASE}${path}`;
  const headers = { 'Content-Type': 'application/json', ...(opts.headers || {}), ...authHeaders() };
  const res = await fetch(url, { ...opts, headers });
  const text = await res.text();
  let data = null;
  try { data = text ? JSON.parse(text) : null; } catch(e) { data = text; }
  if (!res.ok) {
    const err = data && data.message ? data.message : res.statusText;
    const e = new Error(err);
    e.status = res.status;
    e.body = data;
    throw e;
  }
  return data;
}

export const Auth = {
  signup: (payload) => request('/api/auth/signup', { method: 'POST', body: JSON.stringify(payload) }),
  login: (payload) => request('/api/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
  logout: () => { localStorage.removeItem('token'); localStorage.removeItem('user'); }
};

export const OEM = {
  count: () => request('/api/oem/models/count'),
  search: (q = {}) => {
    const params = new URLSearchParams(q).toString();
    return request(`/api/oem/specs?${params}`);
  }
};

export const Inventory = {
  list: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/api/inventory${qs ? '?' + qs : ''}`);
  },
  create: (payload) => request('/api/inventory', { method: 'POST', body: JSON.stringify(payload) }),
  update: (id, payload) => request(`/api/inventory/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  delete: (id) => request(`/api/inventory/${id}`, { method: 'DELETE' }),
  bulkDelete: (ids) => request('/api/inventory/bulk', { method: 'DELETE', body: JSON.stringify({ ids }) })
};

export function saveAuth(token, user) {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
}

export function getUser() {
  const raw = localStorage.getItem('user');
  return raw ? JSON.parse(raw) : null;
}
