import React, { useEffect, useState } from 'react';
import { supabase } from '@/utils/client';
import { useStore } from '@/store';
import Loading from '@/ui/Loading';

const Login = () => {
  const { isLogin, supaToken, supaUserId, setIsLogin, setSupaToken, setSupaUserId, setLostarkTokenList } = useStore();
  const [signUp, setSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const changeSignUp = () => {
    setSignUp(!signUp);
  };

  const handleSignUp = async () => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: 'init2@init.com',
        password: 'asdfasdf',
      });

      if (error) return;
      if (!data || !data.session) return;
      setSupaToken(data.session.access_token);
      setSupaUserId(data.session.user.id);
    } catch (error) {
      //
    }
  };

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: 'init2@init.com',
        password: 'asdfasdf',
      });

      if (error) return;
      if (!data) return;
      setSupaToken(data.session.access_token);
      setSupaUserId(data.user.id);

      getLostArkTokenList();
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setSupaToken('');
      setSupaUserId('');
      setIsLogin(false);
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

  useEffect(() => {
    if (supaToken === '') return;
    setIsLogin(true);
  }, [supaToken]);

  return (
    <div className="content-box">
      {isLoading && (
        <div className="dim">
          <Loading />
        </div>
      )}
      {isLogin && (
        <div className="dim">
          <button onClick={() => handleLogout()} className="default-button max-w-[100px]">
            로그아웃
          </button>
        </div>
      )}
      <div className="mb-[15px]">
        {signUp ? (
          <button className="default-button" onClick={() => changeSignUp()}>
            로그인하러 가기
          </button>
        ) : (
          <button className="default-button" onClick={() => changeSignUp()}>
            계정생성하러 가기
          </button>
        )}
      </div>
      {signUp ? (
        <div className="">
          <div className="mb-[5px] flex flex-col">
            <label>ID</label>
            <input type="text" className="default-input" />
          </div>
          <div>
            <label>PASSWORD</label>
            <input type="password" className="default-input" />
          </div>
          <div>
            <button className="default-button" onClick={() => handleSignUp()}>
              계정생성
            </button>
          </div>
        </div>
      ) : (
        <div className="">
          <div className="mb-[5px] flex flex-col">
            <label>ID</label>
            <input type="text" className="default-input" />
          </div>
          <div>
            <label>PASSWORD</label>
            <input type="password" className="default-input" />
          </div>
          <div>
            <button className="default-button" onClick={() => handleSignIn()}>
              로그인
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
