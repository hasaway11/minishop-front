import { create } from 'zustand'

export const useAuthStore = create(set=>({
  // undefined로 초기화. 비로그인이라면 localStorage에서 읽어온 정보로 null 세팅
  // 로컬스토리지에서 로그인 정보를 읽어오는 동안, useAuthStore의 정보를 먼저 읽어가므로 구별이 필요
  accessToken: undefined,
  refreshToken: undefined,
  username:undefined,
  role: undefined,

  setAuth:({ accessToken, refreshToken, username, role})=>{
    set({ accessToken, refreshToken, username, role});
  },

  updateAccessToken: (accessToken) => set({accessToken}),

  clearAuth:()=>set({ accessToken:null, refreshToken:null, username:null, role:null }),

}));
