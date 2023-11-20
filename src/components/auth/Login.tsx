/* eslint-disable no-alert */

'use client';

import Image from 'next/image';

import LoginBg from '@/assets/img/LoginBg.svg';
import { buttonVariants } from '@/components/ui/button';

import LoadingSpinner from '../LoadingSpinner';
import { useLogin } from './hooks';

const Login = () => {
  const { isLoading } = useLogin();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className='container'>
      <div className='flex flex-col items-center justify-evenly gap-8 md:flex-row'>
        <Image
          className='w-96'
          width='200'
          height='200'
          src={LoginBg}
          alt='sample'
        />
        <div className='flex flex-col items-center gap-2'>
          <p className='font-mono text-base uppercase md:text-2xl'>
            Auction Serverless
          </p>
          <a
            href='/api/auth/login'
            className={buttonVariants({
              variant: 'default',
              className: 'w-full',
            })}
          >
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
