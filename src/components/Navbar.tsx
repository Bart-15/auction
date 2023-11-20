'use client';

import { useUser } from '@auth0/nextjs-auth0/client';

import { Button, buttonVariants } from '@/components/ui/button';

import UserAccountNav from './UserAccountNav';

const Navbar = () => {
  const { user } = useUser();

  return (
    <div className='fixed inset-x-0 top-0 z-40 h-fit border-b border-zinc-200 bg-white py-2'>
      <div className='container mx-auto flex h-full max-w-7xl items-center justify-between gap-2'>
        <p>Auction Serverless</p>
        {user ? (
          <UserAccountNav user={user} />
        ) : (
          <Button className={buttonVariants()}>Login</Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
