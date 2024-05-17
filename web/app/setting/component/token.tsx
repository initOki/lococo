import React, {useEffect} from 'react';
import { useStore } from '@/store';
import { supabase } from '@/utils/client';

const Token = () => {
  const { isLogin, supaUserId, lostarkTokenList, setLostarkTokenList } = useStore();

  const getLostArkTokenList = async () => {
    try {
      const { data, error } = await supabase.from('user-lostark-token').select().eq('userId', supaUserId);

      if (!data) return;
      setLostarkTokenList(data);
    } catch (error) {
      //
    }
  };

  useEffect(() => {
    if (!isLogin) return;
    getLostArkTokenList();
  }, [isLogin])

  return (
    <div className="content-box">
      {!isLogin && <div className="dim">로그인 후 사용 가능</div>}
      <div>
        <p className="mb-[10px]">Token list</p>
        {lostarkTokenList &&
          lostarkTokenList.map((item, _) => {
            return (
              <div key={item.uid} className="mb-[10px] flex">
                <input type="radio" className="mr-[15px]" name="svaed-token" />
                <p className="token-item">{item.lostark_token}</p>
              </div>
            );
          })}
        <div className="token-button-box">
          <button className="default-button">해당 토큰 사용</button>
          <button className="default-button" onClick={() => getLostArkTokenList()}>
            토큰 업데이트
          </button>
        </div>
      </div>
    </div>
  );
};

export default Token;
