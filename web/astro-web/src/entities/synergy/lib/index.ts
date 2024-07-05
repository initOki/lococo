import { findSynergy } from './use-find-synergy';
import { handleChange } from './use-handle-change';
import { highlight } from './use-highlight.ts';
import { returnSynergy } from './use-return-synergy.ts';

export const useSynergy = () => {
  return {
    findSynergy,
    handleChange,
    highlight,
    returnSynergy,
  };
};
