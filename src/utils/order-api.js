import api from "../lib/axiosInstance";

export const fetchOrderCheck = (orderId)=>api.get(`/api/orders/check?orderId=${orderId}`);

export const fetchOrderList = ()=>api.get(`/api/orders`);

export const fetchOrderDetail = (id)=>api.get(`/api/orders/${id}`);

export const createOrder = (object)=>api.post('/api/orders', new URLSearchParams(object));