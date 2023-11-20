import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const useLogin = () => {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    async function init() {
      if (
        window.location.search.includes('code=') &&
        window.location.search.includes('state=')
      ) {
        router.push('/auction');
      }

      if (user) {
        router.push('/auction');
      }
    }

    init();
  }, [user, router]);

  return {
    isLoading,
  };
};
