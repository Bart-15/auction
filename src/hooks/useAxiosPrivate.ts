import { Session } from '@auth0/nextjs-auth0';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect } from 'react';

import { axiosPrivate } from '@/lib/axios';

const useAxiosPrivate = () => {
  const { user } = useUser();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      async (config) => {
        if (!config.headers.Authorization) {
          const userSession = await fetch('/api/auth/session');
          const res: Session = await userSession.json();

          const token = res.idToken;
          // eslint-disable-next-line no-param-reassign
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
    };
  }, [user]);

  return axiosPrivate;
};

export default useAxiosPrivate;
