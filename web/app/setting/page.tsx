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
