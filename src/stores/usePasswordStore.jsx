import { create } from "zustand";

const usePasswordStore = create((set) => ({
  isPasswordVerified: false,

  setPasswordVerified: () => set({isPasswordVerified: true }),
}));

export default usePasswordStore