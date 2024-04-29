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
