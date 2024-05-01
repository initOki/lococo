import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { UserSlice, useUserSlice } from '@/store/user';
import { CharacterSlice, useCharacterSlice } from '@/store/character';
import { RaidSlice, useRaidrSlice } from './raid';

type Store = UserSlice & CharacterSlice & RaidSlice;

export const useStore = create<Store>()(
  persist(
    (...a) => ({
      ...useUserSlice(...a),
      ...useCharacterSlice(...a),
      ...useRaidrSlice(...a),
    }),
    {
      name: 'save', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
);
