import apiClient from './apiClient';

export const admissionService = {
  create: (data) => apiClient.post('/admissions', data),
  getAll: (params) => apiClient.get('/admissions', { params }),
  getById: (id) => apiClient.get(`/admissions/${id}`),
  updateStatus: (id, data) => apiClient.patch(`/admissions/${id}/status`, data),
  delete: (id) => apiClient.delete(`/admissions/${id}`),
};

export const franchiseService = {
  create: (data) => apiClient.post('/franchise-enquiries', data),
  getAll: (params) => apiClient.get('/franchise-enquiries', { params }),
  updateStatus: (id, data) => apiClient.patch(`/franchise-enquiries/${id}/status`, data),
  delete: (id) => apiClient.delete(`/franchise-enquiries/${id}`),
};

export const programService = {
  getAll: (params) => apiClient.get('/programs', { params }),
  getBySlug: (slug) => apiClient.get(`/programs/${slug}`),
  create: (data) => apiClient.post('/programs', data),
  update: (id, data) => apiClient.put(`/programs/${id}`, data),
  delete: (id) => apiClient.delete(`/programs/${id}`),
};

export const testimonialService = {
  getAll: (params) => apiClient.get('/testimonials', { params }),
  create: (data) => apiClient.post('/testimonials', data),
  update: (id, data) => apiClient.put(`/testimonials/${id}`, data),
  delete: (id) => apiClient.delete(`/testimonials/${id}`),
};

export const galleryService = {
  getAll: (params) => apiClient.get('/gallery', { params }),
  create: (formData) => apiClient.post('/gallery', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  delete: (id) => apiClient.delete(`/gallery/${id}`),
};

export const authService = {
  login: (data) => apiClient.post('/auth/login', data),
  getMe: () => apiClient.get('/auth/me'),
};

export const blogService = {
  getAll: (params) => apiClient.get('/blogs', { params }),
  getBySlug: (slug) => apiClient.get(`/blogs/${slug}`),
  create: (data) => apiClient.post('/blogs', data),
  update: (id, data) => apiClient.put(`/blogs/${id}`, data),
  delete: (id) => apiClient.delete(`/blogs/${id}`),
};

export const contactService = {
  create: (data) => apiClient.post('/contacts', data),
  getAll: () => apiClient.get('/contacts'),
  delete: (id) => apiClient.delete(`/contacts/${id}`),
};

export const centerService = {
  getAll: (params) => apiClient.get('/centers', { params }),
  getLocations: () => apiClient.get('/centers/locations'),
  getBySlug: (slug) => apiClient.get(`/centers/${slug}`),
  create: (data) => apiClient.post('/centers', data),
  update: (id, data) => apiClient.put(`/centers/${id}`, data),
  delete: (id) => apiClient.delete(`/centers/${id}`),
};

export const productService = {
  getAll: (params) => apiClient.get('/products', { params }),
  getBySlug: (slug) => apiClient.get(`/products/${slug}`),
  create: (data) => apiClient.post('/products', data),
  update: (id, data) => apiClient.put(`/products/${id}`, data),
  delete: (id) => apiClient.delete(`/products/${id}`),
};

export const orderService = {
  create: (data) => apiClient.post('/orders', data),
  getAll: (params) => apiClient.get('/orders', { params }),
  updateStatus: (id, data) => apiClient.patch(`/orders/${id}/status`, data),
  delete: (id) => apiClient.delete(`/orders/${id}`),
};

export const eventService = {
  getAll: (params) => apiClient.get('/events', { params }),
  getBySlug: (slug) => apiClient.get(`/events/${slug}`),
  create: (data) => apiClient.post('/events', data),
  update: (id, data) => apiClient.put(`/events/${id}`, data),
  delete: (id) => apiClient.delete(`/events/${id}`),
};

export const awardService = {
  getAll: (params) => apiClient.get('/awards', { params }),
  create: (data) => apiClient.post('/awards', data),
  update: (id, data) => apiClient.put(`/awards/${id}`, data),
  delete: (id) => apiClient.delete(`/awards/${id}`),
};

