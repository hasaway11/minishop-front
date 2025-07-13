import api from "../lib/axiosInstance";

export const fetchOrderCheck = (orderId)=>api.get(`/api/orders/check?orderId=${orderId}`);

export const fetchOrderList = ()=>api.get(`/api/orders`).then(res => res.data);

export const fetchOrderDetail = (id)=>api.get(`/api/orders/${id}`);

export const createOrder = (object)=>api.post('/api/orders', new URLSearchParams(object)).then(res => res.data);

export const fetchSellerOrderList = ()=>api.get('/api/sellers/orders').then(res => res.data);

export const updateToShipping = (ids)=>api.put(`/api/sellers/orders?${ids}`).then(res => res.data);
