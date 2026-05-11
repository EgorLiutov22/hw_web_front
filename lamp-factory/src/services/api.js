const BASE_URL = 'http://localhost:8080/api';

export const productsApi = {
  getAll: () => fetch(`${BASE_URL}/products`).then(r => r.json()),
  getById: (id) => fetch(`${BASE_URL}/products/${id}`).then(r => r.json())
};

export const ordersApi = {
  create: (order) => fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order)
  }).then(r => r.json())
};