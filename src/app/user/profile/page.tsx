'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';
import { FC } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { withAuth } from '@/hoc/withAuth';

const Profile: FC = () => {
  const { user } = useUser();

  return (
    <Card className='mt-6'>
      <CardHeader>
        <CardTitle className='text-center'>User Profile</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col items-center justify-center gap-2'>
        <Image
          className='mb-2 rounded-full'
          src={user?.picture as string}
          alt={user?.name as string}
          width='100'
          height='100'
        />
        <p>{user?.nickname}</p>
        <p>{user?.email}</p>
      </CardContent>
    </Card>
  );
};
export default withAuth(Profile);
