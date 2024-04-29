import { StateCreator } from 'zustand';

type UserState = {
  isToken: boolean;
  apiToken: string;
};

type UserAction = {
  setIsToken: (isToken: boolean) => void;
  setApiToken: (apiToken: string) => void;
};

export type UserSlice = UserState & UserAction;

const state: UserState = {
  isToken: false,
  apiToken: '',
};

export const useUserSlice: StateCreator<UserSlice> = (set, get) => ({
  ...state,
  setIsToken: (isToken) => {
    set(() => ({
      isToken: isToken,
    }));
  },
  setApiToken: (apiToken) => {
    set(() => ({
      apiToken: apiToken,
    }));
  },
});
