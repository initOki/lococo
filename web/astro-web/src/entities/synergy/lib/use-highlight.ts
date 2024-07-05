import type { SynergyStates } from '~entities/synergy/lib/type.ts';

export const highlight = (text: any, searchText: SynergyStates['searchText']) => {
  if (searchText === text) {
    return true;
  }
};
