'use client';
import { useStore } from '@/store';
import './style.scss';

const Tab = () => {
  const { setTabName } = useStore();

  return (
    <div>
      <div>
        <ul className="cheat-sheet-list">
          <li onClick={() => setTabName('valtan')}>발탄</li>
          <li onClick={() => setTabName('biackiss')}>비아키스</li>
          <li onClick={() => setTabName('koukuSaton')}>쿠크세이튼</li>
          <li onClick={() => setTabName('abrelshud')}>아브렐슈드</li>
          <li onClick={() => setTabName('kayangel')}>카양겔</li>
          <li onClick={() => setTabName('illiakan')}>일리아칸</li>
          <li onClick={() => setTabName('ivoryTower')}>상아탑</li>
          <li onClick={() => setTabName('kamen')}>카멘</li>
          <li onClick={() => setTabName('echidna')}>에키드나</li>
        </ul>
      </div>
    </div>
  );
};

export default Tab;
