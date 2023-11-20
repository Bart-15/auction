import { QueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { toast } from '@/components/ui/use-toast';

function queryErrHandler(error: unknown) {
  if (error instanceof AxiosError) {
    const errMsg = error.message ? error.message : 'Error connecting to server';
    if (error.response?.status === 401) {
      toast({
        title: 'Login required',
        description: 'You need to be loged in to do that',
        variant: 'destructive',
      });

      return;
    }

    toast({
      title: 'Ooops, something went wrong',
      description: errMsg,
      variant: 'destructive',
    });
  }
}

export function generateQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        staleTime: 2 * (60 * 1000), // 2 mins, it depends
      },
      mutations: {
        onError: queryErrHandler,
      },
    },
  }); // soon, will edit the global config
}

export const queryClient = generateQueryClient();
