import Header from '@/ui/header';
import LeftSideBar from '@/ui/left-side-bar';
import { Toaster } from 'sonner';
import NickName from '@/app/homework/components/NickName';
import './style.scss';
import Content from '@/app/homework/components/Content';

export default function HomeWork() {
  return (
    <div>
      <Header />
      <div className="flex w-full">
        <LeftSideBar />
        <main className="w-full p-[20px]">
          <NickName />
          {/*<Content />*/}
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
