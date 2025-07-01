import api from "../lib/axiosInstance";

export const readAllCategory = ()=>api.get('/api/categories');

export const readMinorCategory = ()=>api.get('/api/categories/minor');

export const readProducts = (pageno)=>api.get(`/api/products?pageno=${pageno}`)

export const readProduct = (id)=>api.get(`/api/products/${id}`)

export const readProductBySeller = (seller, pageno)=>api.get(`/api/products/${seller}?pageno=${pageno}`)

export const registerProduct = (formData)=>api.post('/api/seller/products/new', formData)

// export const readProduct = (productId)=>api.get(`/api/seller/products/${productId}`)

export const blockProduct = (productId)=>api.get(`/api/seller/products/${productId}/block`)

export const writeReview = ()=>{};

export const removeReview = ()=>{};