import { synergyData } from './synergy-data.ts';
import type { SynergyStates } from '~entities/synergy/lib/type.ts';

export const findSynergy = (text: any, setSearchResult: SynergyStates['setSearchResult']) => {
  const aaa: any[] = [];
  synergyData.filter((data) => {
    if (data.korean.includes(text)) {
      aaa.push(data.name);
      return;
    }
    data.always.filter((item) => {
      if (item.name.includes(text)) {
        aaa.push(data.name);
      }
      return;
    });
    data.moment.filter((item) => {
      if (item.name.includes(text)) {
        aaa.push(data.name);
      }
      return;
    });
  });
  setSearchResult(aaa);
};
