import AsyncStorage from "@react-native-async-storage/async-storage";
import { LocationObject } from "expo-location";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface LocationStore {
  location: LocationObject | null;
  error: string;
}

const ZST_LOCATION_KEY = "zst-location";

export const createLocationStore = create<LocationStore>()(
  persist(
    (set, get) => ({
      location: null,
      error: "",
    }),
    {
      name: ZST_LOCATION_KEY,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export const useLocationStore = create<LocationStore>()(createLocationStore);
