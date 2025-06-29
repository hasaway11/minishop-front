import api from "../lib/axiosInstance";

export const readProducts = (pageno)=>api.get(`/api/products?pageno=${pageno}`)

export const readProductBySeller = (seller, pageno)=>api.get(`/api/products/${username}?pageno=${pageno}`)

export const registerProduct = (formData)=>api.post('/api/seller/products/new', formData)

export const readProduct = (productId)=>api.get(`/api/seller/products/${productId}`)

export const blockProduct = (productId)=>api.get(`/api/seller/products/${productId}/block`)


export const writeReview = ()=>{};

export const removeReview = ()=>{};