import { Toaster } from 'sonner';

const Toast = () => {
  return (
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
  );
};

export default Toast;
