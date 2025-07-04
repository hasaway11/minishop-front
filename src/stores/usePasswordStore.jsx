import { create } from "zustand";

const usePasswordStore = create((set) => ({
  isPasswordVerified: false,

  setPasswordVerified: () => set(state=>({isPasswordVerified: true })),
}));

export default usePasswordStore