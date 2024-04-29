'use client';
import Link from 'next/link';
import './style.scss';
import { useStore } from '@/store';
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

const LeftSideBar = () => {
  const [apiTokenValue, setApiTokenValue] = useState('');
  const { isToken, setIsToken, apiToken, setApiToken } = useStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiToken(e.target.value);
  };

  const handleComplete = async () => {
    try {
      const response = await axios.get('https://developer-lostark.game.onstove.com/news/notices', {
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
      });

      if (!response) return toast.error('토큰이 유효하지 않습니다.');
      setIsToken(true);
      toast.success('토큰이 저장 되었습니다.');
    } catch (error) {
      toast.error('토큰이 유효하지 않습니다.');
    }
  };

  return (
    <div className="left-side-bar flex flex-col justify-between">
      <ul>
        <li className="mb-[10px]">
          <Link href="/">Home</Link>
        </li>
        <li className="mb-[10px]">
          <Link href="/homework">숙제</Link>
        </li>
        <li>
          <Link href="/optimization">아이스팽</Link>
        </li>
      </ul>

      <div>
        <input
          type="text" //
          className={'token-input'}
          value={apiToken}
          onChange={(e) => handleChange(e)}
          disabled={isToken}
        />
        <div className="button-box">
          {isToken ? (
            <button onClick={() => setIsToken(false)}>변경</button>
          ) : (
            <button onClick={handleComplete}>저장</button>
          )}
          <button>복사</button>
        </div>
      </div>
    </div>
  );
};

export default LeftSideBar;
