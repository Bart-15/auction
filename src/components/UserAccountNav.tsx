'use client';

import { UserProfile } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import { FC } from 'react';

import { buttonVariants } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/Dropdown-Menu';

import UserAvatar from './UserAvatar';

interface UserAccountNavProps {
  user?: Pick<UserProfile, 'name' | 'email' | 'picture'>;
}

const UserAccountNav: FC<UserAccountNavProps> = ({ user }) => (
  <DropdownMenu>
    <DropdownMenuTrigger>
      <UserAvatar
        className='h-8 w-8'
        user={{
          name: user?.name || null,
          picture: user?.picture || null,
        }}
      />
    </DropdownMenuTrigger>

    <DropdownMenuContent className='bg-white' align='end'>
      <div className='flex items-center justify-start gap-2 p-2'>
        <div className='flex flex-col space-y-1 leading-none'>
          {user?.name && <p className='font-medium'>{user?.name}</p>}
          {user?.email && (
            <p className='w[200px] truncate text-sm text-zinc-700'>
              {user.email}
            </p>
          )}
        </div>
      </div>

      <DropdownMenuSeparator />

      <DropdownMenuItem asChild>
        <Link href='/auction'>Auction</Link>
      </DropdownMenuItem>

      <DropdownMenuItem asChild>
        <Link href='/user/profile'>Profile</Link>
      </DropdownMenuItem>

      <DropdownMenuSeparator />

      <DropdownMenuItem className='cursor-pointer'>
        <a
          href='/api/auth/logout'
          className={buttonVariants({
            variant: 'default',
          })}
        >
          Logout
        </a>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export default UserAccountNav;
