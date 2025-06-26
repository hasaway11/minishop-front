import { create } from 'zustand'

export const useAuthStore = create(set=>({
  accessToken: null,
  refreshToken: null,
  username:null,
  role: null,

  setAuth:({ accessToken, refreshToken, username, role})=>{
    set({ accessToken, refreshToken, username, role});
  },

  setToken: ({accessToken, refreshToken}) => set({ accessToken, refreshToken }),

  clearAuth:()=>set({ accessToken:null, refreshToken:null, username:null, role:null }),

}));
