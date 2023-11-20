import { useUser } from '@auth0/nextjs-auth0/client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useState } from 'react';

import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { axiosPrivate } from '@/lib/axios';
import { PlaceBidPayload } from '@/lib/schema/auction.schema';
import { queryClient } from '@/react-query/queryClient';
import {
  TAuction,
  TAuctionPlayload,
  TImagePayload,
} from '@/types/auction.types';

import { toast } from '../ui/use-toast';

export function useAuction() {
  const { user } = useUser();
  const axiosPrivate = useAxiosPrivate();

  const [status, setStatus] = useState<'OPEN' | 'CLOSED'>('OPEN');

  const result = useQuery<TAuction[]>({
    queryKey: ['auctions', status],
    queryFn: async () => {
      const { data } = await axiosPrivate.get(`/auction?status=${status}`);
      return data.auctions;
    },
    refetchOnWindowFocus: false,
    enabled: !!user,
  });

  return {
    result,
    status,
    setStatus,
  };
}

export async function placeBid(
  payload: PlaceBidPayload & { id: string },
): Promise<void> {
  const newPayload = {
    amount: parseInt(payload.amount, 10),
  };

  const { data } = await axiosPrivate.patch(
    `/auction/${payload.id}/bid`,
    newPayload,
  );

  return data;
}

export function usePlaceBid() {
  const [open, setOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: (payload: PlaceBidPayload & { id: string }) =>
      placeBid(payload),
    onMutate: () => {},
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auctions'] });
      setOpen(false);
      toast({
        title: 'Success',
        description: 'Bid Successful',
        variant: 'default',
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error?.response?.status === 400) {
          toast({
            title: 'Failed',
            description: `${error?.response?.data.errorMessage}`,
            variant: 'destructive',
          });
        }
      }
    },
  });

  return {
    mutation,
    setOpen,
    open,
  };
}

async function uploadAuctionImage(payload: TImagePayload) {
  const { file } = payload;

  const newPayload = {
    file,
  };

  const { data } = await axiosPrivate.post(`/auction/uploadImage`, newPayload);
  return data;
}

export function useUploadImage() {
  const [imgPreview, setImgPreview] = useState<string>('');

  const mutation = useMutation({
    mutationFn: (payload: TImagePayload) => uploadAuctionImage(payload),
    onMutate: () => {
      toast({
        title: 'Processing Upload...',
      });
    },
    onSuccess: (data) => {
      setImgPreview(data.url.Location); // preveiw Link
      toast({
        title: 'Success',
        description: 'Auction Image Upload Successfully',
        variant: 'default',
      });
    },
  });

  return {
    mutation,
    imgPreview,
    setImgPreview,
  };
}

async function addAuction(payload: TAuctionPlayload) {
  const { data } = await axiosPrivate.post('/auction', payload);
  return data;
}

export function useAddAuction() {
  const [open, setOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: (payload: TAuctionPlayload) => addAuction(payload),
    onMutate: () => {
      toast({
        title: 'Adding Auction...',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auctions'] });
      toast({
        title: 'Success',
        description: 'Auction Added Successfully',
        variant: 'default',
      });
      setOpen(false);
    },
  });

  return {
    mutation,
    open,
    setOpen,
  };
}
