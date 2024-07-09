import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { type UserSlice, useUserSlice } from './user';
import { type CharacterSlice, useCharacterSlice } from './character';
import { type RaidSlice, useRaidSlice } from './raid';

type Store = UserSlice & CharacterSlice & RaidSlice;

export const useStore = create<Store>()(
  persist(
    (...a) => ({
      ...useUserSlice(...a),
      ...useCharacterSlice(...a),
      ...useRaidSlice(...a),
    }),
    {
      name: 'save', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
);
