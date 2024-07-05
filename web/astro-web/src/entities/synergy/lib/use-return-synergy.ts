import { synergyData } from './synergy-data.ts';

export const returnSynergy = (synergy: any) => {
  return synergyData.find((data) => data.name === synergy);
};
