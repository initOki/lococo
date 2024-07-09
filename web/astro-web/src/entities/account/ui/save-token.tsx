import { useStore } from '~shared/store';
import { type ChangeEvent, useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '~shared/supabase/client';
import axios from 'axios';
import Loading from '~shared/loading/Loading';

const SaveToken = () => {
  const { supaUserId, isLogin, loginEmail, setLostarkTokenList } = useStore();
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getNotice = async () => {
    try {
      const response = await axios.get('https://developer-lostark.game.onstove.com/news/notices', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response) return false;
      return true;
    } catch (error) {
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const savedLostarkToken = async () => {
    if (token === '') return toast.error('토큰을 입력해주세요.');
    setIsLoading(true);
    if ((await getNotice()) === false) return toast.error('토큰이 유효하지 않습니다.');
    try {
      const { data, error } = await supabase
        .from('user-lostark-token')
        .insert([{ userId: supaUserId, lostark_token: token, email: loginEmail }])
        .select();

      getLostArkTokenList();
      setToken('');
      toast.success('토큰 저장이 완료되었습니다.');
    } catch (error) {
      toast.error('토큰 저장에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const getLostArkTokenList = async () => {
    try {
      const { data, error } = await supabase
        .from('user-lostark-token') //
        .select()
        .eq('userId', supaUserId)
        .eq('used', true);

      if (!data) return;
      setLostarkTokenList(data);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="content-box">
      {!isLogin && <div className="dim">로그인 후 사용 가능</div>}
      {isLoading && (
        <div className="dim">
          <Loading />
        </div>
      )}
      <input type="text" className="default-input" value={token} onChange={(e) => setToken(e.target.value)} />
      <div>
        <button className="default-button mt-[10px]" onClick={() => savedLostarkToken()}>
          새로운 토큰 저장하기
        </button>
      </div>
    </div>
  );
};

export default SaveToken;
