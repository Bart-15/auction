import type { UserProfile } from '@auth0/nextjs-auth0/client';
import { AvatarProps } from '@radix-ui/react-avatar';
import Image from 'next/image';
import { FC } from 'react';

import { Avatar, AvatarFallback } from '@/components/ui/Avatar';

import { Icons } from './Icons';

interface UserAvatarProps extends AvatarProps {
  user: Pick<UserProfile, 'name' | 'picture'>;
}

const UserAvatar: FC<UserAvatarProps> = ({ user, ...props }) => (
  <Avatar {...props}>
    {user?.picture ? (
      <div className='relative aspect-square h-full w-full'>
        <Image
          fill
          src={user.picture}
          alt='Profile Picture'
          referrerPolicy='no-referrer'
        />
        <div className='z-2 absolute right-0 top-3 my-1 h-3 w-3 rounded-full border-2 border-white bg-green-400' />
      </div>
    ) : (
      <AvatarFallback>
        <span className='sr-only'>{user?.name}</span>
        <Icons.user className='h-4 w-4' />
      </AvatarFallback>
    )}
  </Avatar>
);

export default UserAvatar;
