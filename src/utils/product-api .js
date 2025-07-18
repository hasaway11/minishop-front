import api from "../lib/axiosInstance";

export const readAllCategory = ()=>api.get('/api/categories');

export const readMinorCategory = ()=>api.get('/api/categories/minor');

export const readProducts = (pageno)=>api.get(`/api/products?pageno=${pageno}`)

export const readProductsBySeller = (pageno)=>api.get(`/api/seller/products?pageno=${pageno}`);

export const readProduct = (id)=>api.get(`/api/products/${id}`).then(res => res.data)


export const readProductBySeller = (seller, pageno)=>api.get(`/api/products/${seller}?pageno=${pageno}`)

export const registerProduct = (formData)=>api.post('/api/seller/products/new', formData)

export const updateProduct = (obj)=>{
  console.log(obj)
  api.put('/api/seller/products', new URLSearchParams(obj));
}

export const readMyProduct = (productId)=>api.get(`/api/seller/products/${productId}`).then(res => res.data);

