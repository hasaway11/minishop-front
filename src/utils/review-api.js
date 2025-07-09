import api from "../lib/axiosInstance";

export const fetchProductSummaryByOrderItemId=(id)=>api.get(`/reviews/product?orderItemId=${id}`)

export const createReview=(object)=>api.post('/reviews/new', new URLSearchParams(object));

export const fetchMyReviws = ()=>api.get('/reviews');

export const requestDeleteAndFetchNewReviews=(id)=>api.delete(`/api/reviews/${id}`).then(res => res.data)
