import api from "../lib/axiosInstance";

export const fetchOrderCheck = (orderId)=>api.get(`/api/orders/check?orderId=${orderId}`);

export const fetchOrderList = ()=>api.get('/api/orders');