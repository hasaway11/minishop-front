import api from "../lib/axiosInstance";

export const requestAddToCart=(id)=>api.post(`http://localhost:8080/api/carts/${id}`);

export const fetchCarts=()=>api.get('http://localhost:8080/api/carts');

export const requestIncreaseQuantity=(id)=>api.put(`/api/carts/${id}/inc`);

export const requestDecreaseQuantity=(id)=>api.put(`/api/carts/${id}/dec`);

export const requestRemoveItem=(id)=>api.delete(`/api/carts/${id}`);

export const requestRemoveSelectedItems=(ids)=>api.delete(`/api/carts?${ids}`);

export const requestOrderSelectedItems=(ids)=>api.post(`/api/orders/prepare?${ids}`); 