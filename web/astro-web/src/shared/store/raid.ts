import { type StateCreator } from 'zustand';

type RaidState = {
  tabName: string;
};

type RaidAction = {
  setTabName: (tabName: string) => void;
};

export type RaidSlice = RaidState & RaidAction;

const state: RaidState = {
  tabName: '',
};

export const useRaidrSlice: StateCreator<RaidSlice> = (set, get) => ({
  ...state,
  setTabName: (tabName) => {
    set(() => ({
      tabName: tabName,
    }));
  },
});
