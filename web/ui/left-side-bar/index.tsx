'use client';
import Link from 'next/link';
import './style.scss';
import { useStore } from '@/store';
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

const LeftSideBar = () => {
  const [apiTokenValue, setApiTokenValue] = useState('');
  const { isToken, isLogin, setIsToken, apiToken, setApiToken } = useStore();

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
          <Link href="/">공지사항</Link>
        </li>
        <li className="mb-[10px]">
          <Link href="/homework">TODO</Link>
        </li>
        {/* <li className="mb-[10px]">
          <Link href="/loatodo">로아 TODO</Link>
        </li> */}
        <li className="mb-[10px]">
          <Link href="/cheatsheet">컨닝페이퍼</Link>
        </li>
        <li className="mb-[10px]">
          <Link href="/optimization">아이스팽</Link>
        </li>
        <li className="mb-[10px]">
          <Link href="/loawa">로아와</Link>
        </li>
        <li className="mb-[10px]">
          <Link href="/kloa">클로아</Link>
        </li>
        <li className="mb-[10px]">
          <Link href="/setting">설정</Link>
        </li>
      </ul>

      {/*<div>*/}
      {/*  <input*/}
      {/*    type="text" //*/}
      {/*    className={'token-input'}*/}
      {/*    value={apiToken}*/}
      {/*    onChange={(e) => handleChange(e)}*/}
      {/*    disabled={isToken}*/}
      {/*  />*/}
      {/*  <div className="button-box">*/}
      {/*    {isToken ? (*/}
      {/*      <button onClick={() => setIsToken(false)}>변경</button>*/}
      {/*    ) : (*/}
      {/*      <button onClick={handleComplete}>저장</button>*/}
      {/*    )}*/}
      {/*    <button>복사</button>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  );
};

export default LeftSideBar;
