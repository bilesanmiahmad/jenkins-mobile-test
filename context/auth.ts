import { IUser } from "@/types/index.ds";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface AuthStore {
  user: IUser | null;
  isLoading: boolean;
  session: boolean;
  error?: string | null;
  auth_token?: string | null;
  logout: () => void;
}

export const ZST_AUTH_KEY = "zst-auth";
export const LOGIN_KEY = "zst-login";

export const authStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      error: null,
      session: true,
      isLoading: false,
      logout: async () => {
        try {
          set(() => ({ isLoading: true }));
          await AsyncStorage.removeItem(ZST_AUTH_KEY);
        } catch (err: any) {
          set(() => ({ isLoading: false, session: false }));
        } finally {
          set(() => ({ isLoading: false, session: false, user: undefined }));
        }
      },
    }),
    {
      name: ZST_AUTH_KEY,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export const useAuthStore = create<AuthStore>()(authStore);
