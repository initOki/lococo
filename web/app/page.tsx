'use client';
import Header from '@/ui/header';
import LeftSideBar from '@/ui/left-side-bar';
import { toast, Toaster } from 'sonner';
import { useStore } from '@/store';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import './global.scss';

export default function Home() {
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
            {notice && notice.length > 0
              ? notice.map((item: any, index) => (
                  <div key={index} className="pb-[10px]">
                    <Link href={item.Link} target="_blank">
                      {item.Title}
                    </Link>
                  </div>
                ))
              : '공지사항이 없습니다.'}
          </div>
        </main>
      </div>
      <Toaster
        toastOptions={{
          unstyled: true,
          classNames: {
            error: 'bg-red-400',
            success: 'text-green-400',
            warning: 'text-yellow-400',
            info: 'bg-blue-400',
          },
        }}
      />
    </div>
  );
}
