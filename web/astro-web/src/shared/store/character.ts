import { type StateCreator } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

type CharacterState = {
  isCharacter: boolean;
  commonHomeWork: any;
  characterList: any[];
  mainCharacter: string;
  openCharacterUUID: string;
  selectedCharacter: string;
};

type CharacterAction = {
  setIsCharacter: (isCharacter: boolean) => void;
  setCharacterList: (characterList: any[]) => void;
  setMainCharacter: (mainCharacter: string) => void;
  setOpenCharacterUUID: (openCharacterUUID: string) => void;
  setSelectedCharacter: (selectedCharacter: string) => void;
  setCommonHomeWork: (commonHomeWork: any) => void;
};

export type CharacterSlice = CharacterState & CharacterAction;

const state: CharacterState = {
  isCharacter: false,
  commonHomeWork: {
    item_id: uuidv4(),
    mainCharacter: '공통',
    homework: {
      weekEpona: false,
      weekGuardian: false,
      weekDungeon: false,
    },
  },
  characterList: [],
  mainCharacter: '',
  openCharacterUUID: '',
  selectedCharacter: '',
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
  setSelectedCharacter: (selectedCharacter) => {
    set(() => ({
      selectedCharacter: selectedCharacter,
    }));
  },
  setCommonHomeWork: (commonHomeWork) => {
    set(() => ({
      commonHomeWork: commonHomeWork,
    }));
  },
});
