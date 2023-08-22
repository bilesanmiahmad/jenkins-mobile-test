import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface Store {
  imageUri: string | null;
  backID: string | null;
  frontID: string | null;
}

const ZST_LOCATION_KEY = "zst-store";

export const createStore = create<Store>()(
  persist(
    (set, get) => ({
      imageUri: "",
      backID: "",
      frontID: "",
    }),
    {
      name: ZST_LOCATION_KEY,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export const useStore = create<Store>()(createStore);
