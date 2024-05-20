import Header from '@/ui/header';
import LeftSideBar from '@/ui/left-side-bar';
import './style.scss';
import { Toaster } from 'sonner';
import Link from 'next/link';

export default function Kloa() {
  return (
    <div>
      <Header />
      <div className="flex w-full">
        <LeftSideBar />
        <main className="flex items-center flex-col w-full min-h-screen">
          <p className="mt-[50px]">클로아는 직접 사이트로 이동해야 합니다.</p>
          <Link className="mt-[40px] text-[30px]" href="https://kloa.gg" target="_black">
            클로아 바로가기
          </Link>
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
