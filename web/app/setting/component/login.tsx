import React, { ChangeEvent, useEffect, useState } from 'react';
import { supabase } from '@/utils/client';
import { useStore } from '@/store';
import Loading from '@/ui/Loading';
import { toast } from 'sonner';

const Login = () => {
  const {
    isLogin,
    supaToken,
    supaUserId,
    setIsLogin,
    setSupaToken,
    setSupaUserId,
    setLostarkTokenList,
    setLoginEmail,
  } = useStore();
  const [signUp, setSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [signIn, setSignIn] = useState({
    email: '',
    password: '',
  });
  const [signUpUser, setSignUpUser] = useState({
    email: '',
    password: '',
  });

  const handleChangeSignIn = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignIn({
      ...signIn,
      [name]: value,
    });
  };

  const handleChangeSignUp = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUpUser({
      ...signUpUser,
      [name]: value,
    });
  };

  const changeSignUp = () => {
    setSignUp(!signUp);
  };

  const handleSignUp = async () => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: signUpUser.email,
        password: signUpUser.password,
      });

      if (error) return;
      if (!data || !data.session) return;
      setSupaToken(data.session.access_token);
      setSupaUserId(data.session.user.id);
      setSignIn({
        email: '',
        password: '',
      });
      setSignUpUser({
        email: '',
        password: '',
      });
    } catch (error) {
      //
    }
  };

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: signIn.email,
        password: signIn.password,
      });

      if (error) return toast.error('아이디 또는 비밀번호가 틀렸습니다.');
      if (!data) return;
      setSupaToken(data.session.access_token);
      setSupaUserId(data.user.id);
      setLoginEmail(signIn.email);
      setSignIn({
        email: '',
        password: '',
      });
      setSignUpUser({
        email: '',
        password: '',
      });

      getLostArkTokenList();
    } catch (error) {
      toast.error('아이디 또는 비밀번호가 틀렸습니다.');
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
      const { data, error } = await supabase
        .from('user-lostark-token') //
        .select()
        .eq('userId', supaUserId)
        .eq('used', true);

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
            <input
              type="text"
              className="default-input"
              name="email"
              value={signUpUser.email}
              onChange={(e) => handleChangeSignUp(e)}
            />
          </div>
          <div>
            <label>PASSWORD</label>
            <input
              type="password"
              className="default-input"
              name="password"
              value={signUpUser.password}
              onChange={(e) => handleChangeSignUp(e)}
            />
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
            <input
              type="text"
              className="default-input"
              name="email"
              value={signIn.email}
              onChange={(e) => handleChangeSignIn(e)}
            />
          </div>
          <div>
            <label>PASSWORD</label>
            <input
              type="password"
              className="default-input"
              name="password"
              value={signIn.password}
              onChange={(e) => handleChangeSignIn(e)}
            />
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
