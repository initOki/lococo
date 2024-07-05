import type { ChangeEvent } from 'react';
import type { SynergyStates } from '~entities/synergy/lib/type.ts';

export const handleChange = (e: ChangeEvent<HTMLInputElement>, setSearchText: SynergyStates['setSearchText']) => {
  setSearchText(e.target.value);
};
