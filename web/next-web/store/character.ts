import { StateCreator } from 'zustand';

type CharacterState = {
  isCharacter: boolean;
  characterList: any[];
  mainCharacter: string;
  openCharacterUUID: string;
};

type CharacterAction = {
  setIsCharacter: (isCharacter: boolean) => void;
  setCharacterList: (characterList: any[]) => void;
  setMainCharacter: (mainCharacter: string) => void;
  setOpenCharacterUUID: (openCharacterUUID: string) => void;
};

export type CharacterSlice = CharacterState & CharacterAction;

const state: CharacterState = {
  isCharacter: false,
  characterList: [],
  mainCharacter: '',
  openCharacterUUID: ''
};

export const useCharacterSlice: StateCreator<CharacterSlice> = (set, get) => ({
  ...state,
  setIsCharacter: (isCharacter) => {
    set(() => ({
      isCharacter: isCharacter,
    }));
  },
  setCharacterList: (characterList) => {
    set(() => ({
      characterList: characterList,
    }));
  },
  setMainCharacter: (mainCharacter) => {
    set(() => ({
      mainCharacter: mainCharacter,
    }));
  },
  setOpenCharacterUUID: (characterListUUID) => {
    set(() => ({
      openCharacterUUID: characterListUUID,
    }));
  },
});
