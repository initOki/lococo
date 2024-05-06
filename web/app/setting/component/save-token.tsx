import { useStore } from '@/store';
import { ChangeEvent, useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/utils/client';

const SaveToken = () => {
  const { supaUserId, isLogin, setLostarkTokenList } = useStore();
  const [token, setToken] = useState('');

  const savedLostarkToken = async () => {
    if (token === '') return toast.error('토큰을 입력해주세요.');
    try {
      const { data, error } = await supabase
        .from('user-lostark-token')
        .insert([{ userId: supaUserId, lostark_token: token }])
        .select();

      console.log(data);

      getLostArkTokenList();
    } catch (error) {
      //
    }
  };

  const getLostArkTokenList = async () => {
    try {
      const { data, error } = await supabase.from('user-lostark-token').select().eq('userId', supaUserId);

      if (!data) return;
      setLostarkTokenList(data);
    } catch (error) {
      //
    }
  };

  return (
    <div className="content-box">
      {!isLogin && <div className="dim">로그인 후 사용 가능</div>}
      <input type="text" className="default-input" onChange={(e) => setToken(e.target.value)} />
      <div>
        <button className="default-button" onClick={() => savedLostarkToken()}>
          새로운 토큰 저장하기
        </button>
      </div>
    </div>
  );
};

export default SaveToken;
