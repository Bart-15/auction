/* eslint-disable react/function-component-definition */

import { useUser } from '@auth0/nextjs-auth0/client';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

import LoadingSpinner from '@/components/LoadingSpinner';
import Navbar from '@/components/Navbar';

interface ProtectedComponentProps {
  // Define any specific props for your wrapped component here
}
export function withAuth<P>(
  Component: React.ComponentType<P>,
): React.FC<P & ProtectedComponentProps> {
  return function ProtectedComponent(props: P & ProtectedComponentProps) {
    const pathname = usePathname();
    const router = useRouter();

    const { user, isLoading } = useUser();

    useEffect(() => {
      if (isLoading) {
        return;
      }

      const loginRedirect = async () => {
        if (!user) {
          localStorage.setItem('redirectTo', pathname);
          router.push('/');
        }
      };

      loginRedirect();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, isLoading]);

    if (isLoading) {
      return <LoadingSpinner />;
    }

    return (
      user && (
        <>
          <Navbar />
          <Component {...props} />
        </>
      )
    );
  };
}
