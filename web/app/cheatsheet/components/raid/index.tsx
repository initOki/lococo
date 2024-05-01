'use client';
import { useStore } from '@/store';
import Biackiss from './biackiss';
import Valtan from './valtan';
import KoukuSaton from './koukuSaton';
import Abrelshud from './abrelshud';
import Kayangel from './kayangel';
import Illiakan from './illiakan';
import IvoryTower from './ivoryTower';
import Kamen from './kamen';
import Echidna from './echidna';
import './style.scss';

const CheatSheetImageContainer = () => {
  const { tabName } = useStore();

  return (
    <div className="mt-[20px]">
      {tabName === 'valtan' && <Valtan />}
      {tabName === 'biackiss' && <Biackiss />}
      {tabName === 'koukuSaton' && <KoukuSaton />}
      {tabName === 'abrelshud' && <Abrelshud />}
      {tabName === 'kayangel' && <Kayangel />}
      {tabName === 'illiakan' && <Illiakan />}
      {tabName === 'ivoryTower' && <IvoryTower />}
      {tabName === 'kamen' && <Kamen />}
      {tabName === 'echidna' && <Echidna />}
    </div>
  );
};

export default CheatSheetImageContainer;
