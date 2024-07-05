import Header from '@/ui/header';
import LeftSideBar from '@/ui/left-side-bar';
import './style.scss';
import { Toaster } from 'sonner';

export default function Optimization() {
  return (
    <div>
      <Header />
      <div className="flex w-full">
        <LeftSideBar />
        <main className="flex w-full min-h-screen flex-col items-center justify-between">
          <iframe src="https://loa.icepeng.com/"></iframe>
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
