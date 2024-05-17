'use client';
import Header from '@/ui/header';
import LeftSideBar from '@/ui/left-side-bar';
import { toast, Toaster } from 'sonner';
import { useStore } from '@/store';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Login from '@/app/setting/component/login';
import '@/app/global.scss';
import Token from '@/app/setting/component/token';
import './style.scss';
import SaveToken from '@/app/setting/component/save-token';

export default function Setting() {
  const { apiToken, setApiToken } = useStore();
  const [notice, setNotice] = useState([]);

  const getNotice = async () => {
    try {
      const response = await axios.get('https://developer-lostark.game.onstove.com/news/notices', {
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
      });

      if (!response) return toast.error('공지사항 조회에 실패했습니다.');
      setNotice(response.data);
      toast.success('공지사항 조회에 성공했습니다.');
    } catch (error) {
      toast.error('공지사항 조회에 실패했습니다.');
    }
  };

  const switchRenderBadge = (type: string) => {
    switch (type) {
      case '공지':
        return <span className="default-badge notice">공지</span>;
      case '이벤트':
        return <span className="default-badge event">이벤트</span>;
      case '점검':
        return <span className="default-badge inspection">점검</span>;
      case '상점':
        return <span className="default-badge shop">상점</span>;
      default:
        return <span className="default-badge">공지</span>;
    }
  };

  useEffect(() => {
    if (apiToken === '') return;
    getNotice();
  }, [apiToken]);

  return (
    <div>
      <Header />
      <div className="flex w-full">
        <LeftSideBar />
        <main className="flex min-h-screen flex-col p-[20px] overflow-scroll w-full">
          <div className="mb-[50px]">
            <div className="grid-box">
              <Login />
              <Token />
              <SaveToken />
            </div>
          </div>
        </main>
      </div>
      <Toaster
        toastOptions={{
          unstyled: false,
          classNames: {
            error: 'bg-red-400 p-[20px] border-none text-white',
            success: 'bg-green-400 p-[20px] border-none text-white',
            warning: 'bg-yellow-400 p-[20px] border-none text-black',
            info: 'bg-blue-400 p-[20px] border-none text-white',
          },
        }}
      />
    </div>
  );
}
