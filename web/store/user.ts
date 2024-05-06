import { StateCreator } from 'zustand';

type UserState = {
  isToken: boolean;
  isLogin: boolean;
  lostarkTokenList: any[];
  apiToken: string;
  supaToken: string;
  supaUserId: string;
};

type UserAction = {
  setIsToken: (isToken: boolean) => void;
  setIsLogin: (isLogin: boolean) => void;
  setLostarkTokenList: (apiLostarkTokenList: any[]) => void;
  setApiToken: (apiToken: string) => void;
  setSupaToken: (supaToken: string) => void;
  setSupaUserId: (supaUserId: string) => void;
};

export type UserSlice = UserState & UserAction;

const state: UserState = {
  isToken: false,
  isLogin: false,
  lostarkTokenList: [],
  apiToken: '',
  supaToken: '',
  supaUserId: '',
};

export const useUserSlice: StateCreator<UserSlice> = (set, get) => ({
  ...state,
  setIsToken: (isToken) => {
    set(() => ({
      isToken: isToken,
    }));
  },
  setIsLogin: (isLogin) => {
    set(() => ({
      isLogin: isLogin,
    }));
  },
  setLostarkTokenList: (lostarkTokenList) => {
    set(() => ({
      lostarkTokenList: lostarkTokenList,
    }));
  },
  setApiToken: (apiToken) => {
    set(() => ({
      apiToken: apiToken,
    }));
  },
  setSupaToken: (supaToken) => {
    set(() => ({
      supaToken: supaToken,
    }));
  },
  setSupaUserId: (supaUserId) => {
    set(() => ({
      supaUserId: supaUserId,
    }));
  },
});
