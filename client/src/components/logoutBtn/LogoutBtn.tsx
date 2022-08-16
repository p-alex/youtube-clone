import { useMutation } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { resetUser } from '../../app/features/authSlice';
import { logoutUser } from '../../services/auth.service';
import router from 'next/router';
import useAuth from '../../hooks/useAuth';
const LogoutBtn = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { mutate: logout, isLoading, data } = useMutation(logoutUser);

  useEffect(() => {
    if (data?.success) {
      dispatch(resetUser());
      router.push('/signin');
    }
  }, [data, dispatch]);

  return (
    <button
      type="button"
      onClick={() => logout({ user_id: user!.user_id })}
      style={{
        color: '#222',
        backgroundColor: 'white',
        fontWeight: 'bold',
        border: 'solid white 2px',
        padding: '0 10px',
      }}
    >
      {isLoading ? 'Loading' : 'Logout'}
    </button>
  );
};

export default LogoutBtn;
