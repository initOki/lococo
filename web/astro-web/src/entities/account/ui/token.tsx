import React, { useEffect, useState } from 'react';
import { useStore } from '~shared/store';
import { supabase } from '~shared/supabase/client';
import { toast } from 'sonner';
import CopyIcon from '~shared/icon/copy';
import DeleteIcon from '~shared/icon/delete';
import Loading from '~shared/loading/Loading';

const Token = () => {
  const { isLogin, supaUserId, lostarkTokenList, apiToken, setLostarkTokenList, setApiToken } = useStore();
  const [selectedToken, setSelectedToken] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getLostArkTokenList = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('user-lostark-token') //
        .select()
        .eq('userId', supaUserId)
        .eq('used', true);

      if (!data) return;
      setLostarkTokenList(data);
    } catch (error) {
      toast.error('토큰 조회 실패');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToken = async (token: string) => {
    try {
      await navigator.clipboard.writeText(token);
      toast.success('복사 성공');
    } catch (error) {
      toast.error('복사 실패');
    }
  };

  const unusedToken = async (item: any) => {
    console.log(item);
    try {
      const { data, error } = await supabase
        .from('user-lostark-token') //
        .update({ used: false })
        .eq('uid', item.uid)
        .eq('email', item.email)
        .select();

      if (error) return;
      getLostArkTokenList();
    } catch (error) {
      //
    }
  };

  const lostarkToken = () => {
    if (selectedToken === '') return toast.warning('토큰을 선택해주세요.');
    setApiToken(selectedToken);
  };

  const removeLostarkToken = () => {
    setApiToken('');
  };

  useEffect(() => {
    if (!isLogin) return;
    getLostArkTokenList();
  }, [isLogin]);

  return (
    <div className="content-box">
      {!isLogin && <div className="dim">로그인 후 사용 가능</div>}
      {isLoading && (
        <div className="dim">
          <Loading />
        </div>
      )}
      <div>
        <p className="mb-[10px] text-[#FFFFFF]">Token list</p>
        {lostarkTokenList &&
          lostarkTokenList.map((item, _) => {
            return (
              <div key={item.uid} className="mb-[10px] pb-[5px] flex justify-between items-center token-item">
                <div className="flex">
                  <input
                    type="radio"
                    className={`mr-[15px] ${item.lostark_token === apiToken ? 'isUsed' : ''}`}
                    name="svaed-token"
                    onChange={() => setSelectedToken(item.lostark_token)}
                    checked={selectedToken === item.lostark_token}
                    disabled={item.lostark_token === apiToken}
                  />
                  <p className="text-[#FFFFFF] w-full max-w-[250px] whitespace-nowrap overflow-hidden text-ellipsis">
                    {item.lostark_token}
                  </p>
                </div>

                <div className="">
                  <button className="mr-[5px] text-[#FFFFFF]" onClick={() => copyToken(item.lostark_token)}>
                    <CopyIcon />
                  </button>
                  <button className="text-[#FFFFFF]" onClick={() => unusedToken(item)}>
                    <DeleteIcon />
                  </button>
                </div>
              </div>
            );
          })}
        <div className="token-button-box mt-[20px]">
          {apiToken ? (
            <button className="default-button" onClick={() => removeLostarkToken()}>
              토큰 변경
            </button>
          ) : (
            <button className="default-button" onClick={() => lostarkToken()}>
              해당 토큰 사용
            </button>
          )}
          <button className="default-button" onClick={() => getLostArkTokenList()}>
            토큰 업데이트
          </button>
        </div>
        <div className="mt-[20px]">
          <input
            className="default-input"
            type="text"
            value={apiToken}
            placeholder="사용할 토큰을 선택해주세요."
            readOnly={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Token;
