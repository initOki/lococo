'use client';
import { useStore } from '~shared/store';
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
import { useEffect, useState } from 'react';
import { getHeight } from '~shared/get-height';

const CheatSheetImageContainer = () => {
  const { tabName } = useStore();
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(getHeight(200));
  }, []);

  return (
    <div className="mt-[20px] overflow-scroll" style={{ height: `${height}px` }}>
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
