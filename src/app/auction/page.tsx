'use client';

import { FC } from 'react';

import AddAuctionDialog from '@/components/auction/AddAuctionDialog';
import AuctionList from '@/components/auction/AuctionList';
import { useAuction } from '@/components/auction/hooks';
import LoadingSpinner from '@/components/LoadingSpinner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { withAuth } from '@/hoc/withAuth';

const statusOptions = [
  {
    label: 'Open',
    value: 'OPEN',
  },
  {
    label: 'Closed',
    value: 'CLOSED',
  },
];

const Auction: FC = () => {
  const {
    result: { data, isLoading, fetchStatus },
    status,
    setStatus,
  } = useAuction();

  if (isLoading && fetchStatus === 'fetching') {
    return <LoadingSpinner />;
  }

  return (
    <>
      <h1 className='my-6 text-center text-2xl font-medium md:text-3xl'>
        Auctions
      </h1>
      <div className='flex flex-col gap-3 sm:flex-row'>
        <AddAuctionDialog />
        <Select
          value={status}
          onValueChange={(value: 'OPEN' | 'CLOSED') => setStatus(value)}
        >
          <SelectTrigger className='w-full sm:w-[180px]'>
            <SelectValue placeholder='Filter By' />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((status) => (
              <SelectItem key={status.label} value={status.value}>
                {status.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {!data?.length ? (
        <p className='text-1xl leading-7'>No data</p>
      ) : (
        <AuctionList auctions={data} />
      )}
    </>
  );
};

export default withAuth(Auction);
