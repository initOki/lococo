import Header from '@/ui/header';
import LeftSideBar from '@/ui/left-side-bar';
import { Toaster } from 'sonner';
import NickName from '@/app/homework/components/NickName';
import './style.scss';
import Content from '@/app/homework/components/Content';
import Tab from './components/tab';
import CheatSheetImageContainer from './components/raid';

export default function HomeWork() {
  return (
    <div>
      <Header />
      <div className="flex w-full">
        <LeftSideBar />
        <main className="w-full p-[20px]">
          <Tab />
          <CheatSheetImageContainer />
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
