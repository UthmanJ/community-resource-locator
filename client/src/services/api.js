const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const getResources = async (category = 'All') => {
  const url = category === 'All'
    ? `${API_BASE_URL}/resources`
    : `${API_BASE_URL}/resources?category=${encodeURIComponent(category)}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch resources');
  return response.json();
};

export const getResourceById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/resources/${id}`);
  if (!response.ok) throw new Error('Failed to fetch resource');
  return response.json();
};

export const createResource = async (data) => {
  const response = await fetch(`${API_BASE_URL}/resources`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create resource');
  return response.json();
};

export const deleteResource = async (id) => {
  const response = await fetch(`${API_BASE_URL}/resources/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete resource');
  return response.json();
};